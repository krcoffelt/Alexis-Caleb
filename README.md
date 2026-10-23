# Alexis & Caleb — wedding website

Next.js 15 + Tailwind 4 + TypeScript, deployed on Netlify with Netlify Forms for RSVPs. Layout follows the
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
- `/rsvp` — one step: Yes/No, number of guests (if Yes), full name, phone/WhatsApp

## RSVPs (Netlify Forms)

The form posts to Netlify Forms. `public/__forms.html` is the static copy Netlify
reads at deploy time to register the `rsvp` form (fields: attending, guests,
name, phone; `company` is a spam honeypot) — keep it in sync with
`src/components/RsvpForm.tsx`.

After the first deploy:

1. Netlify → Site → **Forms** → enable form detection if prompted, then redeploy.
   The `rsvp` form should appear.
2. **Site configuration → Forms → Form notifications → Add notification →
   Email notification**: event "New form submission", form `rsvp`, email
   `krcoffelt@gmail.com`.

Submissions (with CSV export) live under Forms → rsvp. Netlify Forms only works
on the deployed site or `netlify dev`, not plain `npm run dev`.

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
