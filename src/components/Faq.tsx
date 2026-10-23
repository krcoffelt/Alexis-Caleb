"use client";

import { Flourish } from "./Ornament";
import { useId, useState } from "react";
import { faqs } from "@/content/site";
import { Sparkle } from "./WaxSeal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="questions" aria-labelledby="faq-title" className="relative isolate overflow-hidden bg-lagoon py-24 sm:py-32">
      <div aria-hidden="true" className="water-light -z-10" />
      <div className="relative mx-auto max-w-[640px] px-4">
        <header data-reveal className="text-center">
          <p className="eyebrow">Frequently asked questions</p>
          <h2 id="faq-title" className="title-xl mt-4">
            Questions you may have
          </h2>
          <Flourish className="mt-5" />
        </header>
        <ul data-reveal className="mt-14 border-b border-ink/25">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panel = `${base}-p${i}`;
            return (
              <li key={f.q} className="border-t border-ink/25">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-[60px] w-full items-center justify-between gap-6 py-4 text-left text-[17px] font-medium tracking-[-0.015em] text-ink"
                  >
                    {f.q}
                    <Sparkle
                      size={14}
                      className={`shrink-0 text-gold transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  aria-label={f.q}
                  hidden={!isOpen}
                  className="pb-6 pr-10 text-[16px] leading-[1.6] font-medium tracking-[-0.01em] text-ink-soft"
                >
                  {f.a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
