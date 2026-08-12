import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const state = randomBytes(16).toString("hex");
  (await cookies()).set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
  });

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
  url.searchParams.set("redirect_uri", `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`);
  url.searchParams.set("scope", "repo");
  url.searchParams.set("state", state);

  redirect(url.toString());
}
