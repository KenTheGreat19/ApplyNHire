import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const practiceSessionSchema = z.object({
  interviewPrepId: z.string(),
  questionAsked: z.string(),
  userAnswer: z.string().optional(),
  confidence: z.number().int().min(1).max(5).optional(),
  duration: z.number().int().optional(),
  recordingUrl: z.string().url().optional(),
})

// POST - Create practice session
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const validatedData = practiceSessionSchema.parse(body)

    // Verify ownership of interview prep
    const interviewPrep = await prisma.interviewPrep.findFirst({
      where: {
        id: validatedData.interviewPrepId,
        userId,
      },
    })

    if (!interviewPrep) {
      return NextResponse.json({ error: "Interview preparation not found" }, { status: 404 })
    }

    // Create practice session
    const practiceSession = await prisma.interviewPracticeSession.create({
      data: validatedData,
    })

    // Update interview prep practice count and last practiced date
    await prisma.interviewPrep.update({
      where: { id: validatedData.interviewPrepId },
      data: {
        practiceCount: { increment: 1 },
        lastPracticed: new Date(),
      },
    })

    return NextResponse.json({ practiceSession }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error creating practice session:", error)
    return NextResponse.json({ error: "Failed to create practice session" }, { status: 500 })
  }
}

// GET - Get practice sessions for an interview prep
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(req.url)
    const interviewPrepId = searchParams.get("interviewPrepId")

    if (!interviewPrepId) {
      return NextResponse.json({ error: "Interview prep ID is required" }, { status: 400 })
    }

    // Verify ownership
    const interviewPrep = await prisma.interviewPrep.findFirst({
      where: {
        id: interviewPrepId,
        userId,
      },
    })

    if (!interviewPrep) {
      return NextResponse.json({ error: "Interview preparation not found" }, { status: 404 })
    }

    const sessions = await prisma.interviewPracticeSession.findMany({
      where: { interviewPrepId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error("Error fetching practice sessions:", error)
    return NextResponse.json({ error: "Failed to fetch practice sessions" }, { status: 500 })
  }
}
