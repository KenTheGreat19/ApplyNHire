import DashboardClient from "./DashboardClient"

export const metadata = {
  title: "Admin Dashboard - ApplyNHire",
  description: "Analytics and platform management",
}

export default async function AdminDashboard() {
  return <DashboardClient />
}
