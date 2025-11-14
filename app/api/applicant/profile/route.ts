import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const applicantProfileSchema = z.object({
  educationLevel: z.string().optional(),
  degrees: z.array(z.object({
    degree: z.string(),
    field: z.string(),
    institution: z.string(),
    year: z.number(),
  })).optional(),
  certifications: z.array(z.string()).optional(),
  relevantCourses: z.array(z.string()).optional(),
  totalYearsExperience: z.number().min(0).default(0),
  currentRole: z.string().optional(),
  industries: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  softSkills: z.array(z.object({
    skill: z.string(),
    rating: z.number().min(1).max(5).optional(),
  })).optional(),
  hardSkills: z.array(z.object({
    name: z.string(),
    proficiency: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  })).optional(),
  workStyle: z.string().optional(),
  desiredResponsibilities: z.string().optional(),
  personalTraits: z.array(z.string()).optional(),
  workEnvironmentPref: z.string().optional(),
  values: z.array(z.string()).optional(),
  teamSizePreference: z.string().optional(),
})

// GET - Fetch applicant profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user as any).role !== "APPLICANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id

    const profile = await prisma.applicantProfile.findUnique({
      where: { userId },
    })

    if (!profile) {
      return NextResponse.json({ profile: null })
    }

    // Parse JSON fields
    return NextResponse.json({
      profile: {
        ...profile,
        degrees: profile.degrees ? JSON.parse(profile.degrees) : [],
        certifications: profile.certifications ? JSON.parse(profile.certifications) : [],
        relevantCourses: profile.relevantCourses ? JSON.parse(profile.relevantCourses) : [],
        industries: profile.industries ? JSON.parse(profile.industries) : [],
        achievements: profile.achievements ? JSON.parse(profile.achievements) : [],
        softSkills: profile.softSkills ? JSON.parse(profile.softSkills) : [],
        hardSkills: profile.hardSkills ? JSON.parse(profile.hardSkills) : [],
        personalTraits: profile.personalTraits ? JSON.parse(profile.personalTraits) : [],
        values: profile.values ? JSON.parse(profile.values) : [],
      },
    })
  } catch (error) {
    console.error("Error fetching applicant profile:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}

// POST/PUT - Create or update applicant profile
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user as any).role !== "APPLICANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const validatedData = applicantProfileSchema.parse(body)

    // Calculate profile completeness
    let completeness = 0
    const fields = [
      validatedData.educationLevel,
      validatedData.degrees && validatedData.degrees.length > 0,
      validatedData.certifications && validatedData.certifications.length > 0,
      validatedData.totalYearsExperience > 0,
      validatedData.currentRole,
      validatedData.industries && validatedData.industries.length > 0,
      validatedData.softSkills && validatedData.softSkills.length > 0,
      validatedData.hardSkills && validatedData.hardSkills.length > 0,
      validatedData.workStyle,
      validatedData.personalTraits && validatedData.personalTraits.length > 0,
      validatedData.values && validatedData.values.length > 0,
    ]
    completeness = Math.round((fields.filter(Boolean).length / fields.length) * 100)

    // Upsert profile
    const profile = await prisma.applicantProfile.upsert({
      where: { userId },
      create: {
        userId,
        educationLevel: validatedData.educationLevel,
        degrees: validatedData.degrees ? JSON.stringify(validatedData.degrees) : null,
        certifications: validatedData.certifications
          ? JSON.stringify(validatedData.certifications)
          : null,
        relevantCourses: validatedData.relevantCourses
          ? JSON.stringify(validatedData.relevantCourses)
          : null,
        totalYearsExperience: validatedData.totalYearsExperience,
        currentRole: validatedData.currentRole,
        industries: validatedData.industries
          ? JSON.stringify(validatedData.industries)
          : null,
        achievements: validatedData.achievements
          ? JSON.stringify(validatedData.achievements)
          : null,
        softSkills: validatedData.softSkills
          ? JSON.stringify(validatedData.softSkills)
          : null,
        hardSkills: validatedData.hardSkills
          ? JSON.stringify(validatedData.hardSkills)
          : null,
        workStyle: validatedData.workStyle,
        desiredResponsibilities: validatedData.desiredResponsibilities,
        personalTraits: validatedData.personalTraits
          ? JSON.stringify(validatedData.personalTraits)
          : null,
        workEnvironmentPref: validatedData.workEnvironmentPref,
        values: validatedData.values ? JSON.stringify(validatedData.values) : null,
        teamSizePreference: validatedData.teamSizePreference,
        profileCompleteness: completeness,
      },
      update: {
        educationLevel: validatedData.educationLevel,
        degrees: validatedData.degrees ? JSON.stringify(validatedData.degrees) : null,
        certifications: validatedData.certifications
          ? JSON.stringify(validatedData.certifications)
          : null,
        relevantCourses: validatedData.relevantCourses
          ? JSON.stringify(validatedData.relevantCourses)
          : null,
        totalYearsExperience: validatedData.totalYearsExperience,
        currentRole: validatedData.currentRole,
        industries: validatedData.industries
          ? JSON.stringify(validatedData.industries)
          : null,
        achievements: validatedData.achievements
          ? JSON.stringify(validatedData.achievements)
          : null,
        softSkills: validatedData.softSkills
          ? JSON.stringify(validatedData.softSkills)
          : null,
        hardSkills: validatedData.hardSkills
          ? JSON.stringify(validatedData.hardSkills)
          : null,
        workStyle: validatedData.workStyle,
        desiredResponsibilities: validatedData.desiredResponsibilities,
        personalTraits: validatedData.personalTraits
          ? JSON.stringify(validatedData.personalTraits)
          : null,
        workEnvironmentPref: validatedData.workEnvironmentPref,
        values: validatedData.values ? JSON.stringify(validatedData.values) : null,
        teamSizePreference: validatedData.teamSizePreference,
        profileCompleteness: completeness,
      },
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error saving applicant profile:", error)
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    )
  }
}
