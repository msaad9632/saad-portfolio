import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://itssaad.vercel.app";
  const projectPages = getProjects().map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [{ url: base, lastModified: new Date() }, ...projectPages];
}
