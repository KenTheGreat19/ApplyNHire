// scripts/removeSeedEmployers.js
// Removes seed employer accounts from database

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function removeSeedEmployers() {
  console.log('🧹 Removing seed employer accounts...\n')

  try {
    const seedEmployerEmails = [
      'tech@innovate.com',
      'hr@designco.com',
      'jobs@startupxyz.com',
      'contact@mediocretech.com',
    ]

    // Find seed employers
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
        role: true
      }
    })

    if (seedEmployers.length === 0) {
      console.log('✅ No seed employer accounts found. Database is clean!')
      return
    }

    console.log(`📋 Found ${seedEmployers.length} seed employer accounts:\n`)
    seedEmployers.forEach((emp, index) => {
      console.log(`${index + 1}. ${emp.name} (${emp.email})`)
      console.log(`   Company: ${emp.companyName}`)
      console.log('')
    })

    console.log('🗑️  Deleting seed employer accounts...\n')

    // Delete seed employers
    const deleteResult = await prisma.user.deleteMany({
      where: {
        email: {
          in: seedEmployerEmails
        }
      }
    })

    console.log(`✅ Successfully deleted ${deleteResult.count} seed employer accounts!`)

    // Show remaining employers
    const remainingEmployers = await prisma.user.count({
      where: {
        role: 'EMPLOYER'
      }
    })

    console.log(`\n📊 Remaining employer accounts: ${remainingEmployers}`)

  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the cleanup
removeSeedEmployers()
  .then(() => {
    console.log('\n✨ Cleanup completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Cleanup failed:', error)
    process.exit(1)
  })
