import { Flourish } from "./Ornament";
import { storyIntro, storyQA } from "@/content/site";
import { Photo } from "./Photo";
import { TalaveraPattern } from "./TalaveraPattern";
import { WaxSeal } from "./WaxSeal";

/**
 * The couple's full story: every question from their Joy site, each as a
 * photo card paired with a torn-paper note carrying the complete answer.
 */
export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden py-24 sm:py-32">
      <TalaveraPattern className="opacity-[0.28]" />
      <div className="relative mx-auto max-w-[1040px] px-4">
        <div data-reveal className="mx-auto max-w-[580px]">
          <div className="paper-layer drop-shadow-[0_14px_28px_rgba(60,40,25,0.16)]">
            <div className="grain torn bg-note px-8 py-12 text-center sm:px-14 sm:py-14">
              <p className="eyebrow">Our story</p>
              <h2 id="story-title" className="title-xl mt-4">
                How it started
              </h2>
              <Flourish className="mt-5" />
              <p className="mx-auto mt-6 max-w-[44ch] text-[17px] leading-[1.65] text-ink-soft">{storyIntro}</p>
            </div>
          </div>
        </div>

        <ol className="mt-16 flex flex-col gap-16 sm:mt-24 sm:gap-20">
          {storyQA.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <li
                key={item.q}
                data-reveal
                className={`flex flex-col items-center sm:flex-row sm:items-center ${flip ? "sm:flex-row-reverse" : ""}`}
              >
                {/* photo card titled with the question */}
                <article
                  className={`paper-layer relative z-0 w-[min(300px,82vw)] shrink-0 rounded-[12px] bg-card p-3 shadow-[0_18px_40px_-18px_rgba(60,40,25,0.35)] ${flip ? "sm:rotate-[1.2deg]" : "sm:-rotate-[1.2deg]"}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
                    <Photo slug={item.photo} alt={item.photoAlt} fill sizes="300px" className="object-cover" />
                  </div>
                  <h3 className="px-1 pt-3 pb-1 font-heading text-[19px] leading-snug text-ink">{item.q}</h3>
                </article>

                {/* the full answer on a pinned note, overlapping the card */}
                <div
                  className={`paper-layer relative z-10 mt-10 w-[min(460px,90vw)] drop-shadow-[0_10px_22px_rgba(60,40,25,0.2)] sm:mt-0 ${flip ? "sm:-mr-10 sm:rotate-[-1deg]" : "sm:-ml-10 sm:rotate-[1deg]"}`}
                >
                  <WaxSeal size={62} seed={i + 2} className="absolute -top-7 left-1/2 z-10 -translate-x-1/2" />
                  <div className="grain torn bg-note px-7 pt-12 pb-9 sm:px-10">
                    <div className="flex flex-col gap-3 text-[16px] leading-[1.65] text-ink">
                      {item.a.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
