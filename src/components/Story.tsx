import { Flourish } from "./Ornament";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { milestones, storyIntro } from "@/content/site";
import { Photo } from "./Photo";
import { TalaveraPattern } from "./TalaveraPattern";
import { WaxSeal } from "./WaxSeal";

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-paper-2 py-24 sm:py-32">
      <TalaveraPattern className="opacity-[0.32]" />
      <div className="relative mx-auto max-w-[1100px] px-4">
        <div data-reveal className="mx-auto max-w-[560px] drop-shadow-[0_14px_28px_rgba(60,40,25,0.16)]">
        <div className="grain torn bg-note px-8 py-12 text-center sm:px-14 sm:py-14">
          <p className="eyebrow">Our story</p>
          <h2 id="story-title" className="title-xl mt-4">
            How it started
          </h2>
          <Flourish className="mt-5" />
          <p className="mx-auto mt-6 max-w-[42ch] text-[16px] leading-[1.6] font-medium tracking-[-0.01em] text-ink-soft">
            {storyIntro}
          </p>
        </div>
        </div>

        <ol className="mt-16 flex flex-col gap-14 sm:mt-24 sm:gap-6">
          {milestones.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={m.n}
                data-reveal
                className={`relative flex flex-col items-center sm:block sm:h-[560px] ${right ? "sm:ml-auto" : ""} sm:w-[640px]`}
              >
                <article className={`relative z-0 w-[min(320px,86vw)] rounded-[12px] bg-card p-3 shadow-[0_18px_40px_-18px_rgba(60,40,25,0.35)] sm:absolute sm:top-0 ${right ? "sm:right-[260px]" : "sm:left-0"}`}>
                  <header className="flex items-baseline justify-between px-1 pt-1 pb-3">
                    <h3 className="text-[22px] font-medium tracking-[-0.02em] text-ink-soft">{m.title}</h3>
                  </header>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
                    <Photo slug={m.photo} alt={m.photoAlt} fill sizes="320px" className="object-cover" />
                  </div>
                  <p className="px-1 pt-3 pb-1 text-[15px] font-medium text-ink-mute">{m.when}</p>
                </article>
                <div
                  className={`relative z-10 -mt-3 ml-10 w-[min(280px,78vw)] sm:ml-0 sm:absolute sm:mt-0 sm:top-[150px] ${right ? "sm:right-0" : "sm:left-[250px]"} ${right ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"} drop-shadow-[0_10px_22px_rgba(60,40,25,0.2)]`}
                >
                  <WaxSeal size={68} className="absolute -top-8 left-1/2 z-10 -translate-x-1/2" />
                  <div className="grain torn bg-note px-7 pt-12 pb-9 text-center">
                    <p className="text-[15px] leading-[1.55] font-medium tracking-[-0.01em] text-ink">{m.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div data-reveal className="mt-16 flex justify-center sm:mt-8">
          <Link
            href="/our-story"
            className="flex h-12 items-center gap-2 rounded-[12px] bg-ink px-6 text-[15px] font-medium text-white transition hover:bg-black"
          >
            Read our whole story
            <ArrowRightIcon size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
