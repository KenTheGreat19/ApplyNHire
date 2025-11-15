import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const interviewPrepSchema = z.object({
  jobId: z.string().optional(),
  companyName: z.string().optional(),
  position: z.string().optional(),
  interviewDate: z.string().datetime().optional(),
  interviewType: z.enum(["phone", "video", "onsite", "technical"]).optional(),
  companyResearch: z.string().optional(),
  questionsToAsk: z.string().optional(),
  answersPrepped: z.string().optional(),
  status: z.enum(["preparing", "scheduled", "completed", "cancelled"]).default("preparing"),
  outcome: z.enum(["passed", "rejected", "waiting"]).optional(),
  notes: z.string().optional(),
})

// GET - Fetch all interview preparations
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const where: any = { userId }
    if (status) {
      where.status = status
    }

    const interviewPreps = await prisma.interviewPrep.findMany({
      where,
      include: {
        practiceSessions: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ interviewPreps })
  } catch (error) {
    console.error("Error fetching interview preps:", error)
    return NextResponse.json({ error: "Failed to fetch interview preparations" }, { status: 500 })
  }
}

// POST - Create new interview preparation
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const validatedData = interviewPrepSchema.parse(body)

    const interviewPrep = await prisma.interviewPrep.create({
      data: {
        ...validatedData,
        userId,
        interviewDate: validatedData.interviewDate ? new Date(validatedData.interviewDate) : null,
      },
    })

    return NextResponse.json({ interviewPrep }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error creating interview prep:", error)
    return NextResponse.json({ error: "Failed to create interview preparation" }, { status: 500 })
  }
}

// PUT - Update interview preparation
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
      return NextResponse.json({ error: "Interview prep ID is required" }, { status: 400 })
    }

    const validatedData = interviewPrepSchema.partial().parse(updateData)

    // Check ownership
    const existingPrep = await prisma.interviewPrep.findFirst({
      where: { id, userId },
    })

    if (!existingPrep) {
      return NextResponse.json({ error: "Interview preparation not found" }, { status: 404 })
    }

    const interviewPrep = await prisma.interviewPrep.update({
      where: { id },
      data: {
        ...validatedData,
        interviewDate: validatedData.interviewDate ? new Date(validatedData.interviewDate) : undefined,
      },
    })

    return NextResponse.json({ interviewPrep })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error updating interview prep:", error)
    return NextResponse.json({ error: "Failed to update interview preparation" }, { status: 500 })
  }
}

// DELETE - Delete interview preparation
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
      return NextResponse.json({ error: "Interview prep ID is required" }, { status: 400 })
    }

    // Check ownership
    const prep = await prisma.interviewPrep.findFirst({
      where: { id, userId },
    })

    if (!prep) {
      return NextResponse.json({ error: "Interview preparation not found" }, { status: 404 })
    }

    await prisma.interviewPrep.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Interview preparation deleted successfully" })
  } catch (error) {
    console.error("Error deleting interview prep:", error)
    return NextResponse.json({ error: "Failed to delete interview preparation" }, { status: 500 })
  }
}
