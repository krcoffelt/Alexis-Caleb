import "server-only";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Rsvp = {
  id: string;
  guest_name: string;
  attending: boolean;
  submitted_at: string;
  admin_status: string | null;
};

export class StoreNotConfigured extends Error {}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

// Local development only: a JSON file so the form can be exercised without
// credentials. Never used in production builds.
const devFile = path.join(process.cwd(), ".data", "rsvps.json");
const devAllowed = process.env.NODE_ENV !== "production";

async function readDev(): Promise<Rsvp[]> {
  try {
    return JSON.parse(await readFile(devFile, "utf8"));
  } catch {
    return [];
  }
}

export function storeMode() {
  return supabase ? "supabase" : devAllowed ? "local-dev-file" : "unconfigured";
}

export async function insertRsvp(guestName: string, attending: boolean): Promise<Rsvp> {
  if (supabase) {
    const { data, error } = await supabase
      .from("rsvps")
      .insert({ guest_name: guestName, attending })
      .select()
      .single();
    if (error) throw error;
    return data as Rsvp;
  }
  if (!devAllowed) throw new StoreNotConfigured("RSVP storage is not configured");
  const all = await readDev();
  const row: Rsvp = {
    id: randomUUID(),
    guest_name: guestName,
    attending,
    submitted_at: new Date().toISOString(),
    admin_status: "new",
  };
  all.push(row);
  await mkdir(path.dirname(devFile), { recursive: true });
  await writeFile(devFile, JSON.stringify(all, null, 2));
  return row;
}

export async function listRsvps(): Promise<Rsvp[]> {
  if (supabase) {
    const { data, error } = await supabase.from("rsvps").select("*").order("submitted_at", { ascending: false });
    if (error) throw error;
    return data as Rsvp[];
  }
  if (!devAllowed) throw new StoreNotConfigured("RSVP storage is not configured");
  return (await readDev()).sort((a, b) => b.submitted_at.localeCompare(a.submitted_at));
}
