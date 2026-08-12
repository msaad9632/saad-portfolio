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
