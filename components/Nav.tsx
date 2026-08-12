import CommandPalette from "./CommandPalette";
import { getProjects } from "@/lib/content";

export default function Nav() {
  const projects = getProjects().map((p) => ({ name: p.name, slug: p.slug }));

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 px-8 py-5 backdrop-blur-sm sm:px-14 sm:py-7"
      style={{ background: "rgba(var(--bg-rgb), 0.55)" }}
    >
      <nav className="flex items-center justify-between">
        <a href="#top" className="label !text-[var(--text)] !tracking-[0.22em]">
          Saad
        </a>
        <ul className="flex items-center gap-8 sm:gap-14">
          {[
            ["Work", "#work"],
            ["Skills", "#skills"],
            ["About", "#about"],
            ["Experience", "#experience"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <li key={href} className="hidden sm:block">
              <a href={href} className="label link-underline hover:!text-[var(--text)]">
                {label}
              </a>
            </li>
          ))}
          <li>
            <CommandPalette projects={projects} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
