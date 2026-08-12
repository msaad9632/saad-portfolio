import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { getProjects } from "@/lib/content";
import ProjectForm from "./ProjectForm";

export default async function AdminProjects() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const projects = getProjects();

  return (
    <div className="max-w-xl">
      <p className="label mb-3" style={{ color: "var(--text-3)" }}>
        Admin
      </p>
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Projects</h1>
      {projects.map((p) => (
        <ProjectForm key={p.slug} project={p} />
      ))}
    </div>
  );
}
