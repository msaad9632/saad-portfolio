import Reveal from "./Reveal";
import { getProjects } from "@/lib/content";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

type Day = { date: string; count: number; level: number };

const LEVEL_COLOR = [
  "rgba(255,255,255,0.05)",
  "rgba(139,149,217,0.28)",
  "rgba(139,149,217,0.5)",
  "rgba(139,149,217,0.74)",
  "#8b95d9",
];

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

async function fetchContributions(): Promise<{ total: number; days: Day[] } | null> {
  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/msaad9632?y=last", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { total: { lastYear: number }; contributions: Day[] };
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

function toWeeks(days: Day[]): (Day | null)[][] {
  const firstDow = new Date(`${days[0].date}T00:00:00`).getUTCDay();
  const padded: (Day | null)[] = [...Array(firstDow).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

export default async function GitHubActivity() {
  const [repos, contributions] = await Promise.all([fetchRepos(), fetchContributions()]);
  const projects = getProjects();

  return (
    <section id="github" className="layer scrim px-8 py-32 sm:px-14 sm:py-44">
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-3">GitHub Activity</p>
            <h2
              className="max-w-[18ch] font-semibold tracking-tight"
              style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              What&apos;s pushed recently.
            </h2>
          </div>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=msaad9632&type=follow&count=true"
            width={220}
            height={20}
            title="Follow msaad9632 on GitHub"
            style={{ border: "none", colorScheme: "light" }}
          />
        </div>

        {contributions && contributions.days.length > 0 && (
          <div
            className="mb-16 max-w-[52rem] overflow-x-auto rounded-sm p-5"
            style={{ border: "1px solid var(--hairline)", background: "rgba(255,255,255,0.015)" }}
          >
            <p className="label mb-4" style={{ color: "var(--text-2)" }}>
              {contributions.total} contributions in the last year
            </p>
            <div className="flex gap-1">
              {toWeeks(contributions.days).map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={day ? `${day.count} contributions on ${day.date}` : undefined}
                      className="h-[10px] w-[10px] rounded-[2px]"
                      style={{ background: day ? LEVEL_COLOR[day.level] : "transparent" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

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
            {repos.map((r, i) => {
              const matchedProject = projects.find((p) => p.repo === r.html_url);
              const description = r.description || matchedProject?.oneLiner;
              return (
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
                    {description && (
                      <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--text-2)" }}>
                        {description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 pt-1 sm:justify-end">
                    <span className="label" style={{ color: "var(--text-3)" }}>
                      {new Date(r.pushed_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Reveal>
    </section>
  );
}
