import { NextResponse } from "next/server";
import { insertRsvp, StoreNotConfigured } from "@/lib/rsvp-store";

// Best-effort per-instance throttle against accidental floods.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 8;

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { name, attending, company, startedAt } = (body ?? {}) as Record<string, unknown>;

  // Honeypot field and implausibly fast submissions are dropped quietly.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  if (typeof startedAt === "number" && Date.now() - startedAt < 1500) {
    return NextResponse.json({ error: "Please take a moment and try again." }, { status: 400 });
  }

  const guestName = typeof name === "string" ? name.replace(/\s+/g, " ").trim() : "";
  if (guestName.length < 2 || guestName.length > 120) {
    return NextResponse.json({ error: "Please enter your full name.", field: "name" }, { status: 422 });
  }
  if (attending !== "yes" && attending !== "no") {
    return NextResponse.json({ error: "Please let us know if you can attend.", field: "attending" }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (throttled(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  try {
    await insertRsvp(guestName, attending === "yes");
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof StoreNotConfigured) {
      return NextResponse.json({ error: "RSVPs aren’t open yet. Please check back soon." }, { status: 503 });
    }
    console.error("RSVP insert failed", err);
    return NextResponse.json({ error: "We couldn’t save your RSVP. Please try again." }, { status: 500 });
  }
}
