-- Minimal MVP RSVP store: name + attendance only.
-- RLS is enabled with NO policies, so the anon/public key can neither read
-- nor write. All access goes through the server using the service-role key.
create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id            uuid primary key default gen_random_uuid(),
  guest_name    text not null check (char_length(guest_name) between 2 and 120),
  attending     boolean not null,
  submitted_at  timestamptz not null default now(),
  admin_status  text check (admin_status in ('new', 'confirmed', 'follow_up', 'duplicate')) default 'new'
);

create index if not exists rsvps_submitted_at_idx on public.rsvps (submitted_at desc);

alter table public.rsvps enable row level security;
revoke all on public.rsvps from anon, authenticated;
