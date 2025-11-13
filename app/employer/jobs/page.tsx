import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function EmployerJobsPage() {
  // Redirect to dashboard since that's where jobs are managed
  redirect("/employer/dashboard")
}
