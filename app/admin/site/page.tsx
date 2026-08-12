import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { getSite } from "@/lib/content";
import SaveForm from "./SaveForm";
import SkillsEditor from "./SkillsEditor";
import { saveHero, saveAbout, saveContact } from "./actions";

export default async function AdminSite() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const site = getSite();

  return (
    <div className="max-w-xl">
      <p className="label mb-3" style={{ color: "var(--text-3)" }}>
        Admin
      </p>
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Site copy</h1>

      <SaveForm title="Hero + SEO" action={saveHero}>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Eyebrow
          </span>
          <input name="eyebrow" defaultValue={site.hero.eyebrow} className="admin-input" />
        </label>
        <label className="mb-3 flex items-center gap-2">
          <input type="checkbox" name="available" defaultChecked={site.hero.available} />
          <span className="label" style={{ color: "var(--text-3)" }}>
            Available for new projects
          </span>
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Headline lines (one per line)
          </span>
          <textarea name="headlineLines" defaultValue={site.hero.headlineLines.join("\n")} rows={3} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Accent line index (0-based)
          </span>
          <input type="number" name="accentLineIndex" defaultValue={site.hero.accentLineIndex} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Sub-copy
          </span>
          <textarea name="subCopy" defaultValue={site.hero.subCopy} rows={3} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            CTA label
          </span>
          <input name="ctaLabel" defaultValue={site.hero.ctaLabel} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            CTA href
          </span>
          <input name="ctaHref" defaultValue={site.hero.ctaHref} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            SEO title
          </span>
          <input name="seoTitle" defaultValue={site.seo.title} className="admin-input" />
        </label>
        <label className="block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            SEO description
          </span>
          <textarea name="seoDescription" defaultValue={site.seo.description} rows={2} className="admin-input" />
        </label>
      </SaveForm>

      <SaveForm title="About" action={saveAbout}>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Eyebrow
          </span>
          <input name="eyebrow" defaultValue={site.about.eyebrow} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Heading
          </span>
          <input name="heading" defaultValue={site.about.heading} className="admin-input" />
        </label>
        <label className="block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Paragraphs (one per line)
          </span>
          <textarea name="paragraphs" defaultValue={site.about.paragraphs.join("\n")} rows={6} className="admin-input" />
        </label>
      </SaveForm>

      <SaveForm title="Contact" action={saveContact}>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Eyebrow
          </span>
          <input name="eyebrow" defaultValue={site.contact.eyebrow} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Heading
          </span>
          <input name="heading" defaultValue={site.contact.heading} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Email
          </span>
          <input name="email" defaultValue={site.contact.email} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            GitHub URL
          </span>
          <input name="github" defaultValue={site.contact.github} className="admin-input" />
        </label>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            LinkedIn URL
          </span>
          <input name="linkedin" defaultValue={site.contact.linkedin} className="admin-input" />
        </label>
        <label className="block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Location line
          </span>
          <input name="locationLine" defaultValue={site.contact.locationLine} className="admin-input" />
        </label>
      </SaveForm>

      <SkillsEditor skills={site.skills} />
    </div>
  );
}
