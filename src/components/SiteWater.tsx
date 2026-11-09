"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/**
 * The hero's moving water, fixed behind the whole page under a soft ivory
 * wash so dark text stays readable. It only loads and plays once the hero
 * has scrolled away (the hero already shows the same water), pauses again
 * when the hero is back in view, and stays on the still poster for
 * reduced-motion visitors.
 */
export function SiteWater() {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const v = ref.current;
    const hero = document.querySelector("section[aria-labelledby='hero-title']");
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const play = (heroVisible: boolean) => {
      if (heroVisible || reduce.matches || document.hidden) {
        v.pause();
      } else {
        setLoad(true);
        v.play().catch(() => {});
      }
    };
    let heroVisible = !!hero;
    const io = hero
      ? new IntersectionObserver(([e]) => {
          heroVisible = e.isIntersecting;
          play(heroVisible);
        })
      : null;
    if (hero && io) io.observe(hero);
    else play(false);
    const onVis = () => play(heroVisible);
    document.addEventListener("visibilitychange", onVis);
    reduce.addEventListener("change", onVis);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      reduce.removeEventListener("change", onVis);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <video
        ref={ref}
        className="h-full w-full scale-105 object-cover [filter:saturate(.7)_hue-rotate(-10deg)_brightness(1.05)]"
        src={load ? site.oceanVideo.src : undefined}
        poster={site.oceanVideo.poster}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
      />
      {/* ivory wash: keeps the page light and the text crisp over the water */}
      <div className="absolute inset-0 bg-[rgba(246,240,232,0.82)]" />
    </div>
  );
}
