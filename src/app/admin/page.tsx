import { requireAdmin } from '@/lib/auth'

export default async function AdminPage() {
  await requireAdmin()

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-slate-600 mt-2">
        You are an admin. This page is blocked for regular users.
      </p>
    </div>
  )
}
