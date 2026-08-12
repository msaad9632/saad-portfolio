import Reveal from "./Reveal";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

async function fetchRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch("https://api.github.com/users/msaad9632/repos?sort=pushed&per_page=10", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Repo[];
    return data.filter((r) => !r.fork);
  } catch {
    return null;
  }
}

export default async function GitHubActivity() {
  const repos = await fetchRepos();

  return (
    <section id="github" className="layer scrim px-8 py-32 sm:px-14 sm:py-44">
      <Reveal>
        <p className="label mb-3">GitHub Activity</p>
        <h2
          className="mb-12 max-w-[18ch] font-semibold tracking-tight"
          style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          What&apos;s pushed recently.
        </h2>

        <div className="mb-16 max-w-[52rem] overflow-x-auto rounded-sm" style={{ border: "1px solid var(--hairline)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ghchart.rshah.org/8b95d9/msaad9632"
            alt="msaad9632 GitHub contribution graph"
            width={722}
            height={112}
            className="block w-full min-w-[600px]"
            loading="lazy"
          />
        </div>

        {!repos || repos.length === 0 ? (
          <p className="max-w-[42ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
            GitHub activity is unavailable right now — see{" "}
            <a href="https://github.com/msaad9632" target="_blank" rel="noreferrer" className="link-underline">
              github.com/msaad9632
            </a>{" "}
            directly.
          </p>
        ) : (
          <div className="max-w-[52rem]">
            {repos.map((r, i) => (
              <div
                key={r.name}
                className="grid gap-x-12 gap-y-2 py-8 sm:grid-cols-[1fr_auto]"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}
              >
                <div>
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-lg font-medium tracking-tight"
                  >
                    {r.name}
                  </a>
                  {r.description && (
                    <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
                      {r.description}
                    </p>
                  )}
                </div>
                <div className="label flex items-center gap-4 pt-1 sm:justify-end" style={{ color: "var(--text-3)" }}>
                  {r.language && <span>{r.language}</span>}
                  <span>{new Date(r.pushed_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
