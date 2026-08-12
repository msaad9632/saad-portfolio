import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { getProjects } from "@/lib/content";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Muhammad Saad`,
    description: project.oneLiner,
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="layer scrim min-h-screen px-8 py-32 sm:px-14 sm:py-44">
        <Link href="/#work" className="label link-underline mb-16 inline-flex items-center gap-2">
          ← Back to Work
        </Link>

        <p className="label mb-3" style={{ color: "var(--text-3)" }}>
          {project.role}
        </p>
        <h1
          className="mb-8 max-w-[24ch] font-semibold tracking-tight"
          style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          {project.name}
        </h1>

        <p className="mb-10 max-w-[42ch] text-lg leading-snug" style={{ color: "var(--text)" }}>
          {project.oneLiner}
        </p>

        <p className="mb-10 max-w-[62ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
          {project.description}
        </p>

        <p className="label mb-10" style={{ color: "var(--text-3)" }}>
          {project.stack.join("  ·  ")}
        </p>

        {project.images && project.images.length > 0 && (
          <div className="mb-10 grid max-w-[62rem] grid-cols-1 gap-4 sm:grid-cols-2">
            {project.images.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-sm"
                style={{ border: "1px solid var(--hairline)", background: "rgba(255,255,255,0.03)" }}
              >
                <Image
                  src={src}
                  alt={`${project.name} screenshot`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="group/cta label link-underline inline-flex items-center gap-3 !text-[var(--text)]"
            >
              View Project
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="label link-underline inline-flex items-center gap-2"
            >
              Source ↗
            </a>
          )}
          {project.note && (
            <span className="label" style={{ color: "var(--text-3)" }}>
              {project.note}
            </span>
          )}
        </div>
      </main>
    </>
  );
}
