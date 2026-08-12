import Reveal from "./Reveal";
import { getSite } from "@/lib/content";

export default function Skills() {
  const { skills } = getSite();
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="layer scrim px-8 py-32 sm:px-14 sm:py-44">
      <Reveal>
        <p className="label mb-3">Skills</p>
        <h2
          className="mb-16 max-w-[18ch] font-semibold tracking-tight"
          style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          A toolkit I actually reach for.
        </h2>

        <div className="max-w-[46rem] overflow-hidden rounded-sm" style={{ border: "1px solid var(--hairline)" }}>
          <div
            className="label px-4 py-2"
            style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid var(--hairline)", color: "var(--text-2)" }}
          >
            C:\Users\saad&gt; skills.bat
          </div>
          <div className="p-5 font-mono text-sm leading-loose" style={{ background: "rgba(0,0,0,0.15)" }}>
            {skills.map((group) => (
              <div key={group.category} className="mb-4 last:mb-0">
                <p style={{ color: "#4ade80" }}>
                  C:\Users\saad&gt; dir {group.category}
                </p>
                <p style={{ color: "var(--text-2)" }}>{group.items.join("  ")}</p>
              </div>
            ))}
            <p style={{ color: "#4ade80" }}>
              C:\Users\saad&gt; <span className="scroll-dot" style={{ display: "inline-block" }}>_</span>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
