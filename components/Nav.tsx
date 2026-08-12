export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-8 py-7 sm:px-14 sm:py-9">
      <nav className="flex items-center justify-between">
        <a href="#top" className="label !text-[var(--text)] !tracking-[0.22em]">
          Saad
        </a>
        <ul className="flex items-center gap-8 sm:gap-14">
          {[
            ["Work", "#work"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} className="label link-underline hover:!text-[var(--text)]">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
