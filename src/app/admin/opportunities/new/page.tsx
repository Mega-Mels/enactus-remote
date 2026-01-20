import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewOpportunity() {
  await requireAdmin();

  async function create(formData: FormData) {
    "use server";

    const { supabase, user } = await requireAdmin();

    const title = String(formData.get("title") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const resource_url = String(formData.get("resource_url") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const is_active = formData.get("is_active") === "on";

    if (!title || !company || !resource_url) {
      throw new Error("Title, Company, and Resource URL are required.");
    }

    // Basic URL sanity check (not perfect, but avoids obvious bad input)
    try {
      // eslint-disable-next-line no-new
      new URL(resource_url);
    } catch {
      throw new Error("Apply URL must be a valid URL (include https://).");
    }

    const payload = {
      title,
      company,
      location: location || null,
      description: description || null,
      resource_url,
      is_active,          // ✅ this controls visibility on the user page
      posted_by: user.id,
    };

    const { error } = await supabase.from("jobs").insert(payload);
    if (error) {
      throw new Error(error.message);
    }

    redirect("/admin/opportunities");
  }

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">New Opportunity</h1>
        <p className="text-slate-600">
          Create a job listing. Only <span className="font-semibold">Active</span> jobs appear for users.
        </p>
      </div>

      <form action={create} className="space-y-4">
        <input
          className="w-full border rounded p-3"
          name="title"
          placeholder="Title (e.g., Junior Frontend Developer)"
          required
        />

        <input
          className="w-full border rounded p-3"
          name="company"
          placeholder="Company (e.g., Acme Ltd)"
          required
        />

        <input
          className="w-full border rounded p-3"
          name="location"
          placeholder="Location (optional, e.g., Remote / Mbabane)"
        />

        <input
          className="w-full border rounded p-3"
          name="resource_url"
          placeholder="Resource URL (must include https://)"
          required
        />

        <textarea
          className="w-full border rounded p-3"
          name="description"
          placeholder="Description (optional)"
          rows={6}
        />

        <label className="flex items-center gap-2 select-none">
          <input type="checkbox" name="is_active" />
          <span className="font-medium">Active (show to users)</span>
        </label>

        <button className="px-4 py-2 rounded bg-black text-white">
          Create
        </button>
      </form>
    </div>
  );
}
