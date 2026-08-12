"use server";

import { requireAdmin } from "@/lib/session";
import { commitJson } from "@/lib/github-commit";
import { experienceSchema } from "@/lib/schema";
import { getExperience } from "@/lib/content";
import type { SaveResult } from "../projects/actions";

async function saveExperience(entries: unknown, message: string): Promise<SaveResult> {
  let accessToken: string;
  try {
    accessToken = await requireAdmin();
  } catch {
    return { ok: false, error: "Not signed in." };
  }

  const parsed = experienceSchema.safeParse(entries);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  try {
    await commitJson(accessToken, "content/experience.json", parsed.data, message);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    if (msg === "stale") return { ok: false, error: "Content changed elsewhere — reload and retry." };
    return { ok: false, error: `Commit failed: ${msg}` };
  }
  return { ok: true };
}

export async function updateEntry(index: number, formData: FormData): Promise<SaveResult> {
  const entries = getExperience();
  if (!entries[index]) return { ok: false, error: "Entry not found." };
  entries[index] = {
    when: String(formData.get("when") ?? ""),
    what: String(formData.get("what") ?? ""),
    where: String(formData.get("where") ?? ""),
    note: String(formData.get("note") ?? ""),
    type: formData.get("type") === "education" ? "education" : "work",
  };
  return saveExperience(entries, `admin: update experience entry ${index}`);
}

export async function addEntry(formData: FormData): Promise<SaveResult> {
  const entries = getExperience();
  entries.push({
    when: String(formData.get("when") ?? ""),
    what: String(formData.get("what") ?? ""),
    where: String(formData.get("where") ?? ""),
    note: String(formData.get("note") ?? ""),
    type: formData.get("type") === "education" ? "education" : "work",
  });
  return saveExperience(entries, "admin: add experience entry");
}

export async function removeEntry(index: number): Promise<SaveResult> {
  const entries = getExperience();
  if (!entries[index]) return { ok: false, error: "Entry not found." };
  entries.splice(index, 1);
  return saveExperience(entries, `admin: remove experience entry ${index}`);
}

export async function moveEntry(index: number, direction: -1 | 1): Promise<SaveResult> {
  const entries = getExperience();
  const target = index + direction;
  if (!entries[index] || !entries[target]) return { ok: false, error: "Can't move further." };
  [entries[index], entries[target]] = [entries[target], entries[index]];
  return saveExperience(entries, `admin: reorder experience entry ${index}`);
}
