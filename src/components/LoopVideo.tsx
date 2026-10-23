"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted background loop. Loads only when near the viewport (unless `eager`),
 * pauses offscreen, and stays on the still poster for reduced-motion visitors.
 */
export function LoopVideo({
  src,
  poster,
  eager = false,
  className = "",
}: {
  src: string;
  poster: string;
  eager?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(eager);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          if (!reduce.matches) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    const onReduce = () => reduce.matches && v.pause();
    reduce.addEventListener("change", onReduce);
    return () => {
      io.disconnect();
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={load ? src : undefined}
      poster={poster}
      autoPlay={eager}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
