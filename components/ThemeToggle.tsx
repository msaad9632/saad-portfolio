"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    // Reads the theme the pre-hydration script already applied to <html> — not derivable from props/state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme((document.documentElement.dataset.theme as "dark" | "light") || "dark");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="label inline-flex h-8 w-8 items-center justify-center rounded-full !text-[var(--text-2)] transition-colors hover:!text-[var(--text)]"
      style={{ border: "1px solid var(--hairline)" }}
    >
      {theme === "light" ? "☀" : "☾"}
    </button>
  );
}
