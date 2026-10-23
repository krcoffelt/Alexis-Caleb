import { Flourish } from "./Ornament";
import { site } from "@/content/site";
import { Photo } from "./Photo";
import type { Icon } from "@phosphor-icons/react";
import { AirplaneTiltIcon, BedIcon, CoatHangerIcon, WalletIcon } from "@phosphor-icons/react/dist/ssr";
import { PalmShadow } from "./PalmShadow";
import { WaxSeal } from "./WaxSeal";

type Pol = { slug: string; alt: string; caption: "date" | "names" };

function Polaroid({ p, className = "", sizes }: { p: Pol; className?: string; sizes: string }) {
  return (
    <figure className={`absolute flex flex-col bg-card p-2.5 pb-0 shadow-[0_16px_34px_-10px_rgba(50,35,20,0.4)] ring-1 ring-black/5 ${className}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Photo slug={p.slug} alt={p.alt} fill sizes={sizes} className="object-cover object-[50%_30%]" />
      </div>
      <figcaption
        aria-hidden="true"
        className={`flex h-[44px] items-center justify-center text-ink-soft ${p.caption === "names" ? "font-script text-[24px]" : "font-accent text-[17px] italic"}`}
      >
        {p.caption === "names" ? site.couple.displayName : "May 11th, 2027"}
      </figcaption>
    </figure>
  );
}

type Row = {
  id?: string;
  eyebrow: string;
  title: string;
  icon: Icon;
  photos: [Pol, Pol];
  body: React.ReactNode;
};

const rows: Row[] = [
  {
    id: "stay",
    eyebrow: "Accommodation",
    title: "Where to stay",
    icon: BedIcon,
    photos: [
      { slug: "hotel-canal", alt: "Guests swimming in a jungle canal at Hotel Xcaret México", caption: "date" },
      { slug: "field-cuddle", alt: "Alexis and Caleb resting together in the grass", caption: "names" },
    ],
    body: (
      <>
        <p>
          There are a few different hotels on the resort grounds — we are staying at <strong className="font-semibold text-ink">{site.venue.name}</strong>!
        </p>
        <p>
          We’ve set up guest accommodations through our booking coordinator, <strong className="font-semibold text-ink">{site.booking.coordinator}</strong>. Please reserve a room through her and she will get you all set up.
        </p>
        <a
          href={site.booking.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex h-11 items-center rounded-[10px] btn-gold px-5 text-[14px] font-medium"
        >
          Reserve your room<span className="sr-only"> with {site.booking.coordinator} (opens in a new tab)</span>
        </a>
        <p className="text-[14px] text-ink-mute">
          Staying elsewhere? Outside guests may pay to come onto the resort at a fee of {site.booking.dayPass}.
        </p>
      </>
    ),
  },
  {
    eyebrow: "Payment plans",
    title: "Book early, pay over time",
    icon: WalletIcon,
    photos: [
      { slug: "white-dress", alt: "Caleb lifting Alexis in a white dress", caption: "names" },
      { slug: "grass-lying", alt: "The couple lying in a green field", caption: "date" },
    ],
    body: (
      <>
        <p>
          You can set up a payment plan with {site.booking.coordinator}. The deadline for payment plans is{" "}
          <strong className="font-semibold text-ink">{site.booking.paymentPlanDeadline}</strong> — don’t wait until the last minute!
        </p>
      </>
    ),
  },
  {
    id: "travel",
    eyebrow: "Transportation",
    title: "Getting there",
    icon: AirplaneTiltIcon,
    photos: [
      { slug: "field-lift", alt: "Alexis lifted into the air by Caleb in a meadow", caption: "date" },
      { slug: "fishing-wide", alt: "The couple fishing beside a pond", caption: "names" },
    ],
    body: (
      <>
        <p>
          We recommend flying into <strong className="font-semibold text-ink">Cancún International Airport (CUN)</strong>.
        </p>
        <p>Complimentary round-trip airport transportation is provided for all resort guests:</p>
        <dl className="mt-1 divide-y divide-gold/30 border-y border-gold/30 text-[15px]">
          {["May 7", "May 14"].map((d) => (
            <div key={d} className="flex items-center justify-between py-2.5">
              <dt className="font-semibold text-ink">{d}</dt>
              <dd>6:00 AM – 11:00 PM</dd>
            </div>
          ))}
        </dl>
      </>
    ),
  },
  {
    eyebrow: "Dress code",
    title: "What to wear",
    icon: CoatHangerIcon,
    photos: [
      { slug: "arch-embrace", alt: "Alexis and Caleb embracing against a stone wall", caption: "names" },
      { slug: "field-kiss", alt: "A kiss in a field of wildflowers", caption: "date" },
    ],
    body: (
      <>
        <p>
          <strong className="font-semibold text-ink">Funky formal</strong> for the ladies and{" "}
          <strong className="font-semibold text-ink">beach formal</strong> for the guys.
        </p>
        <p>
          The ceremony and reception will be outdoors, weather permitting, and there may be some uneven ground — please
          leave the stilettos at home and go for block heels or sandals instead.
        </p>
      </>
    ),
  },
];

export function GuestInfo() {
  return (
    <section id="details" aria-labelledby="details-title" className="relative overflow-hidden py-24 sm:py-32">
      <PalmShadow mirror className="-top-10 -left-24 h-[420px] w-[480px] sm:h-[560px] sm:w-[640px]" />
      <div className="mx-auto max-w-[1100px] px-4">
        <header data-reveal className="text-center">
          <p className="eyebrow">Guest information</p>
          <h2 id="details-title" className="title-xl mt-4">
            Everything you need to know
          </h2>
          <Flourish className="mt-5" />
        </header>

        <div className="mt-16 flex flex-col gap-24 sm:mt-24 sm:gap-28">
          {rows.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={r.title}
                id={r.id}
                data-reveal
                className="grid scroll-mt-28 items-center gap-12 md:grid-cols-2 md:gap-16"
              >
                <div className={`max-w-[440px] ${flip ? "md:order-2 md:justify-self-end" : ""}`}>
                  <WaxSeal size={64} seed={i + 7} icon={r.icon} />
                  <p className="eyebrow mt-5">{r.eyebrow}</p>
                  <h3 className="mt-2 text-[26px] font-medium tracking-[-0.02em] text-ink">{r.title}</h3>
                  <div className="mt-4 flex flex-col items-start gap-3 text-[16px] leading-[1.6] font-medium tracking-[-0.01em] text-ink-soft [&>dl]:w-full">
                    {r.body}
                  </div>
                </div>
                <div className={`relative mx-auto h-[360px] w-full max-w-[460px] sm:h-[420px] ${flip ? "md:order-1" : ""}`}>
                  <Polaroid p={r.photos[0]} sizes="260px" className="top-[12%] left-0 z-10 h-[64%] w-[52%] -rotate-[5deg]" />
                  <Polaroid p={r.photos[1]} sizes="300px" className="top-0 right-0 h-[88%] w-[58%] rotate-[4deg]" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
