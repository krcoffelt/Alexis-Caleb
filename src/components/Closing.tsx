import Link from "next/link";
import { site } from "@/content/site";
import { Monogram } from "./Monogram";
import { TalaveraPattern } from "./TalaveraPattern";
import { Waves } from "./Waves";
import { Photo } from "./Photo";
import { ArrowUpRightIcon, GiftIcon } from "@phosphor-icons/react/dist/ssr";
import { WaxSeal } from "./WaxSeal";

export function Registry() {
  return (
    <section id="registry" aria-labelledby="registry-title" className="py-24 sm:py-32">
      <div data-reveal className="mx-auto flex max-w-[620px] flex-col items-center px-4 text-center">
        <WaxSeal size={64} seed={11} icon={GiftIcon} />
        <p className="eyebrow mt-6">Registry</p>
        <h2 id="registry-title" className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2vw,2.375rem)] leading-[1.2] tracking-[-0.015em] text-ink">
          The greatest gift of all is having you celebrate with us.
        </h2>
        <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] font-medium text-ink-soft">
          Should you wish to honor us with a gift, we have put together a registry for you to contribute.
        </p>
        <a
          href={site.registry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex h-12 items-center gap-2 rounded-[12px] border border-ink/80 px-6 text-[15px] font-medium text-ink transition hover:bg-ink hover:text-white"
        >
          Browse our registry <ArrowUpRightIcon size={16} aria-hidden="true" />
          <span className="sr-only">(opens our Joy registry in a new tab)</span>
        </a>
      </div>
    </section>
  );
}

export function RsvpInvite() {
  return (
    <section aria-labelledby="rsvp-invite-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-[3px] bottom-[3px] -z-10">
        <Photo slug="tulum-palms" alt="" fill sizes="100vw" className="object-cover object-[50%_55%] [filter:saturate(.92)_brightness(.97)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,52,52,0.22)_0%,rgba(23,52,52,0.05)_70%)]" />
      </div>
      <Waves flip fill="var(--color-paper)" className="relative z-10" />
      <div className="flex min-h-[600px] items-center justify-center px-4 py-20 sm:min-h-[680px]">
        <div data-reveal className="relative w-full max-w-[640px]">
          <WaxSeal size={84} className="absolute -top-10 left-1/2 z-10 -translate-x-1/2" />
          <div className="paper-layer drop-shadow-[0_24px_40px_rgba(30,20,10,0.3)]">
          <div className="grain torn bg-note px-6 pt-16 pb-10 text-center sm:px-14 sm:pt-20 sm:pb-12">
            <p className="eyebrow">RSVP</p>
            <h2
              id="rsvp-invite-title"
              className="mx-auto mt-4 max-w-[22ch] font-display text-[clamp(1.5rem,1.1rem+1.6vw,2rem)] leading-[1.25] tracking-[-0.015em] text-ink"
            >
              Please Confirm Your Attendance. We Can’t Wait To Celebrate With You.
            </h2>
            <div className="mx-auto mt-8 flex max-w-[440px] flex-col items-center gap-4 rounded-[12px] bg-sand p-3 pl-5 sm:flex-row sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-[18px] font-medium tracking-[-0.02em] text-ink">{site.date.short}</p>
                <p className="text-[13px] font-medium text-ink-soft">RSVP by {site.rsvp.deadline}</p>
              </div>
              <Link
                href="/rsvp"
                className="flex h-11 w-full items-center justify-center rounded-[10px] btn-gold px-5 text-[15px] font-medium sm:w-auto"
              >
                Submit RSVP
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Waves fill="var(--color-lagoon)" className="relative z-10" />
    </section>
  );
}

export function ClosingBanner() {
  return (
    <section aria-labelledby="closing-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 bottom-[3px] -z-10">
        <Photo slug="lake-bw" alt="" fill sizes="100vw" className="object-cover object-[50%_45%] [filter:sepia(.35)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,15,0.25),rgba(20,18,15,0.45))]" />
      </div>
      <div className="flex min-h-[620px] flex-col items-center justify-center px-4 py-24 text-center text-white sm:min-h-[760px]">
        <p data-reveal className="text-[13px] font-medium tracking-[0.14em] text-clay-soft uppercase">
          With love
        </p>
        <h2
          id="closing-title"
          data-reveal
          className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,1.3rem+2.8vw,3rem)] leading-[1.12] tracking-[-0.015em] uppercase"
        >
          Can’t wait to celebrate with you
        </h2>
        <Link
          data-reveal
          href="/rsvp"
          className="mt-10 flex h-12 items-center rounded-[12px] bg-white px-7 text-[15px] font-medium text-ink transition hover:bg-paper"
        >
          Submit RSVP
        </Link>
      </div>
      <Waves fill="var(--color-sea-deep)" className="relative z-10 -mb-px" />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-sea-deep text-[#f2e9dd]">
      <div aria-hidden="true" className="relative h-16 overflow-hidden border-b border-[#f2e9dd]/10">
        <TalaveraPattern color="#f2e9dd" tile={64} className="opacity-25" />
      </div>
      <div className="mx-auto flex max-w-[1100px] flex-col items-center px-4 pt-20 pb-10 text-center">
        <Monogram size="3.5rem" subtitle />
        <p className="mt-8 text-[15px] font-medium text-[#f2e9dd]/80">
          {site.date.long} · {site.venue.name}, {site.venue.city}
        </p>
        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-[14px] font-medium">
            {[
              { href: "/our-story", label: "Our Story" },
              { href: "/#celebration", label: "Celebration" },
              { href: "/#stay", label: "Stay & Travel" },
              { href: "/#questions", label: "Q&A" },
              { href: "/#registry", label: "Registry" },
              { href: "/rsvp", label: "RSVP" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex h-11 items-center px-3 hover:text-white hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 h-px w-full max-w-[420px] bg-[#f2e9dd]/15" />
        <p className="mt-6 text-[12px] text-[#f2e9dd]/55">Photography by {site.photographer}</p>
      </div>
    </footer>
  );
}
