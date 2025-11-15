import UsersClient from "../users/UsersClient"

export const metadata = {
  title: "Employers - Admin",
  description: "Manage all employers",
}

export default function AdminEmployersPage() {
  return <UsersClient />
}
