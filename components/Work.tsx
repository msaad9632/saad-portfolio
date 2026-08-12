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
          Four systems, each traceable to a repo.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((p, i) => {
          const big = p.size === "lg";
          return (
            <Reveal key={p.slug} className={big ? "sm:col-span-2" : ""}>
              <article
                className="h-full overflow-hidden rounded-sm"
                style={{ border: "1px solid var(--hairline)", background: "rgba(255,255,255,0.015)" }}
              >
                <div className={big ? "grid lg:grid-cols-[1.1fr_1fr]" : ""}>
                  {p.images && p.images.length > 0 && (
                    <Link
                      href={`/work/${p.slug}`}
                      className={`relative block w-full ${big ? "aspect-[16/10] lg:aspect-auto" : "aspect-[4/3]"}`}
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <Image
                        src={p.images[0]}
                        alt={`${p.name} screenshot`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </Link>
                  )}

                  <div className={big ? "flex flex-col justify-center p-8 sm:p-10" : "p-6 sm:p-8"}>
                    <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                      <span className="label" style={{ color: "var(--text-3)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className="font-semibold tracking-tight"
                        style={{
                          fontSize: big ? "clamp(1.5rem, 1.1rem + 1.4vw, 2.1rem)" : "clamp(1.2rem, 1rem + 0.8vw, 1.5rem)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        <Link href={`/work/${p.slug}`} className="link-underline">
                          {p.name}
                        </Link>
                      </h3>
                      <span className="label ml-auto" style={{ color: "var(--text-3)" }}>
                        {p.role}
                      </span>
                    </div>

                    <p className="mb-4 max-w-[42ch] leading-snug" style={{ color: "var(--text)", fontSize: big ? "1.125rem" : "1rem" }}>
                      {p.oneLiner}
                    </p>

                    {big && (
                      <p className="mb-6 max-w-[56ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
                        {p.description}
                      </p>
                    )}

                    <p className="label mb-6" style={{ color: "var(--text-3)" }}>
                      {p.stack.join("  ·  ")}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3">
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
                    </div>
                    {p.note && (
                      <span className="label mt-3" style={{ color: "var(--text-3)" }}>
                        {p.note}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
