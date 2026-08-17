export const PREVIEW_COOKIE = "be_preview";

const SESSION_PREFIX = "bespoke-preview-v1";

export function previewUsername() {
  return process.env.PREVIEW_USERNAME ?? "graham";
}

export function previewPassword() {
  return process.env.PREVIEW_PASSWORD ?? "preview";
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

export async function previewSessionToken() {
  const material = `${SESSION_PREFIX}:${previewUsername()}:${previewPassword()}`;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(material),
  );
  return toHex(digest);
}

export async function isValidPreviewSession(token: string | undefined) {
  if (!token) {
    return false;
  }

  return timingSafeEqual(token, await previewSessionToken());
}

export function previewCredentialsMatch(username: string, password: string) {
  return (
    timingSafeEqual(username, previewUsername()) &&
    timingSafeEqual(password, previewPassword())
  );
}
