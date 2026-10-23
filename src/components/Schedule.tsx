import { Flourish } from "./Ornament";
import { ScrollLine } from "./ScrollLine";
import { schedule, site } from "@/content/site";
import { Photo } from "./Photo";
import { ChampagneIcon, ConfettiIcon, SunHorizonIcon } from "@phosphor-icons/react/dist/ssr";
import { Sparkle, WaxSeal } from "./WaxSeal";

const icons = [ChampagneIcon, SunHorizonIcon, ConfettiIcon];

export function Schedule() {
  return (
    <section id="celebration" aria-labelledby="celebration-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1000px] px-4">
        <header data-reveal className="text-center">
          <p className="eyebrow">The celebration</p>
          <h2 id="celebration-title" className="title-xl mt-4">
            Wedding week schedule
          </h2>
          <Flourish className="mt-5" />
          <p className="mx-auto mt-5 max-w-[46ch] text-[16px] leading-[1.6] font-medium text-ink-soft">
            Everything takes place at {site.venue.name}. More details are coming soon, and we’ll update this page as plans are
            finalized.
          </p>
        </header>

        <ol className="relative mt-16 sm:mt-20">
          {/* centre rule, which fills as you scroll */}
          <ScrollLine className="left-[19px] -translate-x-1/2 sm:left-1/2" />
          {schedule.map((e, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={e.title} data-reveal className="relative grid gap-6 pb-16 pl-12 last:pb-0 sm:grid-cols-2 sm:gap-20 sm:pl-0">
                <span
                  data-step
                  aria-hidden="true"
                  className="group/step absolute top-1 left-[19px] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-paper sm:left-1/2"
                >
                  <Sparkle
                    size={16}
                    className="text-gold/35 transition-all duration-500 group-data-[active]/step:scale-125 group-data-[active]/step:text-gold group-data-[active]/step:drop-shadow-[0_0_6px_rgba(214,190,134,0.9)]"
                  />
                </span>
                <div className={`flex ${flip ? "sm:order-2 sm:justify-start" : "sm:justify-end"}`}>
                  <div
                    className={`paper-layer w-full max-w-[260px] drop-shadow-[0_12px_22px_rgba(60,40,25,0.18)] ${flip ? "rotate-[1.2deg]" : "-rotate-[1.2deg]"}`}
                  >
                    <div className="torn grain bg-note p-3">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Photo slug={e.photo} alt={e.photoAlt} fill sizes="260px" className="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col justify-center ${flip ? "sm:order-1 sm:items-end sm:text-right" : ""}`}>
                  <WaxSeal size={64} seed={i + 4} icon={icons[i % icons.length]} />
                  <p className="mt-4 text-[15px] font-medium text-ink-mute">
                    {e.day}, {e.date}
                    <span aria-hidden="true" className="hidden sm:inline"> · </span>
                    <br className="sm:hidden" />
                    {e.time}
                  </p>
                  <h3 className="mt-1 text-[24px] font-medium tracking-[-0.02em] text-ink">{e.title}</h3>
                  {e.attire && (
                    <p className={`mt-2 inline-flex self-start rounded-full ${flip ? "sm:self-end" : ""} bg-sand/70 px-3 py-1 text-[12px] font-medium tracking-[0.08em] text-clay uppercase`}>
                      {e.attire}
                    </p>
                  )}
                  <p className="mt-3 max-w-[34ch] text-[16px] leading-[1.55] font-medium tracking-[-0.01em] text-ink-soft">
                    {e.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
