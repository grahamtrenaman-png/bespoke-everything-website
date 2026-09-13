const FILE = "oldbs-state.json";

function creds() {
  const id = process.env.OLDBS_GIST_ID;
  const token = process.env.OLDBS_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  if (!id || !token) return null;
  return { id, token };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "obrfc-u9",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function readOldbsState() {
  const c = creds();
  if (!c) return null;
  const res = await fetch(`https://api.github.com/gists/${c.id}`, { headers: headers(c.token) });
  if (!res.ok) throw new Error(`Failed to read shared state (${res.status})`);
  const gist = (await res.json()) as { files?: Record<string, { content?: string }> };
  const content = gist.files?.[FILE]?.content;
  if (!content || content === "null") return null;
  const data = JSON.parse(content);
  if (!data || typeof data !== "object" || !Array.isArray(data.players)) return null;
  return data;
}

export async function writeOldbsState(state: unknown) {
  const c = creds();
  if (!c) throw new Error("Shared store is not configured");
  const res = await fetch(`https://api.github.com/gists/${c.id}`, {
    method: "PATCH",
    headers: { ...headers(c.token), "Content-Type": "application/json" },
    body: JSON.stringify({ files: { [FILE]: { content: JSON.stringify(state) } } }),
  });
  if (!res.ok) throw new Error(`Failed to save shared state (${res.status})`);
}
