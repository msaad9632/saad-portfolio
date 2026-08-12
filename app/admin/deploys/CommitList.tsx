"use client";

import { useState } from "react";
import { restoreCommit, type ContentFile } from "./actions";
import type { CommitSummary } from "@/lib/github-commit";

export default function CommitList({ path, commits }: { path: ContentFile; commits: CommitSummary[] }) {
  const [status, setStatus] = useState<Record<string, "idle" | "pending" | "done" | "error">>({});
  const [error, setError] = useState("");

  async function onRestore(sha: string) {
    if (!confirm(`Restore ${path} to this version? This commits immediately and overwrites the current content.`)) return;
    setStatus((s) => ({ ...s, [sha]: "pending" }));
    const result = await restoreCommit(path, sha);
    if (result.ok) {
      setStatus((s) => ({ ...s, [sha]: "done" }));
    } else {
      setStatus((s) => ({ ...s, [sha]: "error" }));
      setError(result.error);
    }
  }

  if (commits.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--text-3)" }}>
        No history yet.
      </p>
    );
  }

  return (
    <div>
      {commits.map((c, i) => (
        <div
          key={c.sha}
          className="flex items-center justify-between gap-4 py-3"
          style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}
        >
          <div className="min-w-0">
            <p className="truncate text-sm" style={{ color: "var(--text)" }}>
              {c.message}
            </p>
            <p className="label" style={{ color: "var(--text-3)" }}>
              {c.sha.slice(0, 7)} · {new Date(c.date).toLocaleString()}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {status[c.sha] === "done" ? (
              <span className="label" style={{ color: "#4ade80" }}>
                Restored
              </span>
            ) : status[c.sha] === "error" ? (
              <span className="label" style={{ color: "#f87171" }}>
                {error}
              </span>
            ) : i === 0 ? (
              <span className="label" style={{ color: "var(--text-3)" }}>
                Current
              </span>
            ) : (
              <button
                type="button"
                disabled={status[c.sha] === "pending"}
                onClick={() => onRestore(c.sha)}
                className="label"
                style={{ color: "var(--accent)" }}
              >
                {status[c.sha] === "pending" ? "Restoring…" : "Restore this version"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
