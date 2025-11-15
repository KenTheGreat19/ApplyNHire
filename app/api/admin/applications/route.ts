import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET - Get all applications for admin
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    const adminEmail = process.env.ADMIN_EMAIL
    if (!session?.user || session.user.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const applications = await prisma.application.findMany({
      orderBy: { appliedAt: "desc" },
      include: {
        applicant: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            company: true,
            employer: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        }
      },
      take: 500,
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
