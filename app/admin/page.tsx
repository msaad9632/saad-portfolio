import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { getProjects } from "@/lib/content";

export default async function AdminDashboard() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const projects = getProjects();

  return (
    <div className="max-w-2xl">
      <p className="label mb-3" style={{ color: "var(--text-3)" }}>
        Admin
      </p>
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Dashboard</h1>
      <Link
        href="/admin/projects"
        className="label link-underline inline-flex items-center gap-2 rounded-sm px-4 py-3"
        style={{ border: "1px solid var(--hairline)" }}
      >
        Edit projects ({projects.length}) →
      </Link>
      <p className="mt-8 text-sm" style={{ color: "var(--text-3)" }}>
        Saves commit directly to <code>content/*.json</code> on the <code>master</code> branch — Vercel rebuilds
        automatically, usually within ~60s.
      </p>
    </div>
  );
}
