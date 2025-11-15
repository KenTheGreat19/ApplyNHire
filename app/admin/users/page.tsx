import UsersClient from "./UsersClient"

export const metadata = {
  title: "Users Management - Admin",
  description: "Manage all users",
}

export default function AdminUsersPage() {
  return <UsersClient />
}
