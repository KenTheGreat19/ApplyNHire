import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const updateResumeSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  templateStyle: z.enum(["professional", "modern", "creative"]).optional(),
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  summary: z.string().optional(),
  workExperience: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
  certifications: z.string().optional(),
  projects: z.string().optional(),
  languages: z.string().optional(),
  references: z.string().optional(),
  isDefault: z.boolean().optional(),
})

// GET - Fetch specific resume
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const resumeId = params.id

    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json({ resume })
  } catch (error) {
    console.error("Error fetching resume:", error)
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 })
  }
}

// PUT - Update resume
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const resumeId = params.id
    const body = await req.json()
    const validatedData = updateResumeSchema.parse(body)

    // Check ownership
    const existingResume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    })

    if (!existingResume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    // If setting as default, unset other defaults
    if (validatedData.isDefault) {
      await prisma.resume.updateMany({
        where: { userId, isDefault: true, id: { not: resumeId } },
        data: { isDefault: false },
      })
    }

    // Recalculate ATS score
    const mergedData = { ...existingResume, ...validatedData }
    const atsScore = calculateATSScore(mergedData)

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        ...validatedData,
        atsScore,
        lastScoreCheck: new Date(),
      },
    })

    return NextResponse.json({ resume: updatedResume })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error updating resume:", error)
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 })
  }
}

// DELETE - Delete resume
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const resumeId = params.id

    // Check ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    await prisma.resume.delete({
      where: { id: resumeId },
    })

    return NextResponse.json({ message: "Resume deleted successfully" })
  } catch (error) {
    console.error("Error deleting resume:", error)
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 })
  }
}

// Helper function to calculate ATS score
function calculateATSScore(data: any): number {
  let score = 0

  if (data.fullName) score += 5
  if (data.email) score += 5
  if (data.phone) score += 5
  if (data.location) score += 5

  if (data.summary && data.summary.length >= 100) score += 10
  else if (data.summary && data.summary.length >= 50) score += 5

  if (data.workExperience) {
    try {
      const experience = JSON.parse(data.workExperience)
      if (experience.length >= 3) score += 25
      else if (experience.length >= 2) score += 20
      else if (experience.length >= 1) score += 15
    } catch (e) {
      if (data.workExperience.length > 0) score += 10
    }
  }

  if (data.education) {
    try {
      const education = JSON.parse(data.education)
      if (education.length >= 2) score += 15
      else if (education.length >= 1) score += 10
    } catch (e) {
      if (data.education.length > 0) score += 8
    }
  }

  if (data.skills) {
    try {
      const skills = JSON.parse(data.skills)
      if (skills.length >= 10) score += 20
      else if (skills.length >= 5) score += 15
      else if (skills.length >= 1) score += 10
    } catch (e) {
      if (data.skills.length > 0) score += 8
    }
  }

  if (data.certifications) {
    try {
      const certs = JSON.parse(data.certifications)
      if (certs.length >= 1) score += 5
    } catch (e) {}
  }

  if (data.projects) {
    try {
      const projects = JSON.parse(data.projects)
      if (projects.length >= 1) score += 5
    } catch (e) {}
  }

  return Math.min(score, 100)
}
