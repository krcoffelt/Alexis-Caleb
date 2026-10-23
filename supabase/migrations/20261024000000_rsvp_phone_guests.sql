-- RSVP form now collects a phone/WhatsApp number and, for "yes" replies,
-- how many guests are attending (including the person replying).
alter table public.rsvps
  add column if not exists phone text check (phone is null or char_length(phone) between 7 and 30),
  add column if not exists guest_count smallint check (guest_count is null or guest_count between 1 and 4);
