import Image from "next/image";
import { CoatHangerIcon, SneakerMoveIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { Flourish } from "./Ornament";

// Inspiration photos from Pexels (Pexels License), loaded from its CDN.
const px = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

type Look = {
  when: string;
  title: string;
  body: string;
  swatches: { name: string; hex: string }[];
  photos: [{ id: string; alt: string }, { id: string; alt: string }, { id: string; alt: string }];
};

const looks: Look[] = [
  {
    when: "Welcome party · Sunday, May 9",
    title: "All White",
    body: "Head-to-toe white or ivory. Breezy linen, crisp cotton and flowing dresses are perfect for an evening by the sea.",
    swatches: [
      { name: "White", hex: "#ffffff" },
      { name: "Ivory", hex: "#f6efe2" },
      { name: "Cream", hex: "#ece0cb" },
    ],
    photos: [
      { id: "34396086", alt: "Woman in a flowing white dress on a beach" },
      { id: "13250375", alt: "Man in an all-white linen outfit among tropical plants" },
      { id: "28668699", alt: "Woman in a white summer dress walking by the sea" },
    ],
  },
  {
    when: "Ladies · Ceremony & reception",
    title: "Funky Formal",
    body: "Formal, with personality. Think bold color, playful prints, a little sparkle and a statement piece you love.",
    swatches: [
      { name: "Fuchsia", hex: "#d63a7e" },
      { name: "Emerald", hex: "#1f8a6e" },
      { name: "Marigold", hex: "#e9a32b" },
      { name: "Cobalt", hex: "#2d5bb5" },
    ],
    photos: [
      { id: "31153433", alt: "Woman in a fitted hot-pink formal gown" },
      { id: "9392095", alt: "Woman in a teal dress at a colorful tropical table" },
      { id: "4736947", alt: "Close-up of a rainbow sequin dress" },
    ],
  },
  {
    when: "Gents · Ceremony & reception",
    title: "Beach Formal",
    body: "Light suits in linen or cotton, a crisp or fun shirt, and loafers or dress sandals that can handle the sand.",
    swatches: [
      { name: "Sand", hex: "#d9c4a3" },
      { name: "Linen", hex: "#efe6d6" },
      { name: "Sage", hex: "#9aa98a" },
      { name: "Navy", hex: "#283a5c" },
    ],
    photos: [
      { id: "5145182", alt: "Man in a relaxed linen shirt and trousers by the sea" },
      { id: "18031036", alt: "Man in a cream linen suit with a floral shirt" },
      { id: "31219656", alt: "Man in a beige suit and sunglasses outdoors" },
    ],
  },
];

function LookCard({ look, index }: { look: Look; index: number }) {
  const [main, a, b] = look.photos;
  return (
    <article data-reveal className="flex flex-col" style={{ ["--reveal-delay" as string]: `${index * 120}ms` }}>
      {/* arch-topped lead image with a gold inner rule */}
      <div className="paper-layer relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[14px] bg-sand shadow-[0_22px_40px_-24px_rgba(60,40,25,0.55)]">
        <Image src={px(main.id)} alt={main.alt} fill sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5 rounded-t-[999px] rounded-b-[9px] border border-white/60"
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {[a, b].map((p) => (
          <div key={p.id} className="paper-layer relative aspect-square overflow-hidden rounded-[12px] bg-sand">
            <Image src={px(p.id)} alt={p.alt} fill sizes="(min-width: 1024px) 165px, (min-width: 640px) 22vw, 45vw" className="object-cover" />
          </div>
        ))}
      </div>

      <p className="eyebrow mt-6 !text-[11px]">{look.when}</p>
      <h3 className="mt-2 font-display text-[30px] leading-tight tracking-[-0.01em] text-ink">{look.title}</h3>
      <p className="mt-2 max-w-[36ch] text-[15px] leading-[1.6] font-medium text-ink-soft">{look.body}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${look.title} color ideas`}>
        {look.swatches.map((s) => (
          <li key={s.name} className="flex items-center gap-1.5 rounded-full bg-card py-1 pr-3 pl-1 text-[12px] font-medium text-ink-soft ring-1 ring-black/5">
            <span aria-hidden="true" className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: s.hex }} />
            {s.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function DressCode() {
  return (
    <section id="dress-code" aria-labelledby="dress-title" className="relative overflow-hidden bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1120px] px-4">
        <header data-reveal className="text-center">
          <p className="eyebrow">Dress code</p>
          <h2 id="dress-title" className="title-xl mt-4">
            What to wear
          </h2>
          <Flourish className="mt-5" />
          <p className="mx-auto mt-5 max-w-[48ch] text-[16px] leading-[1.6] font-medium text-ink-soft">
            A little inspiration for each look. Have fun with it, and dress for warm, tropical evenings.
          </p>
        </header>

        <div className="mt-14 grid gap-14 sm:mt-20 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
          {looks.map((look, i) => (
            <LookCard key={look.title} look={look} index={i} />
          ))}
        </div>

        <ul data-reveal className="mx-auto mt-16 grid max-w-[880px] gap-4 sm:mt-20 sm:grid-cols-3">
          {[
            { Icon: SneakerMoveIcon, text: "Ladies, please leave the stilettos at home. Block heels or sandals are best for the uneven ground." },
            { Icon: SunIcon, text: "The ceremony and reception are outdoors, weather permitting. Expect warm, humid evenings." },
            { Icon: CoatHangerIcon, text: "Daytime is 80 to 90°F and evenings 70 to 75°F, so light, breathable fabrics are your friend." },
          ].map(({ Icon, text }) => (
            <li key={text} className="flex gap-3 rounded-[14px] bg-card p-5 ring-1 ring-black/5">
              <Icon size={22} weight="light" className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
              <p className="text-[14px] leading-[1.55] font-medium text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-[11px] text-ink-mute">Inspiration photos via Pexels</p>
      </div>
    </section>
  );
}
