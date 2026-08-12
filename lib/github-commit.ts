const REPO = process.env.CONTENT_REPO!;

async function gh(accessToken: string, path: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      ...init?.headers,
    },
  });
  return res;
}

/** Commits JSON content to a path in the repo. Throws "stale" if the file changed since `sha` was read. */
export async function commitJson(accessToken: string, path: string, data: unknown, message: string) {
  const getRes = await gh(accessToken, `contents/${path}`);
  if (!getRes.ok) throw new Error(`could not read current file: ${getRes.status}`);
  const current = (await getRes.json()) as { sha: string };

  const content = Buffer.from(JSON.stringify(data, null, 2) + "\n", "utf-8").toString("base64");
  const putRes = await gh(accessToken, `contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({ message, content, sha: current.sha }),
  });
  if (putRes.status === 409) throw new Error("stale");
  if (!putRes.ok) throw new Error(`commit failed: ${putRes.status} ${await putRes.text()}`);
  return putRes.json();
}

/** Commits a new binary file (e.g. an uploaded image) to a path that does not exist yet. */
export async function commitBinary(accessToken: string, path: string, bytes: Buffer, message: string) {
  const putRes = await gh(accessToken, `contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: bytes.toString("base64") }),
  });
  if (!putRes.ok) throw new Error(`commit failed: ${putRes.status} ${await putRes.text()}`);
  return putRes.json();
}

export type CommitSummary = { sha: string; message: string; date: string };

/** Recent commit history for a single content file, newest first. */
export async function listFileCommits(accessToken: string, path: string, limit = 12): Promise<CommitSummary[]> {
  const res = await gh(accessToken, `commits?path=${encodeURIComponent(path)}&per_page=${limit}`);
  if (!res.ok) throw new Error(`could not list commits: ${res.status}`);
  const data = (await res.json()) as { sha: string; commit: { message: string; author: { date: string } } }[];
  return data.map((c) => ({ sha: c.sha, message: c.commit.message, date: c.commit.author.date }));
}

/** Resets `path` on the default branch to the content it had at `ref`. */
export async function restoreFileToRef(accessToken: string, path: string, ref: string, message: string) {
  const oldRes = await gh(accessToken, `contents/${path}?ref=${ref}`);
  if (!oldRes.ok) throw new Error(`could not read old version: ${oldRes.status}`);
  const old = (await oldRes.json()) as { content: string };

  const currentRes = await gh(accessToken, `contents/${path}`);
  if (!currentRes.ok) throw new Error(`could not read current file: ${currentRes.status}`);
  const current = (await currentRes.json()) as { sha: string };

  const putRes = await gh(accessToken, `contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: old.content.replace(/\n/g, ""), sha: current.sha }),
  });
  if (putRes.status === 409) throw new Error("stale");
  if (!putRes.ok) throw new Error(`restore failed: ${putRes.status} ${await putRes.text()}`);
  return putRes.json();
}
