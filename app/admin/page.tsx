import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminDashboardClient from "./AdminDashboardClient"

export const metadata = {
  title: "Admin Portal - ApplyNHire",
  description: "Manage all job postings",
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  const adminEmail = process.env.ADMIN_EMAIL
  if (!session?.user || session.user.email !== adminEmail) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Manage job postings and platform statistics
          </p>
        </div>

        <AdminDashboardClient />
      </div>
    </div>
  )
}
