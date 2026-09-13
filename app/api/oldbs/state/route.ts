import { readOldbsState, writeOldbsState } from "@/lib/oldbs-state";

export const dynamic = "force-dynamic";

export async function GET() {
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
