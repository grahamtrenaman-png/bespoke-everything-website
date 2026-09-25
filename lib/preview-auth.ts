export const PREVIEW_COOKIE = "be_preview";

const SESSION_PREFIX = "bespoke-preview-v1";

type PreviewUser = { username: string; password: string };

/**
 * Users allowed through the preview gate.
 *
 * PREVIEW_USERS: comma-separated "username:password" pairs. If unset, falls back
 * to the single PREVIEW_USERNAME / PREVIEW_PASSWORD pair (defaults graham/preview).
 */
function previewUsers(): PreviewUser[] {
  const list = process.env.PREVIEW_USERS;
  if (list) {
    const users = list
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const idx = entry.indexOf(":");
        if (idx <= 0) return null;
        return { username: entry.slice(0, idx), password: entry.slice(idx + 1) };
      })
      .filter((u): u is PreviewUser => u !== null && u.password.length > 0);
    if (users.length > 0) return users;
  }
  return [
    {
      username: process.env.PREVIEW_USERNAME ?? "graham",
      password: process.env.PREVIEW_PASSWORD ?? "preview",
    },
  ];
}

function timingSafeEqual(left: string, right: string) {
  const encoder = new TextEncoder();
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  const length = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;

  for (let i = 0; i < length; i += 1) {
    mismatch |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }

  return mismatch === 0;
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sessionTokenFor(user: PreviewUser) {
  const material = `${SESSION_PREFIX}:${user.username}:${user.password}`;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(material),
  );
  return toHex(digest);
}

/** Session token for a named user. Returns undefined if the user is not configured. */
export async function previewSessionToken(username: string) {
  const user = previewUsers().find((u) => u.username === username);
  return user ? sessionTokenFor(user) : undefined;
}

export async function isValidPreviewSession(token: string | undefined) {
  if (!token) {
    return false;
  }

  const tokens = await Promise.all(previewUsers().map(sessionTokenFor));
  // Check every token so timing does not reveal which user matched.
  let valid = false;
  for (const candidate of tokens) {
    if (timingSafeEqual(token, candidate)) valid = true;
  }
  return valid;
}

export function previewCredentialsMatch(username: string, password: string) {
  let matched = false;
  for (const user of previewUsers()) {
    const u = timingSafeEqual(username, user.username);
    const p = timingSafeEqual(password, user.password);
    if (u && p) matched = true;
  }
  return matched;
}
