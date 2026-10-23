import { site } from "@/content/site";
import { Monogram } from "./Monogram";
import { OceanVideo } from "./OceanVideo";
import { Sparkle } from "./WaxSeal";

/**
 * One centred lockup over the moving water: the CA mark crowns the names,
 * a hairline separates a single line of essentials. Everything reads as a
 * single invitation rather than three competing title treatments.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="p-2.5 sm:p-3">
      <div className="relative isolate flex min-h-[calc(100svh-20px)] flex-col overflow-hidden rounded-[18px] text-white sm:rounded-[22px]">
        <OceanVideo />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(23,52,52,0.32)_0%,rgba(23,52,52,0)_26%,rgba(23,52,52,0)_42%,rgba(23,52,52,0.55)_100%)]"
        />

        <div className="relative z-10 mt-auto flex flex-col items-center px-5 pt-32 pb-8 text-center sm:px-10 sm:pb-10">
          <Monogram size="clamp(3.6rem, 2.4rem + 3.4vw, 6rem)" className="drop-shadow-[0_2px_16px_rgba(20,50,50,0.35)]" />

          <h1
            id="hero-title"
            className="mt-6 font-display leading-[0.95] tracking-[-0.03em] [text-shadow:0_2px_30px_rgba(20,50,50,0.25)] sm:mt-8 sm:whitespace-nowrap"
            style={{ fontSize: "clamp(3.9rem, 11.5vw, 12.5rem)" }}
          >
            <span className="block sm:inline">Alexis</span>{" "}
            <span className="block sm:inline">
              <span className="font-accent italic">&amp;</span> Caleb
            </span>
          </h1>

          <div className="mt-7 w-full max-w-[1080px] border-t border-white/35 pt-5 sm:mt-9 sm:pt-6">
            <p className="flex flex-col items-center gap-2 text-[12px] font-medium tracking-[0.24em] uppercase sm:flex-row sm:justify-center sm:gap-6 sm:text-[13px]">
              <time dateTime="2027-05-11">{site.date.long}</time>
              <Sparkle size={10} className="hidden text-white/70 sm:block" />
              <span>{site.venue.name}</span>
              <Sparkle size={10} className="hidden text-white/70 sm:block" />
              <span>Playa del Carmen, Mexico</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
