import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import MediaUploader from "./MediaUploader";

export default async function AdminMedia() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-xl">
      <p className="label mb-3" style={{ color: "var(--text-3)" }}>
        Admin
      </p>
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Media</h1>
      <MediaUploader />
    </div>
  );
}
