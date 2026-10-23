import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { LoopVideo } from "./LoopVideo";
import { Waves } from "./Waves";

/** Full-bleed aerial shoreline band: the tropical breath between logistics and photos. */
export function SeaInterlude() {
  return (
    <section aria-labelledby="sea-title" className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-x-0 top-[3px] bottom-[3px] -z-10 bg-sea-deep">
        <LoopVideo
          src={site.shorelineVideo.src}
          poster={site.shorelineVideo.poster}
          className="h-full w-full object-cover object-[30%_50%] [filter:saturate(.9)_brightness(1.02)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,52,52,0.5)_0%,rgba(23,52,52,0.28)_45%,rgba(23,52,52,0)_75%)]" />
      </div>

      <Waves flip fill="var(--color-paper)" className="relative z-10" />

      <div className="mx-auto flex min-h-[520px] max-w-[1200px] items-center px-6 py-16 sm:min-h-[620px] sm:px-10">
        <div data-reveal className="max-w-[520px]">
          <p className="text-[12px] font-medium tracking-[0.28em] text-white/85 uppercase">Riviera Maya · Mexico</p>
          <h2
            id="sea-title"
            className="mt-5 font-display text-[clamp(2.75rem,1.6rem+4.4vw,5rem)] leading-[1.02] tracking-[-0.025em] [text-shadow:0_2px_24px_rgba(20,50,50,0.3)]"
          >
            See you by <span className="font-accent italic">the</span> sea
          </h2>
          <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.6] font-medium text-white/90">
            Three days of sun, sea and celebration on the Caribbean coast, from May 9 to 11, 2027.
          </p>
          <Link
            href="/#stay"
            className="mt-9 inline-flex h-12 items-center gap-2 rounded-[12px] bg-white px-6 text-[15px] font-medium text-ink transition hover:bg-paper"
          >
            Plan your stay <ArrowRightIcon size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <Waves fill="var(--color-paper-2)" className="relative z-10" />
    </section>
  );
}
