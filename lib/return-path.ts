/**
 * Only allow same-origin relative paths back after login.
 * Blocks open redirects (`//evil.com`, `https://…`).
 */
export function safeReturnPath(value: string | null | undefined, fallback = "/studio") {
  if (!value) return fallback;
  const path = value.trim();
  if (!path.startsWith("/")) return fallback;
  if (path.startsWith("//")) return fallback;
  if (path.includes("://")) return fallback;
  if (path === "/login") return fallback;
  return path;
}
