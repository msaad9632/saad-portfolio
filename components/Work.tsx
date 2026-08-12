import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { getProjects } from "@/lib/content";

export default function Work() {
  const projects = getProjects();

  return (
    <section id="work" className="layer scrim px-8 py-32 sm:px-14 sm:py-44">
      <Reveal>
        <p className="label mb-3">01 — Selected Work</p>
        <h2
          className="mb-24 max-w-[18ch] font-semibold tracking-tight"
          style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          Five systems, each traceable to a repo.
        </h2>
      </Reveal>

      <div className="flex flex-col">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <article
              className="grid gap-x-12 gap-y-8 py-16 lg:grid-cols-[1fr_20rem]"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}
            >
              <div>
                <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="label" style={{ color: "var(--text-3)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-semibold tracking-tight"
                    style={{ fontSize: "clamp(1.5rem, 1.1rem + 1.4vw, 2.1rem)", letterSpacing: "-0.03em" }}
                  >
                    <Link href={`/work/${p.slug}`} className="link-underline">
                      {p.name}
                    </Link>
                  </h3>
                  <span className="label ml-auto" style={{ color: "var(--text-3)" }}>
                    {p.role}
                  </span>
                </div>

                <p className="mb-6 max-w-[42ch] text-lg leading-snug" style={{ color: "var(--text)" }}>
                  {p.oneLiner}
                </p>

                <p className="mb-8 max-w-[62ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {p.description}
                </p>

                <p className="label mb-8" style={{ color: "var(--text-3)" }}>
                  {p.stack.join("  ·  ")}
                </p>

                <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                  <Link
                    href={`/work/${p.slug}`}
                    className="group/cta label link-underline inline-flex items-center gap-3 !text-[var(--text)]"
                  >
                    Case Study
                    <span className="cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                  {p.live && (
                    <a
                      href={p.live}
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
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="label link-underline inline-flex items-center gap-2"
                    >
                      Source ↗
                    </a>
                  )}
                  {p.note && (
                    <span className="label" style={{ color: "var(--text-3)" }}>
                      {p.note}
                    </span>
                  )}
                </div>
              </div>

              {p.images && p.images.length > 0 && (
                <Link
                  href={`/work/${p.slug}`}
                  className="block overflow-hidden rounded-sm lg:row-start-1"
                  style={{ border: "1px solid var(--hairline)" }}
                >
                  <div className="relative aspect-[4/3] w-full" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <Image
                      src={p.images[0]}
                      alt={`${p.name} screenshot`}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  </div>
                </Link>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
