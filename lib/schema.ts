import { z } from "zod";

// Single source of truth for content shapes — reused by the future admin
// save actions (Phase 3+) as well as by lib/content.ts here.

export const projectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  oneLiner: z.string().min(1),
  description: z.string().min(1),
  role: z.string().min(1),
  stack: z.array(z.string()),
  live: z.string().url().optional(),
  repo: z.string().url().optional(),
  featured: z.boolean().optional(),
  note: z.string().optional(),
  images: z.array(z.string().min(1)).optional(),
  video: z.string().min(1).optional(),
  size: z.enum(["lg", "md"]).optional(),
});
export type Project = z.infer<typeof projectSchema>;
export const projectsSchema = z.array(projectSchema);

export const experienceEntrySchema = z.object({
  when: z.string().min(1),
  what: z.string().min(1),
  where: z.string().min(1),
  note: z.string().min(1),
});
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;
export const experienceSchema = z.array(experienceEntrySchema);

export const heroVisualSchema = z.object({
  rings: z.number().int().positive(),
  ringsMobile: z.number().int().positive(),
  segments: z.number().int().positive(),
  segmentsMobile: z.number().int().positive(),
  maxRadius: z.number().positive(),
  vortexStrength: z.number(),
  threadAlpha: z.number(),
  color: z.string().min(1),
  rotationSpeed: z.number(),
});
export type HeroVisual = z.infer<typeof heroVisualSchema>;

export const siteSchema = z.object({
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  hero: z.object({
    eyebrow: z.string().min(1),
    available: z.boolean().optional(),
    headlineLines: z.array(z.string().min(1)),
    accentLineIndex: z.number().int().nonnegative(),
    subCopy: z.string().min(1),
    ctaLabel: z.string().min(1),
    ctaHref: z.string().min(1),
  }),
  about: z.object({
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    paragraphs: z.array(z.string().min(1)),
  }),
  contact: z.object({
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    email: z.string().email(),
    github: z.string().url(),
    linkedin: z.string().url(),
    locationLine: z.string().min(1),
  }),
  skills: z.array(z.object({ category: z.string().min(1), items: z.array(z.string().min(1)) })).optional(),
  heroVisual: heroVisualSchema,
});
export type Site = z.infer<typeof siteSchema>;
