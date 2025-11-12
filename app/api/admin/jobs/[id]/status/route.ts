import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// PATCH - Approve or reject job
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    const adminEmail = process.env.ADMIN_EMAIL
    if (!session?.user || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status, rejectionReason } = body

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        employer: {
          select: { email: true, name: true }
        }
      }
    })

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data: { status },
    })

    // Send email notification
    try {
      if (status === "approved") {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/job-approved`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId: updatedJob.id }),
        })
      } else if (status === "rejected") {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/job-rejected`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId: updatedJob.id, reason: rejectionReason }),
        })
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
    }

    return NextResponse.json(updatedJob)
  } catch (error) {
    console.error("Error updating job status:", error)
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}
