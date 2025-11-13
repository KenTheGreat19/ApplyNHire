// Script to approve all pending jobs
// Run this with: node scripts/approveAllJobs.js

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function approveAllJobs() {
  try {
    console.log("🔍 Finding pending jobs...")
    
    const pendingJobs = await prisma.job.findMany({
      where: { status: "pending" },
      select: {
        id: true,
        title: true,
        company: true,
        status: true,
      },
    })

    if (pendingJobs.length === 0) {
      console.log("✅ No pending jobs found. All jobs are already approved!")
      return
    }

    console.log(`📋 Found ${pendingJobs.length} pending job(s):`)
    pendingJobs.forEach((job, index) => {
      console.log(`   ${index + 1}. ${job.title} at ${job.company}`)
    })

    console.log("\n⏳ Approving all jobs...")

    const result = await prisma.job.updateMany({
      where: { status: "pending" },
      data: { status: "approved" },
    })

    console.log(`\n✅ SUCCESS! Approved ${result.count} job(s)`)
    console.log("🌐 Your jobs are now visible on the homepage!")
    console.log("\n📍 Visit: http://localhost:3001 to see your jobs\n")
  } catch (error) {
    console.error("❌ Error approving jobs:", error)
  } finally {
    await prisma.$disconnect()
  }
}

approveAllJobs()
