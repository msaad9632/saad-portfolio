import Link from "next/link";
import { getSession } from "@/lib/session";

// Per-page auth: each page under /admin calls requireAdmin() itself and
// redirects if it throws (see lib/session.ts). This layout only decides
// whether to render the nav chrome — it is not the security boundary.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const isAuthed = Boolean(session.login && session.login === process.env.ADMIN_GITHUB_LOGIN && session.accessToken);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      {isAuthed && (
        <header
          className="flex items-center justify-between px-8 py-5"
          style={{ borderBottom: "1px solid var(--hairline)" }}
        >
          <nav className="flex flex-wrap gap-6">
            <Link href="/admin" className="label link-underline">
              Dashboard
            </Link>
            <Link href="/admin/projects" className="label link-underline">
              Projects
            </Link>
            <Link href="/admin/site" className="label link-underline">
              Site copy
            </Link>
            <Link href="/admin/experience" className="label link-underline">
              Experience
            </Link>
            <Link href="/admin/visual" className="label link-underline">
              Hero visual
            </Link>
            <Link href="/admin/media" className="label link-underline">
              Media
            </Link>
            <Link href="/admin/deploys" className="label link-underline">
              Deploys
            </Link>
            <Link href="/" className="label link-underline" style={{ color: "var(--text-3)" }}>
              View site ↗
            </Link>
          </nav>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="label" style={{ color: "var(--text-3)" }}>
              Sign out
            </button>
          </form>
        </header>
      )}
      <div className="px-8 py-10">{children}</div>
    </div>
  );
}
