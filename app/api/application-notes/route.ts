import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const applicationNoteSchema = z.object({
  applicationId: z.string(),
  noteType: z.enum(["general", "follow_up", "interview", "offer", "rejection"]).default("general"),
  content: z.string().min(1),
  reminderDate: z.string().datetime().optional(),
})

// GET - Fetch notes for an application
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(req.url)
    const applicationId = searchParams.get("applicationId")

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
    }

    // Verify ownership of application
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        applicantId: userId,
      },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    const notes = await prisma.applicationNote.findMany({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ notes })
  } catch (error) {
    console.error("Error fetching application notes:", error)
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
  }
}

// POST - Create application note
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const validatedData = applicationNoteSchema.parse(body)

    // Verify ownership
    const application = await prisma.application.findFirst({
      where: {
        id: validatedData.applicationId,
        applicantId: userId,
      },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    const note = await prisma.applicationNote.create({
      data: {
        ...validatedData,
        reminderDate: validatedData.reminderDate ? new Date(validatedData.reminderDate) : null,
      },
    })

    return NextResponse.json({ note }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error creating application note:", error)
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
  }
}

// PUT - Update note (mark as completed or edit)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const { id, content, isCompleted, reminderDate } = body

    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 })
    }

    // Verify ownership through application
    const note = await prisma.applicationNote.findUnique({
      where: { id },
      include: { application: true },
    })

    if (!note || note.application.applicantId !== userId) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    const updatedNote = await prisma.applicationNote.update({
      where: { id },
      data: {
        content: content !== undefined ? content : undefined,
        isCompleted: isCompleted !== undefined ? isCompleted : undefined,
        reminderDate: reminderDate ? new Date(reminderDate) : undefined,
      },
    })

    return NextResponse.json({ note: updatedNote })
  } catch (error) {
    console.error("Error updating application note:", error)
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
  }
}

// DELETE - Delete note
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
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 })
    }

    // Verify ownership
    const note = await prisma.applicationNote.findUnique({
      where: { id },
      include: { application: true },
    })

    if (!note || note.application.applicantId !== userId) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    await prisma.applicationNote.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Note deleted successfully" })
  } catch (error) {
    console.error("Error deleting application note:", error)
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
  }
}
