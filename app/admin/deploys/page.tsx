import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { fetchCommits } from "./actions";
import CommitList from "./CommitList";

const FILES = [
  { path: "content/site.json" as const, label: "Site copy" },
  { path: "content/projects.json" as const, label: "Projects" },
  { path: "content/experience.json" as const, label: "Experience" },
];

export default async function AdminDeploys() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const results = await Promise.all(FILES.map((f) => fetchCommits(f.path)));

  return (
    <div className="max-w-2xl">
      <p className="label mb-3" style={{ color: "var(--text-3)" }}>
        Admin
      </p>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Deploys &amp; rollback</h1>
      <p className="mb-8 text-sm" style={{ color: "var(--text-3)" }}>
        Git history for each content file. Restoring commits a new revert immediately; the live site picks it up
        after Vercel&apos;s next auto-deploy (~60s).
      </p>

      {FILES.map((f, i) => {
        const result = results[i];
        return (
          <div key={f.path} className="mb-8 rounded-sm p-6" style={{ border: "1px solid var(--hairline)" }}>
            <p className="label mb-4" style={{ color: "var(--text-3)" }}>
              {f.label} — {f.path}
            </p>
            {result.ok ? (
              <CommitList path={f.path} commits={result.commits} />
            ) : (
              <p className="text-sm" style={{ color: "#f87171" }}>
                {result.error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
