import JobsClient from "./JobsClient"

export const metadata = {
  title: "Jobs Management - Admin",
  description: "Manage all job postings",
}

export default function AdminJobsPage() {
  return <JobsClient />
}
