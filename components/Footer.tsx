import { getSite } from "@/lib/content";

export default function Footer() {
  const { contact } = getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="layer px-8 py-14 sm:px-14" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mb-10 flex flex-wrap items-start justify-between gap-10">
        <div className="max-w-[24rem]">
          <a href="#top" className="label !text-[var(--text)] !tracking-[0.22em]">
            Saad
          </a>
          <p className="mt-3 text-[0.9rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
            Software engineer building AI/ML tools and backend systems that show their own work.
          </p>
        </div>

        <div className="flex flex-wrap gap-16">
          <div>
            <p className="label mb-4" style={{ color: "var(--text-3)" }}>
              Navigate
            </p>
            <ul className="space-y-2.5">
              {[
                ["Work", "#work"],
                ["Skills", "#skills"],
                ["About", "#about"],
                ["Experience", "#experience"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="link-underline text-[0.9rem]" style={{ color: "var(--text-2)" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-4" style={{ color: "var(--text-3)" }}>
              Elsewhere
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href={contact.github} target="_blank" rel="noreferrer" className="link-underline text-[0.9rem]" style={{ color: "var(--text-2)" }}>
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="link-underline text-[0.9rem]" style={{ color: "var(--text-2)" }}>
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="link-underline text-[0.9rem]" style={{ color: "var(--text-2)" }}>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-4 pt-8"
        style={{ borderTop: "1px solid var(--hairline)" }}
      >
        <p className="label" style={{ color: "var(--text-3)" }}>
          © {year} Muhammad Saad · Built with Next.js, Three.js &amp; Tailwind
        </p>
        <a href="#top" className="label link-underline inline-flex items-center gap-2" style={{ color: "var(--text-2)" }}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
