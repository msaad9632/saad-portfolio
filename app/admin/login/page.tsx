export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage: Record<string, string> = {
    state: "Login expired or was tampered with — try again.",
    token: "GitHub didn't return an access token — try again.",
    not_allowed: "That GitHub account isn't authorized for this admin panel.",
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-8" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-sm text-center">
        <p className="label mb-3" style={{ color: "var(--text-3)" }}>
          Admin
        </p>
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Sign in to manage content</h1>
        {error && errorMessage[error] && (
          <p className="mb-6 text-sm" style={{ color: "#f87171" }}>
            {errorMessage[error]}
          </p>
        )}
        <a
          href="/api/auth/github"
          className="label inline-flex items-center gap-2 rounded-sm px-5 py-3"
          style={{ border: "1px solid var(--hairline)" }}
        >
          Sign in with GitHub
        </a>
      </div>
    </main>
  );
}
