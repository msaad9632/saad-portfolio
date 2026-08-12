import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("oauth_state")?.value;
  cookieStore.delete("oauth_state");

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(new URL("/admin/login?error=state", req.url));
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const tokenData = (await tokenRes.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    return NextResponse.redirect(new URL("/admin/login?error=token", req.url));
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: "application/vnd.github+json" },
  });
  const user = (await userRes.json()) as { login?: string };

  if (!user.login || user.login !== process.env.ADMIN_GITHUB_LOGIN) {
    return NextResponse.redirect(new URL("/admin/login?error=not_allowed", req.url));
  }

  const session = await getSession();
  session.login = user.login;
  session.accessToken = tokenData.access_token;
  await session.save();

  return NextResponse.redirect(new URL("/admin", req.url));
}
