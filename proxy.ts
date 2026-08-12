import { NextRequest, NextResponse } from "next/server";

// UX redirect only — not the security boundary. Every /admin page and every
// server action independently re-checks the session server-side via requireAdmin().
export function proxy(req: NextRequest) {
  const hasSession = req.cookies.has("admin_session");
  if (!hasSession) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)"],
};
