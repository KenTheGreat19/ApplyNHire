const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function cleanupAllUsers() {
  try {
    console.log('Starting cleanup of all employers and applicants...')

    // Delete all applicants (role = APPLICANT)
    const deletedApplicants = await prisma.user.deleteMany({
      where: {
        role: 'APPLICANT'
      }
    })
    console.log(`✅ Deleted ${deletedApplicants.count} applicants`)

    // Delete all employers (role = EMPLOYER)
    const deletedEmployers = await prisma.user.deleteMany({
      where: {
        role: 'EMPLOYER'
      }
    })
    console.log(`✅ Deleted ${deletedEmployers.count} employers`)

    // Verify remaining users (should only be admins)
    const remainingUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    })

    console.log('\n📊 Remaining users in database:')
    remainingUsers.forEach(user => {
      console.log(`- ${user.email} (${user.name}) - Role: ${user.role}`)
    })

    console.log('\n✨ Cleanup complete! You can now create new accounts.')

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanupAllUsers()
