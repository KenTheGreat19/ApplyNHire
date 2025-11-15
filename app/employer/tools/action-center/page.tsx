import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import ActionCenterClient from "./ActionCenterClient"

export const metadata = {
  title: "Action Center - ApplyNHire",
  description: "Centralized hiring tasks for employers",
}

export default async function ActionCenterPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== "EMPLOYER") {
    redirect("/auth/employer")
  }

  return <ActionCenterClient user={session.user as any} />
}
