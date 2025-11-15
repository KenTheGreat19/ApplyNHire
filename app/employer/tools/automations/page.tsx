import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AutomationsClient from "./AutomationsClient"

export const metadata = {
  title: "Automations - ApplyNHire",
  description: "Build hiring workflows that run themselves",
}

export default async function AutomationsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "EMPLOYER") {
    redirect("/auth/employer")
  }

  return <AutomationsClient user={session.user as any} />
}
