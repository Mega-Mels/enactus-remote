import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminCoursesPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("courses")
    .select("id,title,category,is_certified,is_active,updated_at")
    .order("updated_at", { ascending: false });

  if (error) return <div className="p-8">Error: {error.message}</div>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link href="/admin/courses/new" className="px-4 py-2 bg-black text-white rounded">
          New
        </Link>
      </div>

      <table className="w-full bg-white border rounded">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3">Certified</th>
            <th className="p-3">Active</th>
            <th className="p-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.title}</td>
              <td className="p-3">{c.category}</td>
              <td className="p-3 text-center">{c.is_certified ? "Yes" : "No"}</td>
              <td className="p-3 text-center">{c.is_active ? "Yes" : "No"}</td>
              <td className="p-3 text-center">
                <Link className="underline" href={`/admin/courses/${c.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
