import { timingSafeEqual } from "node:crypto";
import { readOldbsState, writeOldbsState } from "@/lib/oldbs-state";

export const dynamic = "force-dynamic";

const KEY_HEADER = "x-oldbs-key";

/** Shared coaches' passcode. Fails closed if not configured. */
function authorised(request: Request): boolean {
  const expected = process.env.OLDBS_PASSCODE ?? "";
  const given = request.headers.get(KEY_HEADER) ?? "";
  if (!expected || !given) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

function denied() {
  return Response.json({ error: "Passcode needed" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!authorised(request)) return denied();
  try {
    const state = await readOldbsState();
    if (!state) return new Response(null, { status: 204 });
    return Response.json(state);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Read failed";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!authorised(request)) return denied();
  try {
    const state = await request.json();
    if (!state || typeof state !== "object" || !Array.isArray((state as { players?: unknown }).players)) {
      return Response.json({ error: "Invalid state" }, { status: 400 });
    }
    await writeOldbsState(state);
    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    const status = message.includes("not configured") ? 503 : 500;
    return Response.json({ error: message }, { status: status });
  }
}
