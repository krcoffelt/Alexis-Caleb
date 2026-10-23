// Creates public web derivatives from the archived photo package.
// Originals stay untouched in ../photos. Derivatives are auto-oriented,
// converted to sRGB, resized and written WITHOUT metadata (no EXIF/GPS).
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const archive = path.resolve(root, "../../photos");
const out = path.resolve(root, "../public/photos");
const pictime = (id) => path.join(archive, "galleries/pictime/previews", `${id}.jpg`);
const joy = (file) => path.join(archive, "joy", file);

// slug -> source. Keep this list curated; the archive is not a public gallery.
const selection = {
  "met-close": pictime("12160973498"),
  "first-date": pictime("12160973675"),
  "venice-ring": pictime("12160973551"),
  "fishing": pictime("12160973746"),
  "fishing-wide": pictime("12160973736"),
  "grass-laugh": joy("9b239736-3b8f-43f3-9ad9-03673e4a0902.jpg"),
  "twirl": joy("fd79a7a0-cca3-11f1-9e3e-134055c1bc2b-ReilleyPhotography_A+C-192.jpeg"),
  "field-cuddle": joy("4d47dccc-a96d-42ae-9ba1-0a2dc32e92a5.jpg"),
  "stone-arch": joy("58ea5bd9-b068-4703-8f81-cbc8f81ab834.jpg"),
  "lake-bw": joy("0d9394e6-7580-45ce-a275-47724ce57820.jpg"),
  "carry-bw": joy("5b35ede0-1c0a-49c2-90d2-0aac52bdaf13.jpg"),
  "hotel-aerial": joy("16890d60-ccba-11f1-920e-8706287af68b-riv-hotel-xcaret-mexico-aerial-01.webp"),
  "fountain-dance": pictime("12160973684"),
  "carry-kiss": pictime("12160973611"),
  "white-dress": pictime("12160973533"),
  "arch-embrace": pictime("12160973575"),
  "field-lift": pictime("12160973792"),
  "field-kiss": pictime("12160973808"),
  "field-wide": pictime("12160973823"),
  "field-wide-2": pictime("12160973824"),
  "grass-lying": pictime("12160973781"),
  "barn-kiss": pictime("12160973703"),
  "fence": pictime("12160973590"),
  "kiss-close": pictime("12160973669"),
  "shoulders": pictime("12160973813"),
  "embrace-bw": pictime("12160973851"),
  "field-sit": pictime("12160973759"),
  "barn-hold": pictime("12160973501"),
  "spin": pictime("12160973528"),
  "arch-bw": pictime("12160973570"),
};

await mkdir(out, { recursive: true });
const manifest = {};
for (const [slug, src] of Object.entries(selection)) {
  const file = `${slug}.jpg`;
  const img = sharp(src).rotate().toColorspace("srgb");
  const { width, height } = await img
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(out, file));
  manifest[slug] = { src: `/photos/${file}`, width, height };
  console.log(`${slug.padEnd(16)} ${width}x${height}`);
}
await writeFile(
  path.resolve(root, "../src/content/photos.generated.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
