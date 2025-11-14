// scripts/checkDatabaseStats.js
// Shows current database statistics for jobs and employers

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkDatabaseStats() {
  console.log('📊 Checking database statistics...\n')

  try {
    // Get all jobs with employer info
    const jobs = await prisma.job.findMany({
      include: {
        employer: {
          select: {
            email: true,
            name: true,
            companyName: true,
            role: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            applications: true,
            publicComments: true,
            likes: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`📋 Total Jobs: ${jobs.length}\n`)

    if (jobs.length > 0) {
      console.log('🔍 Job Details:\n')
      jobs.forEach((job, index) => {
        console.log(`${index + 1}. ${job.title}`)
        console.log(`   Company: ${job.company}`)
        console.log(`   Status: ${job.status}`)
        console.log(`   Posted by: ${job.employer.name} (${job.employer.email})`)
        console.log(`   Created: ${new Date(job.createdAt).toLocaleDateString()}`)
        console.log(`   Applications: ${job._count.applications}, Comments: ${job._count.publicComments}, Likes: ${job._count.likes}`)
        console.log('')
      })
    }

    // Group by employer
    const jobsByEmployer = jobs.reduce((acc, job) => {
      const email = job.employer.email
      if (!acc[email]) {
        acc[email] = {
          info: job.employer,
          jobs: []
        }
      }
      acc[email].jobs.push(job)
      return acc
    }, {})

    console.log('👥 Jobs by Employer:\n')
    Object.entries(jobsByEmployer).forEach(([email, data]) => {
      console.log(`📧 ${email}`)
      console.log(`   Name: ${data.info.name}`)
      console.log(`   Company: ${data.info.companyName || 'N/A'}`)
      console.log(`   Account Created: ${new Date(data.info.createdAt).toLocaleDateString()}`)
      console.log(`   Total Jobs: ${data.jobs.length}`)
      console.log(`   Job Status Breakdown:`)
      const statusCount = data.jobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1
        return acc
      }, {})
      Object.entries(statusCount).forEach(([status, count]) => {
        console.log(`      - ${status}: ${count}`)
      })
      console.log('')
    })

    // Get all employers
    const allEmployers = await prisma.user.findMany({
      where: {
        role: 'EMPLOYER'
      },
      select: {
        email: true,
        name: true,
        companyName: true,
        createdAt: true,
        _count: {
          select: {
            jobs: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('🏢 All Employers:\n')
    allEmployers.forEach((emp, index) => {
      console.log(`${index + 1}. ${emp.name} (${emp.email})`)
      console.log(`   Company: ${emp.companyName || 'N/A'}`)
      console.log(`   Registered: ${new Date(emp.createdAt).toLocaleDateString()}`)
      console.log(`   Jobs Posted: ${emp._count.jobs}`)
      console.log('')
    })

    // Get applicants
    const applicantCount = await prisma.user.count({
      where: {
        role: 'APPLICANT'
      }
    })

    console.log(`\n📊 Summary:`)
    console.log(`   Total Jobs: ${jobs.length}`)
    console.log(`   Total Employers: ${allEmployers.length}`)
    console.log(`   Total Applicants: ${applicantCount}`)
    console.log(`   Total Applications: ${jobs.reduce((sum, j) => sum + j._count.applications, 0)}`)

  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the check
checkDatabaseStats()
  .then(() => {
    console.log('\n✅ Check completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Check failed:', error)
    process.exit(1)
  })
