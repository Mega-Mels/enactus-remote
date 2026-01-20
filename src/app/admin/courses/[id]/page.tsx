import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditCourse({ params }: Props) {
  const { id } = await params;
  if (!id) redirect("/admin/courses");

  const { supabase } = await requireAdmin();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  async function update(formData: FormData) {
    "use server";
    const { supabase } = await requireAdmin();

    await supabase
      .from("courses")
      .update({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        thumbnail_url: formData.get("thumbnail_url"),
        resource_url: formData.get("resource_url"),
        is_certified: formData.get("is_certified") === "on",
        is_active: formData.get("is_active") === "on",
      })
      .eq("id", id);

    redirect("/admin/courses");
  }

  return (
    <div className="p-8 max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Edit Course</h1>

      <form action={update} className="space-y-4">
        <input name="title" defaultValue={course.title} className="w-full border p-3 rounded" />
        <input name="category" defaultValue={course.category} className="w-full border p-3 rounded" />
        <input name="thumbnail_url" defaultValue={course.thumbnail_url} className="w-full border p-3 rounded" />
        <input name="resource_url" defaultValue={course.resource_url} className="w-full border p-3 rounded" />
        <textarea name="description" defaultValue={course.description} className="w-full border p-3 rounded" rows={5} />

        <label className="flex gap-2">
          <input type="checkbox" name="is_certified" defaultChecked={course.is_certified} />
          Certified
        </label>

        <label className="flex gap-2">
          <input type="checkbox" name="is_active" defaultChecked={course.is_active} />
          Active
        </label>

        <button className="px-4 py-2 bg-black text-white rounded">Save</button>
      </form>
    </div>
  );
}
