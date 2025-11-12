import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import EmployerDashboardClient from "./EmployerDashboardClient"

export const metadata = {
  title: "Employer Dashboard - ApplyNHire",
  description: "Manage your job postings",
}

export default async function EmployerDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "EMPLOYER") {
    redirect("/auth/employer")
  }

  const user = session.user as any

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            {user.companyName && `${user.companyName} • `}Manage your job postings
          </p>
        </div>

        <EmployerDashboardClient companyName={user.companyName || user.name} />
      </div>
    </div>
  )
}
