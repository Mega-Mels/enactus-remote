import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditOpportunityPage({ params }: PageProps) {
  const { id } = await params; // ✅ unwrap params

  if (!id || id === "undefined") {
    redirect("/admin/opportunities");
  }

  const { supabase } = await requireAdmin();

  const { data: job, error } = await supabase
    .from("jobs")
    .select("id,title,company,location,description,resource_url,is_active")
    .eq("id", id)
    .single();

  if (error || !job) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Edit Opportunity</h1>
        <p className="text-slate-600 mt-2">Could not load this job.</p>
        <p className="text-red-600 mt-2 text-sm">{error?.message}</p>
      </div>
    );
  }

  async function update(formData: FormData) {
    "use server";
    const { supabase } = await requireAdmin();

    const title = String(formData.get("title") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const resource_url = String(formData.get("resource_url") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const is_active = formData.get("is_active") === "on";

    if (!title || !company || !resource_url) {
      throw new Error("Title, Company, and Resource URL are required.");
    }

    try {
      // eslint-disable-next-line no-new
      new URL(resource_url);
    } catch {
      throw new Error("Resource URL must be a valid URL (include https://).");
    }

    const { error } = await supabase
      .from("jobs")
      .update({
        title,
        company,
        location: location || null,
        description: description || null,
        resource_url,
        is_active,
      })
      .eq("id", id);

    if (error) throw new Error(error.message);

    redirect("/admin/opportunities");
  }

  async function remove() {
    "use server";
    const { supabase } = await requireAdmin();

    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) throw new Error(error.message);

    redirect("/admin/opportunities");
  }

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Edit Opportunity</h1>
        <p className="text-slate-600">
          Toggle <span className="font-semibold">Active</span> to control whether users can see it.
        </p>
      </div>

      <form action={update} className="space-y-4">
        <input
          className="w-full border rounded p-3"
          name="title"
          placeholder="Title"
          required
          defaultValue={job.title ?? ""}
        />

        <input
          className="w-full border rounded p-3"
          name="company"
          placeholder="Company"
          required
          defaultValue={job.company ?? ""}
        />

        <input
          className="w-full border rounded p-3"
          name="location"
          placeholder="Location (optional)"
          defaultValue={job.location ?? ""}
        />

        <input
          className="w-full border rounded p-3"
          name="resource_url"
          placeholder="Resource URL (must include https://)"
          required
          defaultValue={job.resource_url ?? ""}
        />

        <textarea
          className="w-full border rounded p-3"
          name="description"
          placeholder="Description (optional)"
          rows={6}
          defaultValue={job.description ?? ""}
        />

        <label className="flex items-center gap-2 select-none">
          <input type="checkbox" name="is_active" defaultChecked={!!job.is_active} />
          <span className="font-medium">Active (show to users)</span>
        </label>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded bg-black text-white">Save changes</button>

          <button
            formAction={remove}
            className="px-4 py-2 rounded border border-red-300 text-red-700 hover:bg-red-50"
          >
            Delete
          </button>

          <a className="ml-auto underline text-slate-600" href="/admin/opportunities">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
