import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { getProjects } from "@/lib/content";

const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

export default function Work() {
  const projects = getProjects();
  const countWord = COUNT_WORDS[projects.length] ?? String(projects.length);

  return (
    <section id="work" className="layer scrim px-8 py-32 sm:px-14 sm:py-44">
      <Reveal>
        <p className="label mb-3">01 — Selected Work</p>
        <h2
          className="mb-24 max-w-[18ch] font-semibold tracking-tight"
          style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          {countWord} systems, each traceable to a repo.
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-[68rem] grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((p, i) => {
          const big = p.size === "lg";
          return (
            <Reveal key={p.slug} className={big ? "sm:col-span-2" : ""}>
              <article
                className="h-full overflow-hidden rounded-sm"
                style={{ border: "1px solid var(--hairline)", background: "rgba(255,255,255,0.015)" }}
              >
                <div className={big ? "grid lg:grid-cols-[1.1fr_1fr]" : ""}>
                  {p.video ? (
                    <video
                      src={p.video}
                      controls
                      playsInline
                      className={`w-full ${big ? "aspect-[16/10] lg:aspect-auto lg:max-h-[480px]" : "aspect-[4/3]"} object-contain`}
                      style={{ background: "#000" }}
                    />
                  ) : (
                    p.images &&
                    p.images.length > 0 && (
                      <Link
                        href={`/work/${p.slug}`}
                        className={`flex w-full items-center justify-center overflow-hidden ${big ? "min-h-[16rem] lg:min-h-0" : "h-72"}`}
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <Image
                          src={p.images[0]}
                          alt={`${p.name} screenshot`}
                          width={1200}
                          height={1200}
                          unoptimized
                          className={big ? "max-h-[28rem] w-auto object-contain lg:max-h-full" : "h-full w-auto object-contain"}
                        />
                      </Link>
                    )
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

                    <div className="mb-5 flex flex-wrap items-center gap-x-7 gap-y-2">
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
                      {p.repo && (
                        <iframe
                          src={`https://ghbtns.com/github-btn.html?user=msaad9632&repo=${p.repo.split("/").pop()}&type=star&count=true`}
                          width={90}
                          height={20}
                          title={`Star ${p.name} on GitHub`}
                          style={{ border: "none", colorScheme: "light" }}
                        />
                      )}
                    </div>

                    <p className="mb-4 max-w-[42ch] leading-snug" style={{ color: "var(--text)", fontSize: big ? "1.125rem" : "1rem" }}>
                      {p.oneLiner}
                    </p>

                    {big && (
                      <p className="mb-6 max-w-[56ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
                        {p.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="label rounded-full px-2.5 py-1"
                          style={{ border: "1px solid var(--hairline)", color: "var(--text-3)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {p.note && (
                      <span className="label mt-4 block" style={{ color: "var(--text-3)" }}>
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
