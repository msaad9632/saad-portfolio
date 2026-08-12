import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { getExperience } from "@/lib/content";
import ExperienceEditor from "./ExperienceEditor";

export default async function AdminExperience() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const entries = getExperience();

  return (
    <div className="max-w-xl">
      <p className="label mb-3" style={{ color: "var(--text-3)" }}>
        Admin
      </p>
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Experience</h1>
      <ExperienceEditor entries={entries} />
    </div>
  );
}
