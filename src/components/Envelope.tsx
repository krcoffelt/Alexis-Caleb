"use client";

import { EnvelopeOpenIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Sparkle, WaxSeal } from "./WaxSeal";

// Pocket outline of public/media/envelope-cream.png (736×776), traced from its
// V-shaped top edge so the card can sit *inside* the envelope.
const POCKET =
  "polygon(0% 34%, 0.5% 34.3%, 4.9% 35.6%, 9.2% 36.8%, 13.6% 39.5%, 52.2% 63.8%, 87.5% 36.4%, 91.8% 34.3%, 96.2% 33.5%, 100% 33.4%, 100% 100%, 0% 100%)";

function useCountdown(targetIso: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, new Date(targetIso).getTime() - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
  };
}

function InvitationCard() {
  return (
    <span className="paper-layer block h-full w-full drop-shadow-[0_6px_14px_rgba(70,45,25,0.18)]">
      <span className="deckle grain relative flex h-full w-full flex-col items-center bg-[#fdf9f2] px-[7%] pt-[21%] text-center text-ink [container-type:inline-size]">
        <span className="pointer-events-none absolute inset-[3.5%] border border-gold/45" />
        <span className="pointer-events-none absolute inset-[4.6%] border border-gold/25" />
        <span className="block text-[2.6cqw] font-medium tracking-[0.32em] text-gold-deep uppercase">
          Save the date
        </span>
        <span className="mt-[1.5cqw] block font-script text-[10.5cqw] leading-[1.05] text-ink">
          {site.couple.displayName}
        </span>
        <span className="mt-[1.6cqw] flex w-[46%] items-center gap-[2cqw] text-gold">
          <span className="h-px flex-1 bg-gold/60" />
          <Sparkle size={9} />
          <span className="h-px flex-1 bg-gold/60" />
        </span>
        <span className="mt-[2.6cqw] flex items-center gap-[3cqw] font-display text-ink">
          <span className="w-[18cqw] border-y border-gold/50 py-[0.9cqw] text-[2.5cqw] tracking-[0.2em] uppercase">
            Tuesday
          </span>
          <span className="text-[9cqw] leading-none">11</span>
          <span className="w-[18cqw] border-y border-gold/50 py-[0.9cqw] text-[2.5cqw] tracking-[0.2em] uppercase">
            May 2027
          </span>
        </span>
        <span className="mt-[3cqw] block text-[2.5cqw] font-medium tracking-[0.22em] text-ink-soft uppercase">
          {site.venue.name} · Playa del Carmen
        </span>
      </span>
    </span>
  );
}

export function Envelope() {
  const [open, setOpen] = useState(false);
  const c = useCountdown(site.date.iso);

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full max-w-[460px] transition-[padding] duration-[1000ms] ease-[var(--ease-soft)]"
        style={{ paddingTop: open ? "22%" : "0%" }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="group relative block aspect-[736/776] w-full cursor-pointer rounded-[6px] focus-visible:outline-offset-8"
        >
          <span className="sr-only">
            {open ? "Tuck the invitation back in" : "Open the invitation"}: {site.couple.displayName}, {site.date.long},{" "}
            {site.venue.name}
          </span>

          {/* envelope back + interior + open flap (photo) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/envelope-cream.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full drop-shadow-[0_28px_38px_rgba(70,45,25,0.22)]"
            draggable={false}
          />

          {/* the invitation, tucked inside */}
          <span
            aria-hidden="true"
            className="absolute top-[41%] left-[8%] block h-[57%] w-[84%] transition-transform duration-[1000ms] ease-[var(--ease-soft)]"
            style={{ transform: open ? "translateY(-101%)" : undefined }}
          >
            <InvitationCard />
          </span>

          {/* front pocket (same photo, clipped) keeps the card inside */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block drop-shadow-[0_-1px_1.5px_rgba(80,55,30,0.28)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/envelope-cream.png"
              alt=""
              className="absolute inset-0 h-full w-full"
              style={{ clipPath: POCKET }}
              draggable={false}
            />
          </span>
          {/* gold seal pinned to the exact point of the pocket's V */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute z-10 block w-[19%] -translate-x-1/2 -translate-y-1/2"
            style={{ left: "51.22%", top: "63.6%" }}
          >
            <WaxSeal size={120} seed={2} drips={false} className="!h-auto !w-full" />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[11%] block text-center font-script text-[clamp(22px,6vw,30px)] text-gold-deep/80"
          >
            With love
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-hidden="true"
        tabIndex={-1}
        className="mt-6 flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#5aa8a4,#3d8a88)] px-5 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(33,64,63,0.25)] transition hover:brightness-95"
      >
        {open ? <EnvelopeSimpleIcon size={16} /> : <EnvelopeOpenIcon size={16} />}
        {open ? "Tuck it back in" : "Open your invitation"}
      </button>

      <dl className="mt-12 flex items-stretch justify-center divide-x divide-gold/40" aria-label="Countdown to the wedding">
        {(["days", "hours", "minutes"] as const).map((k) => (
          <div key={k} className="flex min-w-[96px] flex-col-reverse items-center px-5 sm:min-w-[120px] sm:px-8">
            <dt className="mt-2 text-[11px] font-medium tracking-[0.2em] text-ink-mute uppercase">{k}</dt>
            <dd className="font-accent text-[44px] leading-none text-ink tabular-nums sm:text-[56px]">{c ? c[k] : "·"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
