import prisma from "@/lib/prisma"
import { JobCard } from "@/components/JobCard"

interface JobListProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function JobList({ searchParams }: JobListProps) {
  const title = searchParams.title as string | undefined
  const location = searchParams.location as string | undefined
  const type = searchParams.type as string | undefined
  const minSalary = searchParams.minSalary as string | undefined

  // Build where clause for filtering
  const where: any = {
    status: "approved", // Only show approved jobs
  }

  if (title) {
    where.OR = [
      { title: { contains: title, mode: "insensitive" } },
      { company: { contains: title, mode: "insensitive" } },
      { description: { contains: title, mode: "insensitive" } },
    ]
  }

  if (location) {
    where.location = { contains: location, mode: "insensitive" }
  }

  if (type && type !== "all") {
    where.type = type
  }

  if (minSalary) {
    where.salaryMin = { gte: parseInt(minSalary) }
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  if (jobs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-gray-400 mb-4">No jobs found</p>
        <p className="text-gray-500">Try adjusting your search filters</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Found
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
