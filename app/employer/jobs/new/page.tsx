import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import NewJobClient from "./NewJobClient"

export const metadata = {
  title: "Post a Job - ApplyNHire",
  description: "Create and publish a new job posting",
}

export default async function NewJobPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "EMPLOYER") {
    redirect("/auth/employer")
  }

  return <NewJobClient user={session.user as any} />
}
