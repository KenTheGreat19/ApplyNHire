import UsersClient from "../users/UsersClient"

export const metadata = {
  title: "Applicants - Admin",
  description: "Manage all applicants",
}

export default function AdminApplicantsPage() {
  return <UsersClient />
}
