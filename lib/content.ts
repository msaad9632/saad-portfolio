import fs from "node:fs";
import path from "node:path";
import { siteSchema, projectsSchema, experienceSchema, type Site, type Project, type ExperienceEntry } from "./schema";

// Reads content/*.json (git-as-the-database, see PLAN). Sync fs reads are
// fine here — this only ever runs server-side (build time / server components).
function readJson(file: string): unknown {
  const full = path.join(process.cwd(), "content", file);
  return JSON.parse(fs.readFileSync(full, "utf-8"));
}

export function getSite(): Site {
  return siteSchema.parse(readJson("site.json"));
}

export function getProjects(): Project[] {
  return projectsSchema.parse(readJson("projects.json"));
}

export function getExperience(): ExperienceEntry[] {
  return experienceSchema.parse(readJson("experience.json"));
}
