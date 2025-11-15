import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const jobAlertSchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
  jobType: z.string().optional(),
  category: z.string().optional(),
  minSalary: z.number().int().min(0).optional(),
  experienceLevel: z.string().optional(),
  frequency: z.enum(["instant", "daily", "weekly"]).default("daily"),
  isActive: z.boolean().default(true),
})

// GET - Fetch all job alerts for user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id

    const alerts = await prisma.jobAlert.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error("Error fetching job alerts:", error)
    return NextResponse.json({ error: "Failed to fetch job alerts" }, { status: 500 })
  }
}

// POST - Create new job alert
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const validatedData = jobAlertSchema.parse(body)

    const alert = await prisma.jobAlert.create({
      data: {
        ...validatedData,
        userId,
      },
    })

    return NextResponse.json({ alert }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error creating job alert:", error)
    return NextResponse.json({ error: "Failed to create job alert" }, { status: 500 })
  }
}

// PUT - Update job alert
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json({ error: "Alert ID is required" }, { status: 400 })
    }

    const validatedData = jobAlertSchema.partial().parse(updateData)

    // Check ownership
    const existingAlert = await prisma.jobAlert.findFirst({
      where: { id, userId },
    })

    if (!existingAlert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    const alert = await prisma.jobAlert.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json({ alert })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error updating job alert:", error)
    return NextResponse.json({ error: "Failed to update job alert" }, { status: 500 })
  }
}

// DELETE - Delete job alert
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Alert ID is required" }, { status: 400 })
    }

    // Check ownership
    const alert = await prisma.jobAlert.findFirst({
      where: { id, userId },
    })

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    await prisma.jobAlert.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Alert deleted successfully" })
  } catch (error) {
    console.error("Error deleting job alert:", error)
    return NextResponse.json({ error: "Failed to delete job alert" }, { status: 500 })
  }
}
