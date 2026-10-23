# Alexis & Caleb — wedding website

Next.js 15 + Tailwind 4 + TypeScript, Supabase for RSVPs. Layout follows the
bride-selected Weddingly (Olivia & Daniel) rhythm, recolored to one warm
palette (sand + clay + gold linework) with sea-glass from the hero water.

## Run

```bash
npm install
npm run dev
```

All wedding facts live in `src/content/site.ts`. Items marked `CONFIRM` there
still need the couple's sign-off.

## Routes

- `/` — hero (ocean video + CA), save-the-date envelope, story, schedule, venue,
  guest info, photos, registry, RSVP invite, Q&A
- `/our-story` — full story Q&A
- `/rsvp` — one-step Full Name + Yes/No
- `/responses` — private, passcode-protected, phone-friendly response list + CSV

## RSVP storage (Supabase)

1. Create a Supabase project and run `supabase/migrations/20261023000000_rsvps.sql`.
   RLS is on with no policies, so the public key can't read or write.
2. Copy `.env.example` to `.env.local` and set `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY` (server only) and `RSVP_ADMIN_PASSCODE`.

Without Supabase, `npm run dev` stores test responses in `.data/rsvps.json`;
production refuses submissions (503) rather than pretending they were saved.
`.env.local` currently holds a generated local-only passcode for testing.

## Media

- Hero video: `public/media/ocean-loop.mp4` — Pexels video 31083303 by Stefanie
  Jockschat (Pexels License). It's 19 MB at 1080p; re-encode with ffmpeg
  (`-crf 28 -an -movflags +faststart`) for a ~3–5 MB file before launch.
- Shoreline band: `public/media/shoreline.mp4` — Pexels video 6901752 by ArtHouse
  Studio (Pexels License); loads only when scrolled near.
- RSVP backdrop: `public/photos/tulum-palms.jpg` — Pexels photo 31688472, Tulum
  (Pexels License). Listed in `src/content/stock-photos.json`.
- Hotel photos (venue background, "Where to stay" polaroid): Hotel Xcaret México's
  official images, linked from its booking CDN (images.trvl-media.com) with the
  client's OK; see `src/content/stock-photos.json` and `remotePatterns` in next.config.
- Photos: `npm run photos` regenerates stripped (no EXIF/GPS) derivatives in
  `public/photos` from the archive in `../photos`.
- Envelope: `public/media/envelope-cream.png` — "Open white envelope" by
  Darkmoon_Art, Pixabay image 5431869 (Pixabay License), warmed to cream.
- CA mark: `src/components/ca-path.ts` is a vector trace of the CA monogram on the
  couple's Joy site (approved by the client); swap in original artwork if supplied.
- Icons: Phosphor (`@phosphor-icons/react`, MIT).

## Privacy

Site sends `noindex` (meta + `X-Robots-Tag`) and `robots.txt` disallows all.
That is not access control.
