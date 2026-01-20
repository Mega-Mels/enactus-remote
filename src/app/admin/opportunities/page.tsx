import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminOpportunities() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("jobs")
    .select("id,title,company,is_active,created_at")
    .order("updated_at", { ascending: false });

  if (error) {
    return <div className="p-8">Error: {error.message}</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Opportunities</h1>
        <Link className="px-4 py-2 rounded bg-black text-white" href="/admin/opportunities/new">
          New
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Company</th>
              <th className="p-3">Published</th>
              <th className="p-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3">{row.title}</td>
                <td className="p-3">{row.company}</td>
                <td className="p-3">
                  <Link className="underline" href={`/admin/opportunities/${row.id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td className="p-3 text-slate-500" colSpan={4}>No opportunities yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
