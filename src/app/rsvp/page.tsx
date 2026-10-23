import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Monogram } from "@/components/Monogram";
import { RsvpForm } from "@/components/RsvpForm";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "RSVP" };

export default function RsvpPage() {
  return (
    <main id="main" className="min-h-svh bg-paper">
      <div className="px-4 pt-4 sm:px-6 sm:pt-6">
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-1.5 rounded-[10px] btn-gold px-4 text-[14px] font-medium"
        >
          <ArrowLeftIcon size={16} aria-hidden="true" /> Back
        </Link>
      </div>
      <div className="mx-auto flex max-w-[400px] flex-col px-5 pt-14 pb-24 sm:pt-20">
        <header className="mb-12 text-center">
          <Monogram size="2.25rem" className="text-ink" decorative />
          <h1 className="mt-6 font-display text-[30px] leading-tight text-ink">RSVP</h1>
          <p className="mt-2 text-[15px] font-medium text-ink-soft">
            {site.date.long} · {site.venue.name}
          </p>
          <p className="mt-1 text-[14px] font-medium text-ink-mute">Kindly reply by {site.rsvp.deadline}</p>
        </header>
        <RsvpForm />
      </div>
    </main>
  );
}
