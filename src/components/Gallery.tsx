"use client";

import { Flourish } from "./Ornament";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/content/site";
import { Photo } from "./Photo";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) dlg.showModal();
    if (index === null && dlg.open) {
      dlg.close();
      openerRef.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <section id="photos" aria-labelledby="photos-title" className="bg-paper-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4">
        <header data-reveal className="text-center">
          <p className="eyebrow">Moments</p>
          <h2 id="photos-title" className="title-xl mt-4">
            A few of our favorites
          </h2>
          <Flourish className="mt-5" />
        </header>
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 md:grid-cols-4">
          {gallery.map((g, i) => (
            <li key={g.slug} data-reveal className={i === 0 ? "col-span-2 row-span-2" : i === 5 ? "col-span-2" : ""} style={{ ["--reveal-delay" as string]: `${(i % 4) * 80}ms` }}>
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setIndex(i);
                }}
                className={`group relative block h-full w-full overflow-hidden rounded-[10px] ${i === 0 ? "aspect-[4/5] md:aspect-auto" : i === 5 ? "aspect-[2/1.24]" : "aspect-[4/5]"}`}
                aria-label={`View larger: ${g.alt}`}
              >
                <Photo
                  slug={g.slug}
                  alt={g.alt}
                  fill
                  sizes={i === 0 || i === 5 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label="Photo viewer"
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-[rgba(25,20,18,0.92)]"
      >
        {index !== null && (
          <div className="flex h-full w-full items-center justify-center p-4 sm:p-14" onClick={(e) => e.target === e.currentTarget && close()}>
            <Photo
              slug={gallery[index].slug}
              alt={gallery[index].alt}
              sizes="100vw"
              className="h-auto max-h-full w-auto max-w-full rounded-[6px] object-contain"
            />
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close photo viewer"
            >
              <XIcon size={20} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Previous photo"
            >
              <CaretLeftIcon size={20} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Next photo"
            >
              <CaretRightIcon size={20} weight="light" />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[13px] text-white/70" aria-live="polite">
              {index + 1} / {gallery.length}
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
