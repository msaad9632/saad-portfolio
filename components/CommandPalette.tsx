"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Item = { label: string; href: string; hint?: string };

export default function CommandPalette({ projects }: { projects: { name: string; slug: string }[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const items: Item[] = useMemo(
    () => [
      { label: "Work", href: "/#work", hint: "section" },
      { label: "Skills", href: "/#skills", hint: "section" },
      { label: "About", href: "/#about", hint: "section" },
      { label: "Experience", href: "/#experience", hint: "section" },
      { label: "GitHub Activity", href: "/#github", hint: "section" },
      { label: "Contact", href: "/#contact", hint: "section" },
      ...projects.map((p) => ({ label: p.name, href: `/work/${p.slug}`, hint: "project" })),
    ],
    [projects],
  );

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  function close() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function go(href: string) {
    close();
    if (href.startsWith("/#") && window.location.pathname === "/") {
      window.location.hash = href.slice(2);
    } else {
      router.push(href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="label inline-flex h-10 w-10 items-center justify-center rounded-full !text-[var(--text-2)] transition-colors hover:!text-[var(--text)]"
        style={{ border: "1px solid var(--hairline)" }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1" y="1" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3.5 4.5L6.5 8L3.5 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 11.5H12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={close}
        >
          <div
            className="w-full max-w-[36rem] overflow-hidden rounded-sm"
            style={{ border: "1px solid var(--hairline)", background: "#0a0b0d" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="label flex items-center gap-2 px-4 py-3 font-mono"
              style={{ borderBottom: "1px solid var(--hairline)", color: "#4ade80" }}
            >
              C:\Users\saad&gt;
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search sections, projects..."
                className="flex-1 rounded-sm bg-transparent px-1 font-mono text-sm normal-case tracking-normal focus:outline-none focus-visible:ring-2"
                style={{ color: "#4ade80", boxShadow: "none" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) go(filtered[0].href);
                }}
              />
              <span className="label" style={{ color: "var(--text-3)" }}>
                esc
              </span>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="label px-3 py-4" style={{ color: "var(--text-3)" }}>
                  No results.
                </p>
              )}
              {filtered.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="label flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left normal-case tracking-normal hover:!text-[var(--text)]"
                  style={{ color: "var(--text-2)" }}
                >
                  {item.label}
                  <span className="label" style={{ color: "var(--text-3)" }}>
                    {item.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
