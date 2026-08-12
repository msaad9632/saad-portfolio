import { cookies } from "next/headers";
import { getIronSession, type IronSession } from "iron-session";

export type SessionData = {
  login?: string;
  accessToken?: string;
};

const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "admin_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 8,
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function requireAdmin(): Promise<string> {
  const session = await getSession();
  if (!session.login || session.login !== process.env.ADMIN_GITHUB_LOGIN || !session.accessToken) {
    throw new Error("unauthorized");
  }
  return session.accessToken;
}
