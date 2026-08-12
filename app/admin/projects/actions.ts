"use server";

import { requireAdmin } from "@/lib/session";
import { commitJson } from "@/lib/github-commit";
import { projectsSchema, type Project } from "@/lib/schema";
import { getProjects } from "@/lib/content";

export type SaveResult = { ok: true } | { ok: false; error: string };

async function commitProjects(projects: Project[], message: string): Promise<SaveResult> {
  let accessToken: string;
  try {
    accessToken = await requireAdmin();
  } catch {
    return { ok: false, error: "Not signed in." };
  }

  const parsed = projectsSchema.safeParse(projects);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  try {
    await commitJson(accessToken, "content/projects.json", parsed.data, message);
  } catch (e) {
    const message2 = e instanceof Error ? e.message : "unknown error";
    if (message2 === "stale") return { ok: false, error: "Content changed elsewhere — reload and retry." };
    return { ok: false, error: `Commit failed: ${message2}` };
  }

  // content/*.json is read from the filesystem at build time (see lib/content.ts),
  // so the live site only reflects this commit once Vercel's auto-deploy finishes
  // (~60s) — nothing else to invalidate on this end.
  return { ok: true };
}

export async function saveProject(slug: string, formData: FormData): Promise<SaveResult> {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { ok: false, error: "Project not found." };

  const updated: Project = {
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
    size: (formData.get("size") as "lg" | "md") || projects[index].size,
  };

  const nextProjects = [...projects];
  nextProjects[index] = updated;
  return commitProjects(nextProjects, `admin: update ${slug}`);
}

export async function addProject(formData: FormData): Promise<SaveResult> {
  const projects = getProjects();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
  if (!slug) return { ok: false, error: "Slug is required." };
  if (projects.some((p) => p.slug === slug)) return { ok: false, error: "A project with that slug already exists." };

  const newProject: Project = {
    slug,
    name: String(formData.get("name") ?? slug),
    oneLiner: String(formData.get("oneLiner") ?? ""),
    description: String(formData.get("description") ?? ""),
    role: String(formData.get("role") ?? "Solo"),
    stack: String(formData.get("stack") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    size: "md",
    featured: false,
  };

  return commitProjects([...projects, newProject], `admin: add project ${slug}`);
}

export async function removeProject(slug: string): Promise<SaveResult> {
  const projects = getProjects();
  const next = projects.filter((p) => p.slug !== slug);
  if (next.length === projects.length) return { ok: false, error: "Project not found." };
  return commitProjects(next, `admin: remove project ${slug}`);
}

export async function moveProject(slug: string, direction: -1 | 1): Promise<SaveResult> {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  const target = index + direction;
  if (index === -1 || !projects[target]) return { ok: false, error: "Can't move further." };
  const next = [...projects];
  [next[index], next[target]] = [next[target], next[index]];
  return commitProjects(next, `admin: reorder ${slug}`);
}
