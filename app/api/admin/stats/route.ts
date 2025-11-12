import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET - Get stats
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    const adminEmail = process.env.ADMIN_EMAIL
    if (!session?.user || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [totalJobs, pendingJobs, approvedJobs, rejectedJobs, totalEmployers, totalApplicants] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({ where: { status: "pending" } }),
      prisma.job.count({ where: { status: "approved" } }),
      prisma.job.count({ where: { status: "rejected" } }),
      prisma.user.count({ where: { role: "EMPLOYER" } }),
      prisma.user.count({ where: { role: "APPLICANT" } }),
    ])

    return NextResponse.json({
      totalJobs,
      pendingJobs,
      approvedJobs,
      rejectedJobs,
      totalEmployers,
      totalApplicants,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
