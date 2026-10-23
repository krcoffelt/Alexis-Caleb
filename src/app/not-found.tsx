import Link from "next/link";
import { Monogram } from "@/components/Monogram";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh flex-col items-center justify-center bg-paper px-4 text-center">
      <Monogram size="2.75rem" decorative />
      <p className="eyebrow mt-10">Page not found</p>
      <h1 className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-tight text-ink">
        This page wandered off to the beach.
      </h1>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link href="/" className="flex h-11 items-center rounded-[10px] bg-ink px-5 text-[15px] font-medium text-white">
          Back to the website
        </Link>
        <Link href="/rsvp" className="flex h-11 items-center px-4 text-[15px] font-medium text-ink underline decoration-gold underline-offset-4">
          Submit RSVP
        </Link>
      </div>
    </main>
  );
}
