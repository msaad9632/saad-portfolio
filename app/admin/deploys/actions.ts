"use server";

import { requireAdmin } from "@/lib/session";
import { listFileCommits, restoreFileToRef, type CommitSummary } from "@/lib/github-commit";

export type CommitsResult = { ok: true; commits: CommitSummary[] } | { ok: false; error: string };
export type RestoreResult = { ok: true } | { ok: false; error: string };

const CONTENT_FILES = ["content/site.json", "content/projects.json", "content/experience.json"] as const;
export type ContentFile = (typeof CONTENT_FILES)[number];

export async function fetchCommits(path: ContentFile): Promise<CommitsResult> {
  let accessToken: string;
  try {
    accessToken = await requireAdmin();
  } catch {
    return { ok: false, error: "Not signed in." };
  }
  try {
    const commits = await listFileCommits(accessToken, path);
    return { ok: true, commits };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown error" };
  }
}

export async function restoreCommit(path: ContentFile, sha: string): Promise<RestoreResult> {
  let accessToken: string;
  try {
    accessToken = await requireAdmin();
  } catch {
    return { ok: false, error: "Not signed in." };
  }
  try {
    await restoreFileToRef(accessToken, path, sha, `admin: rollback ${path} to ${sha.slice(0, 7)}`);
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    if (msg === "stale") return { ok: false, error: "Content changed elsewhere — reload and retry." };
    return { ok: false, error: msg };
  }
}
