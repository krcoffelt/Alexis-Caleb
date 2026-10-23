"use client";

import { useEffect, useRef } from "react";

/**
 * Timeline rule that fills as the reader scrolls through its parent list.
 * Steps marked `data-step` inside the parent light up once the fill reaches them.
 */
export function ScrollLine({ className = "" }: { className?: string }) {
  const track = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = track.current;
    const list = el?.parentElement;
    if (!el || !list) return;
    const steps = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const reach = window.innerHeight * 0.62 - r.top; // px of the list "reached"
      const p = reduce.matches ? 1 : Math.min(1, Math.max(0, reach / r.height));
      el.style.setProperty("--p", p.toFixed(4));
      const filled = p * r.height;
      for (const s of steps) {
        const top = s.getBoundingClientRect().top - r.top;
        s.toggleAttribute("data-active", top <= filled + 4);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      ref={track}
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 bottom-0 w-[2px] rounded-full bg-gold/20 ${className}`}
      style={{ ["--p" as string]: 0 }}
    >
      <span
        className="absolute inset-x-0 top-0 origin-top rounded-full bg-[linear-gradient(180deg,#d6be86,#b89b62_60%,#9c7f45)]"
        style={{ height: "100%", transform: "scaleY(var(--p))" }}
      />
    </span>
  );
}
