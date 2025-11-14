// scripts/cleanupSeededJobs.js
// Removes all jobs created by seed data, keeping only jobs created by real employers

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function cleanupSeededJobs() {
  console.log('🧹 Starting cleanup of seeded jobs...')

  try {
    // Get all users created by seed (these typically have specific emails or were created early)
    // We'll identify seed users by their email patterns or creation date
    const seedEmployerEmails = [
      'tech@innovate.com',
      'hr@designco.com',
      'jobs@startupxyz.com',
      'contact@mediocretech.com',
    ]

    // Find all jobs created by seed employers
    const seededJobs = await prisma.job.findMany({
      where: {
        employer: {
          email: {
            in: seedEmployerEmails
          }
        }
      },
      include: {
        employer: {
          select: {
            email: true,
            companyName: true
          }
        }
      }
    })

    console.log(`\n📊 Found ${seededJobs.length} jobs created by seed employers:`)
    
    if (seededJobs.length === 0) {
      console.log('✅ No seeded jobs found. Database is clean!')
      return
    }

    // Group by employer for better reporting
    const jobsByEmployer = seededJobs.reduce((acc, job) => {
      const email = job.employer.email
      if (!acc[email]) {
        acc[email] = []
      }
      acc[email].push(job)
      return acc
    }, {})

    console.log('\nJobs to be deleted:')
    Object.entries(jobsByEmployer).forEach(([email, jobs]) => {
      console.log(`  - ${email} (${jobs[0].employer.companyName}): ${jobs.length} jobs`)
    })

    // Confirm before deletion
    console.log('\n⚠️  This will permanently delete these jobs and all related data:')
    console.log('   - Job applications')
    console.log('   - Job comments')
    console.log('   - Job likes')
    console.log('   - Saved jobs')
    console.log('   - Job impressions')
    console.log('   - Job fit criteria and scores')
    
    console.log('\n🗑️  Deleting seeded jobs...')

    // Delete all seeded jobs (cascade will handle related data)
    const deleteResult = await prisma.job.deleteMany({
      where: {
        employer: {
          email: {
            in: seedEmployerEmails
          }
        }
      }
    })

    console.log(`\n✅ Successfully deleted ${deleteResult.count} seeded jobs!`)

    // Optional: Also delete the seed employer accounts
    console.log('\n🤔 Checking for seed employer accounts...')
    const seedEmployers = await prisma.user.findMany({
      where: {
        email: {
          in: seedEmployerEmails
        }
      },
      select: {
        email: true,
        name: true,
        companyName: true,
        _count: {
          select: {
            jobs: true
          }
        }
      }
    })

    if (seedEmployers.length > 0) {
      console.log('\n📋 Seed employer accounts found:')
      seedEmployers.forEach(emp => {
        console.log(`  - ${emp.email} (${emp.companyName}) - ${emp._count.jobs} remaining jobs`)
      })

      console.log('\n💡 Found seed employer accounts.')
      
      // Delete seed employers
      console.log('\n🗑️  Deleting seed employer accounts...')
      const deleteEmployers = await prisma.user.deleteMany({
        where: {
          email: {
            in: seedEmployerEmails
          }
        }
      })
      console.log(`✅ Deleted ${deleteEmployers.count} seed employer accounts`)
    }

    // Show remaining jobs count
    const remainingJobs = await prisma.job.count()
    console.log(`\n📊 Total jobs remaining in database: ${remainingJobs}`)

    // Show real employers
    const realEmployers = await prisma.user.count({
      where: {
        role: 'EMPLOYER',
        email: {
          notIn: seedEmployerEmails
        }
      }
    })
    console.log(`👥 Real employer accounts: ${realEmployers}`)

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the cleanup
cleanupSeededJobs()
  .then(() => {
    console.log('\n✨ Cleanup completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Cleanup failed:', error)
    process.exit(1)
  })
