import { getSite } from "@/lib/content";

export default function Hero() {
  const { hero } = getSite();

  return (
    <section id="top" className="relative h-[100svh] w-full">
      <div className="layer flex h-full flex-col justify-center px-8 pt-24 sm:px-14">
        <div className="max-w-[34rem]">
          {hero.available && (
            <div
              className="label mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ border: "1px solid var(--hairline)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
                aria-hidden="true"
              />
              Available for new projects
            </div>
          )}
          <p className="label mb-8">{hero.eyebrow}</p>

          <h1 className="mb-9" style={{ color: "var(--text)" }}>
            {hero.headlineLines.map((line, i) => (
              <span
                key={i}
                className="hero-line"
                style={i === hero.accentLineIndex ? { color: "var(--accent)" } : undefined}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="max-w-[24rem] text-[0.975rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
            {hero.subCopy}
          </p>

          <a
            href={hero.ctaHref}
            className="group/cta label link-underline mt-12 inline-flex items-center gap-3 !text-[var(--text)]"
          >
            {hero.ctaLabel}
            <span className="cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>

      <div className="layer absolute bottom-16 left-8 flex flex-col items-center gap-3 sm:left-14">
        <p className="label" style={{ color: "var(--text-3)" }}>
          Scroll
        </p>
        <div
          className="flex h-8 w-5 justify-center rounded-full pt-1.5"
          style={{ border: "1px solid var(--hairline)" }}
          aria-hidden="true"
        >
          <span className="scroll-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--text-2)" }} />
        </div>
      </div>
    </section>
  );
}
