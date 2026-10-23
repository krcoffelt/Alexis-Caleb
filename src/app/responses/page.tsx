import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Monogram } from "@/components/Monogram";
import { ADMIN_COOKIE, adminConfigured, isAdmin, passcodeMatches, sessionToken } from "@/lib/admin-auth";
import { listRsvps, storeMode } from "@/lib/rsvp-store";

export const metadata: Metadata = { title: "RSVP responses", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function signIn(formData: FormData) {
  "use server";
  const code = String(formData.get("passcode") ?? "");
  if (!passcodeMatches(code)) redirect("/responses?error=1");
  (await cookies()).set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/responses",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/responses");
}

async function signOut() {
  "use server";
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/responses" });
  redirect("/responses");
}

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Cancun",
  timeZoneName: "short",
});

export default async function Responses({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!adminConfigured()) {
    return (
      <Shell>
        <p className="text-center text-[15px] font-medium text-ink-soft">
          Set <code className="rounded bg-pill px-1.5 py-0.5">RSVP_ADMIN_PASSCODE</code> to enable this page.
        </p>
      </Shell>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Shell>
        <form action={signIn} className="mx-auto flex max-w-[320px] flex-col gap-4">
          <label htmlFor="passcode" className="text-[13px] font-medium text-ink-soft">
            Passcode
          </label>
          <input
            id="passcode"
            name="passcode"
            type="password"
            autoComplete="current-password"
            required
            className="h-12 border-0 border-b border-black/15 bg-transparent px-2 text-[17px] focus:border-ink focus:outline-none"
          />
          {error && (
            <p role="alert" className="text-[13px] font-medium text-clay">
              That passcode didn’t match.
            </p>
          )}
          <button className="h-11 rounded-[10px] btn-gold text-[15px] font-semibold">
            View responses
          </button>
        </form>
      </Shell>
    );
  }

  const rows = await listRsvps();
  const yes = rows.filter((r) => r.attending).length;
  const no = rows.length - yes;

  return (
    <Shell wide>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ["Responses", rows.length],
          ["Attending", yes],
          ["Declined", no],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[12px] bg-card px-2 py-4 ring-1 ring-black/5">
            <p className="font-accent text-[34px] leading-none text-ink">{v}</p>
            <p className="mt-1 text-[11px] font-medium tracking-[0.12em] text-ink-mute uppercase">{k}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <a href="/responses/export" className="flex h-11 items-center text-[14px] font-medium text-ink underline decoration-gold underline-offset-4">
          Download CSV
        </a>
        <form action={signOut}>
          <button className="flex h-11 items-center text-[14px] font-medium text-ink-mute hover:text-ink">Sign out</button>
        </form>
      </div>
      {storeMode() === "local-dev-file" && (
        <p className="mt-2 rounded-[10px] bg-sand/60 px-3 py-2 text-[13px] text-ink-soft">
          Development mode: responses are stored in a local file, not Supabase.
        </p>
      )}
      <ul className="mt-4 divide-y divide-black/5 rounded-[12px] bg-card ring-1 ring-black/5">
        {rows.length === 0 && <li className="px-4 py-6 text-center text-[15px] text-ink-mute">No responses yet.</li>}
        {rows.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-[16px] font-medium text-ink">{r.guest_name}</p>
              <p className="text-[12px] text-ink-mute">{fmt.format(new Date(r.submitted_at))}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold ${r.attending ? "bg-sea/15 text-sea-deep" : "bg-clay/10 text-clay"}`}
            >
              {r.attending ? "Yes" : "No"}
            </span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <main id="main" className="min-h-svh bg-paper px-4 py-12">
      <div className={`mx-auto ${wide ? "max-w-[560px]" : "max-w-[400px]"}`}>
        <header className="mb-10 text-center">
          <Monogram size="1.9rem" decorative />
          <h1 className="mt-4 font-display text-[26px] text-ink">RSVP responses</h1>
        </header>
        {children}
      </div>
    </main>
  );
}
