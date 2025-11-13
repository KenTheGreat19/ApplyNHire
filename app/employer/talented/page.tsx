import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { EmployerSidebar } from "@/components/employer/EmployerSidebar"
import { TalentedCandidateFinder } from "@/components/employer/TalentedCandidateFinder"

export const metadata = {
  title: "Talented - Find Candidates - ApplyNHire",
  description: "Discover quality candidates with smart sourcing",
}

export default async function TalentedPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "EMPLOYER") {
    redirect("/auth/employer")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <EmployerSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <TalentedCandidateFinder />
        </div>
      </div>
    </div>
  )
}
