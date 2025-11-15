import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const resumeSchema = z.object({
  title: z.string().min(1).max(200),
  templateStyle: z.enum(["professional", "modern", "creative"]).default("professional"),
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
  isDefault: z.boolean().default(false),
})

// GET - Fetch all resumes for the user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id

    const resumes = await prisma.resume.findMany({
      where: { userId },
      orderBy: [
        { isDefault: "desc" },
        { updatedAt: "desc" },
      ],
    })

    return NextResponse.json({ resumes })
  } catch (error) {
    console.error("Error fetching resumes:", error)
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 })
  }
}

// POST - Create a new resume
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const validatedData = resumeSchema.parse(body)

    // If this is set as default, unset other defaults
    if (validatedData.isDefault) {
      await prisma.resume.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      })
    }

    // Calculate ATS score (simple algorithm)
    const atsScore = calculateATSScore(validatedData)

    const resume = await prisma.resume.create({
      data: {
        ...validatedData,
        userId,
        atsScore,
        lastScoreCheck: new Date(),
      },
    })

    return NextResponse.json({ resume }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error creating resume:", error)
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 })
  }
}

// Helper function to calculate ATS score
function calculateATSScore(data: any): number {
  let score = 0
  const maxScore = 100

  // Personal info (20 points)
  if (data.fullName) score += 5
  if (data.email) score += 5
  if (data.phone) score += 5
  if (data.location) score += 5

  // Professional summary (10 points)
  if (data.summary && data.summary.length >= 100) score += 10
  else if (data.summary && data.summary.length >= 50) score += 5

  // Work experience (25 points)
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

  // Education (15 points)
  if (data.education) {
    try {
      const education = JSON.parse(data.education)
      if (education.length >= 2) score += 15
      else if (education.length >= 1) score += 10
    } catch (e) {
      if (data.education.length > 0) score += 8
    }
  }

  // Skills (20 points)
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

  // Certifications (5 points)
  if (data.certifications) {
    try {
      const certs = JSON.parse(data.certifications)
      if (certs.length >= 1) score += 5
    } catch (e) {
      // Ignore parse errors
    }
  }

  // Projects (5 points)
  if (data.projects) {
    try {
      const projects = JSON.parse(data.projects)
      if (projects.length >= 1) score += 5
    } catch (e) {
      // Ignore parse errors
    }
  }

  return Math.min(score, maxScore)
}
