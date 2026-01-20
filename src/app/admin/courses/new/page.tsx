import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewCourse() {
  await requireAdmin();

  async function create(formData: FormData) {
    "use server";
    const { supabase, user } = await requireAdmin();

    const payload = {
      title: String(formData.get("title")),
      description: String(formData.get("description") || ""),
      category: String(formData.get("category") || "General"),
      thumbnail_url: String(formData.get("thumbnail_url") || ""),
      resource_url: String(formData.get("resource_url")),
      is_certified: formData.get("is_certified") === "on",
      is_active: formData.get("is_active") === "on",
      posted_by: user.id,
    };

    const { error } = await supabase.from("courses").insert(payload);
    if (error) throw new Error(error.message);

    redirect("/admin/courses");
  }

  return (
    <div className="p-8 max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">New Course</h1>

      <form action={create} className="space-y-4">
        <input name="title" required className="w-full border p-3 rounded" placeholder="Title" />
        <input name="category" className="w-full border p-3 rounded" placeholder="Category" />
        <input name="thumbnail_url" className="w-full border p-3 rounded" placeholder="Thumbnail URL" />
        <input name="resource_url" required className="w-full border p-3 rounded" placeholder="Course URL" />
        <textarea name="description" className="w-full border p-3 rounded" rows={5} placeholder="Description" />

        <label className="flex gap-2">
          <input type="checkbox" name="is_certified" />
          Certified
        </label>

        <label className="flex gap-2">
          <input type="checkbox" name="is_active" />
          Active (visible to users)
        </label>

        <button className="px-4 py-2 bg-black text-white rounded">Create</button>
      </form>
    </div>
  );
}
