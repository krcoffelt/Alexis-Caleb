"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Monogram } from "./Monogram";

const links = [
  { href: "/our-story", label: "Our Story" },
  { href: "/#stay", label: "Stay & Travel" },
  { href: "/#questions", label: "Q&A" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        aria-label="Main"
        className="pointer-events-auto relative w-full max-w-[34rem] rounded-[14px] bg-white/95 p-1.5 shadow-[0_8px_30px_rgba(37,37,37,0.08)] ring-1 ring-black/[0.04] backdrop-blur md:w-auto md:max-w-none"
      >
        <div className="flex items-center justify-between gap-2 md:gap-1">
          <Link href="/" className="flex h-10 items-center rounded-[10px] px-3 text-ink" aria-label="Home — Alexis & Caleb">
            <Monogram size="1.15rem" decorative />
          </Link>
          <ul className="hidden items-center md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex h-10 items-center rounded-[10px] px-3.5 text-[13px] font-medium tracking-[-0.01em] text-ink transition-colors hover:bg-paper"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <Link
              href="/rsvp"
              className="flex h-10 items-center rounded-[10px] btn-gold px-4 text-[14px] font-medium tracking-[-0.01em] md:ml-3"
            >
              Submit RSVP
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="flex h-10 w-11 items-center justify-center rounded-[10px] text-ink hover:bg-paper md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <XIcon size={22} weight="light" /> : <ListIcon size={22} weight="light" />}
            </button>
          </div>
        </div>
        <div id="mobile-menu" hidden={!open} className="md:hidden">
          <ul className="mt-1.5 border-t border-black/5 pt-1.5 pb-1">
            {[{ href: "/", label: "Home" }, ...links].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center rounded-[10px] px-3 text-[15px] font-medium text-ink hover:bg-paper"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
