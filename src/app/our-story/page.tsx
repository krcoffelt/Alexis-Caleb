import type { Metadata } from "next";
import { Footer, RsvpInvite } from "@/components/Closing";
import { Nav } from "@/components/Nav";
import { Photo } from "@/components/Photo";
import { TalaveraPattern } from "@/components/TalaveraPattern";
import { WaxSeal } from "@/components/WaxSeal";
import { storyIntro, storyQA } from "@/content/site";

export const metadata: Metadata = { title: "Our Story" };

// Photos placed after the given Q&A index
const interludes: Record<number, { slug: string; alt: string }[]> = {
  1: [
    { slug: "kiss-close", alt: "Caleb kissing Alexis's cheek" },
    { slug: "stone-arch", alt: "The couple beneath a stone archway" },
  ],
  4: [
    { slug: "fishing", alt: "Alexis and Caleb fishing together from a picnic blanket" },
    { slug: "field-sit", alt: "Alexis hugging Caleb from behind in a field" },
  ],
  6: [
    { slug: "venice-ring", alt: "Alexis's engagement ring" },
    { slug: "spin", alt: "Caleb lifting Alexis in a blooming garden" },
  ],
};

export default function OurStory() {
  return (
    <>
      <Nav />
      <main id="main">
        <section aria-labelledby="story-page-title" className="p-2.5 sm:p-3">
          <div className="relative isolate flex min-h-[78svh] items-end overflow-hidden rounded-[18px] text-white sm:rounded-[22px]">
            <Photo
              slug="grass-lying"
              alt="Alexis and Caleb lying together in a green field"
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover object-[50%_60%]"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.45)_100%)]" />
            <div className="w-full px-6 pb-8 sm:px-10 sm:pb-10">
              <p className="flex items-center gap-3 text-[18px] font-medium tracking-[-0.02em] sm:text-[22px]">
                Spring 2021 — today <span aria-hidden="true" className="h-px w-8 bg-white/80" />
              </p>
              <h1
                id="story-page-title"
                className="mt-2 font-display text-[clamp(3.5rem,1.5rem+9vw,11rem)] leading-[0.95] tracking-[-0.03em]"
              >
                Our Story
              </h1>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-[820px] px-4 text-center">
            <p data-reveal className="eyebrow">
              How it started
            </p>
            <p
              data-reveal
              className="mt-6 font-display text-[clamp(1.375rem,1rem+1.4vw,2rem)] leading-[1.4] tracking-[-0.01em] text-ink"
            >
              {storyIntro}
            </p>
            <p data-reveal className="mt-6 font-script text-[30px] text-gold-deep">
              Alexis &amp; Caleb
            </p>
          </div>
        </section>

        <section aria-label="Questions about us" className="relative overflow-hidden bg-paper-2 py-24 sm:py-32">
          <TalaveraPattern className="opacity-[0.22]" />
          <div className="relative mx-auto max-w-[1000px] px-4">
            <ol className="flex flex-col gap-6">
              {storyQA.map((item, i) => (
                <li key={item.q} className="contents">
                  <article
                    data-reveal
                    className="grid gap-4 rounded-[16px] bg-card/90 p-6 shadow-[0_14px_34px_-22px_rgba(60,40,25,0.4)] ring-1 ring-black/[0.04] backdrop-blur-sm sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-10 sm:p-10"
                  >
                    <div className="flex items-start gap-4">
                      <WaxSeal size={44} className="mt-0.5 shrink-0" />
                      <h2 className="font-display text-[24px] leading-[1.2] tracking-[-0.01em] text-ink sm:text-[28px]">
                        {item.q}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4 text-[16px] leading-[1.65] font-medium tracking-[-0.01em] text-ink-soft sm:text-[17px]">
                      {item.a.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                  </article>
                  {interludes[i] && (
                    <div data-reveal className="grid grid-cols-2 gap-3 py-6 sm:gap-6 sm:py-10">
                      {interludes[i].map((ph, k) => (
                        <div
                          key={ph.slug}
                          className={`relative aspect-[4/5] overflow-hidden rounded-[14px] ${k === 1 ? "sm:translate-y-12" : ""}`}
                        >
                          <Photo slug={ph.slug} alt={ph.alt} fill sizes="(min-width: 1000px) 480px, 50vw" className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <RsvpInvite />
      </main>
      <Footer />
    </>
  );
}
