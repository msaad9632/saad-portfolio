"use server";

import { requireAdmin } from "@/lib/session";
import { commitJson } from "@/lib/github-commit";
import { projectsSchema } from "@/lib/schema";
import { getProjects } from "@/lib/content";

export type SaveResult = { ok: true } | { ok: false; error: string };

export async function saveProject(slug: string, formData: FormData): Promise<SaveResult> {
  let accessToken: string;
  try {
    accessToken = await requireAdmin();
  } catch {
    return { ok: false, error: "Not signed in." };
  }

  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { ok: false, error: "Project not found." };

  const updated = {
    ...projects[index],
    name: String(formData.get("name") ?? ""),
    oneLiner: String(formData.get("oneLiner") ?? ""),
    description: String(formData.get("description") ?? ""),
    role: String(formData.get("role") ?? ""),
    stack: String(formData.get("stack") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    live: String(formData.get("live") ?? "") || undefined,
    repo: String(formData.get("repo") ?? "") || undefined,
  };

  const nextProjects = [...projects];
  nextProjects[index] = updated;

  const parsed = projectsSchema.safeParse(nextProjects);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  try {
    await commitJson(accessToken, "content/projects.json", parsed.data, `admin: update ${slug}`);
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    if (message === "stale") return { ok: false, error: "Content changed elsewhere — reload and retry." };
    return { ok: false, error: `Commit failed: ${message}` };
  }

  // content/*.json is read from the filesystem at build time (see lib/content.ts),
  // so the live site only reflects this commit once Vercel's auto-deploy finishes
  // (~60s) — revalidatePath wouldn't do anything for a plain fs read.
  return { ok: true };
}
