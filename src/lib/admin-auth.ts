import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rsvp_admin";

function token(passcode: string) {
  return createHmac("sha256", passcode).update("alexis-caleb-rsvp-admin").digest("hex");
}

export function adminConfigured() {
  return !!process.env.RSVP_ADMIN_PASSCODE;
}

export function passcodeMatches(input: string) {
  const pass = process.env.RSVP_ADMIN_PASSCODE;
  if (!pass) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pass);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function sessionToken() {
  return token(process.env.RSVP_ADMIN_PASSCODE!);
}

export async function isAdmin() {
  const pass = process.env.RSVP_ADMIN_PASSCODE;
  if (!pass) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(token(pass));
  return a.length === b.length && timingSafeEqual(a, b);
}
