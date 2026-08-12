import Reveal from "./Reveal";
import { getSite } from "@/lib/content";

export default function About() {
  const { about } = getSite();

  return (
    <section id="about" className="layer scrim px-8 py-32 sm:px-14 sm:py-44">
      <Reveal>
        <div className="grid gap-12 sm:grid-cols-[1fr_14rem] sm:items-start">
          <div>
            <p className="label mb-3">{about.eyebrow}</p>
            <h2
              className="mb-14 max-w-[20ch] font-semibold tracking-tight"
              style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              {about.heading}
            </h2>

            <div className="max-w-[58ch] space-y-6 text-[1.0125rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
              {about.paragraphs.map((p, i) => (
                <p key={i} style={i === about.paragraphs.length - 1 ? { color: "var(--text)" } : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Placeholder — swap for the real photo via admin once provided. */}
          <div
            className="order-first flex aspect-[4/5] w-full max-w-[10rem] items-center justify-center rounded-sm sm:order-none sm:max-w-none"
            style={{ border: "1px solid var(--hairline)", background: "rgba(255,255,255,0.02)" }}
          >
            <span className="label text-center" style={{ color: "var(--text-3)" }}>
              Photo
              <br />
              pending
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
