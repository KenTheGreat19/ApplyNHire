import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  company: z.string().min(2, "Company name required"),
  location: z.string().min(2, "Location required"),
  locationLat: z.number().optional(),
  locationLng: z.number().optional(),
  type: z.enum(["full_time", "part_time", "contract", "internship"]),
  description: z.string().min(50, "Description must be at least 50 characters"),
  applyUrl: z.string().optional(),
  acceptApplicationsHere: z.boolean().default(false),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  salaryCurrency: z.string().default("USD"),
  careerLink: z.string().url().optional().or(z.literal("")),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional().or(z.literal("")),
  degreeRequired: z.boolean().optional(),
  degreeType: z.enum(["BACHELORS", "MASTERS", "ASSOCIATES", "HIGH_SCHOOL", "NONE"]).optional(),
  experienceRequired: z.enum(["ENTRY_LEVEL", "MID_LEVEL", "SENIOR", "MANAGER"]).optional(),
  yearsOfExperience: z.number().optional(),
}).refine((data) => {
  if (data.acceptApplicationsHere) {
    return true
  }
  return data.applyUrl && data.applyUrl.length > 0
}, {
  message: "Either enable 'Accept Applications Here' or provide an Apply URL",
  path: ["applyUrl"],
})

// GET - Get all jobs for logged-in employer
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || (session.user as any).role !== "EMPLOYER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobs = await prisma.job.findMany({
      where: { employerId: (session.user as any).id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { applications: true }
        }
      }
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

// POST - Create new job
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || (session.user as any).role !== "EMPLOYER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const data = jobSchema.parse(body)

    const job = await prisma.job.create({
      data: {
        ...data,
        employerId: (session.user as any).id,
        status: "pending",
      },
    })

    // Send email notification to admin
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/job-submitted`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id }),
      })
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
