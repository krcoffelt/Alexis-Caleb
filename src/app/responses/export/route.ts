import { isAdmin } from "@/lib/admin-auth";
import { listRsvps } from "@/lib/rsvp-store";

export const dynamic = "force-dynamic";

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export async function GET() {
  if (!(await isAdmin())) return new Response("Not found", { status: 404 });
  const rows = await listRsvps();
  const csv = [
    "name,attending,submitted_at,status",
    ...rows.map((r) =>
      [cell(r.guest_name), r.attending ? "yes" : "no", r.submitted_at, r.admin_status ?? ""].join(","),
    ),
  ].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="rsvps.csv"',
      "Cache-Control": "no-store",
    },
  });
}
