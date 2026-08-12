import { getSite } from "@/lib/content";

export default function Hero() {
  const { hero } = getSite();

  return (
    <section id="top" className="relative h-[100svh] w-full">
      <div className="layer flex h-full flex-col justify-center px-8 sm:px-14">
        <div className="max-w-[34rem]">
          <p className="label mb-8">{hero.eyebrow}</p>

          <h1 className="mb-9">
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

      <p className="layer label absolute bottom-9 left-8 sm:left-14" style={{ color: "var(--text-3)" }}>
        Scroll
      </p>
    </section>
  );
}
