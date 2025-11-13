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

  return <EmployerDashboardClient user={user} />
}
