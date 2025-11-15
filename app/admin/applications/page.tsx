import ApplicationsClient from "./ApplicationsClient"

export const metadata = {
  title: "Applications - Admin",
  description: "Manage all applications",
}

export default function AdminApplicationsPage() {
  return <ApplicationsClient />
}
