"use server";

import { requireAdmin } from "@/lib/session";
import { commitJson } from "@/lib/github-commit";
import { siteSchema } from "@/lib/schema";
import { getSite } from "@/lib/content";
import type { SaveResult } from "../projects/actions";

async function saveSite(mutate: (site: ReturnType<typeof getSite>) => void, message: string): Promise<SaveResult> {
  let accessToken: string;
  try {
    accessToken = await requireAdmin();
  } catch {
    return { ok: false, error: "Not signed in." };
  }

  const site = getSite();
  mutate(site);

  const parsed = siteSchema.safeParse(site);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  try {
    await commitJson(accessToken, "content/site.json", parsed.data, message);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    if (msg === "stale") return { ok: false, error: "Content changed elsewhere — reload and retry." };
    return { ok: false, error: `Commit failed: ${msg}` };
  }
  return { ok: true };
}

function linesFromTextarea(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export async function saveHero(formData: FormData): Promise<SaveResult> {
  return saveSite((site) => {
    site.hero.eyebrow = String(formData.get("eyebrow") ?? "");
    site.hero.available = formData.get("available") === "on";
    site.hero.headlineLines = linesFromTextarea(formData.get("headlineLines"));
    site.hero.accentLineIndex = Number(formData.get("accentLineIndex") ?? 0);
    site.hero.subCopy = String(formData.get("subCopy") ?? "");
    site.hero.ctaLabel = String(formData.get("ctaLabel") ?? "");
    site.hero.ctaHref = String(formData.get("ctaHref") ?? "");
    site.seo.title = String(formData.get("seoTitle") ?? site.seo.title);
    site.seo.description = String(formData.get("seoDescription") ?? site.seo.description);
  }, "admin: update hero/seo copy");
}

export async function saveAbout(formData: FormData): Promise<SaveResult> {
  return saveSite((site) => {
    site.about.eyebrow = String(formData.get("eyebrow") ?? "");
    site.about.heading = String(formData.get("heading") ?? "");
    site.about.paragraphs = linesFromTextarea(formData.get("paragraphs"));
  }, "admin: update about copy");
}

export async function saveContact(formData: FormData): Promise<SaveResult> {
  return saveSite((site) => {
    site.contact.eyebrow = String(formData.get("eyebrow") ?? "");
    site.contact.heading = String(formData.get("heading") ?? "");
    site.contact.email = String(formData.get("email") ?? "");
    site.contact.github = String(formData.get("github") ?? "");
    site.contact.linkedin = String(formData.get("linkedin") ?? "");
    site.contact.locationLine = String(formData.get("locationLine") ?? "");
  }, "admin: update contact info");
}

export async function saveSkills(formData: FormData): Promise<SaveResult> {
  return saveSite((site) => {
    const categories = formData.getAll("category") as string[];
    const items = formData.getAll("items") as string[];
    site.skills = categories.map((category, i) => ({
      category,
      items: items[i]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
  }, "admin: update skills");
}

export async function saveVisual(formData: FormData): Promise<SaveResult> {
  return saveSite((site) => {
    site.heroVisual = {
      rings: Number(formData.get("rings")),
      ringsMobile: Number(formData.get("ringsMobile")),
      segments: Number(formData.get("segments")),
      segmentsMobile: Number(formData.get("segmentsMobile")),
      maxRadius: Number(formData.get("maxRadius")),
      vortexStrength: Number(formData.get("vortexStrength")),
      threadAlpha: Number(formData.get("threadAlpha")),
      color: String(formData.get("color") ?? site.heroVisual.color),
      rotationSpeed: Number(formData.get("rotationSpeed")),
    };
  }, "admin: update hero visual parameters");
}
