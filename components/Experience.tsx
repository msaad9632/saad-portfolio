import Reveal from "./Reveal";
import { getExperience } from "@/lib/content";

export default function Experience() {
  const entries = getExperience();

  return (
    <section id="experience" className="layer scrim px-8 py-32 sm:px-14 sm:py-44">
      <Reveal>
        <p className="label mb-3">03 — Experience</p>
        <h2
          className="mb-20 max-w-[18ch] font-semibold tracking-tight"
          style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          Where the work happened.
        </h2>
      </Reveal>

      <div className="max-w-[52rem]">
        {entries.map((e, i) => (
          <Reveal key={e.what} delay={i * 60}>
            <div
              className="grid gap-x-12 gap-y-3 py-10 sm:grid-cols-[13rem_1fr]"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}
            >
              <div className="label pt-1" style={{ color: "var(--text-3)" }}>
                {e.when}
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-tight">
                  {e.what} <span style={{ color: "var(--text-2)" }}>· {e.where}</span>
                </h3>
                <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {e.note}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
