"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds `.js` before paint, then fades `[data-reveal]` elements in as they enter. */
export function RevealScript() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible", "is-settled"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add("is-visible");
            io.unobserve(el);
            // drop the will-change hint once the fade has finished
            const delay = parseFloat(getComputedStyle(el).getPropertyValue("--reveal-delay")) || 0;
            window.setTimeout(() => el.classList.add("is-settled"), 900 + delay);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />;
}
