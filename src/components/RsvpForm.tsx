"use client";

import { CheckIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "done" | "error";

export function RsvpForm() {
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; attending?: string }>({});
  const startedAt = useRef(Date.now());
  const nameRef = useRef<HTMLInputElement>(null);
  const yesRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [submittedName, setSubmittedName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const next: typeof errors = {};
    if (!attending) next.attending = "Please choose Yes or No.";
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    setErrors(next);
    if (next.attending) return yesRef.current?.focus();
    if (next.name) return nameRef.current?.focus();

    setStatus("submitting");
    setMessage("");
    const company = (new FormData(e.currentTarget).get("company") as string) ?? "";
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, company, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.field === "name") setErrors({ name: data.error });
        if (data.field === "attending") setErrors({ attending: data.error });
        throw new Error(data.error ?? "We couldn’t save your RSVP. Please try again.");
      }
      setSubmittedName(name.trim().split(" ")[0]);
      setStatus("done");
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof TypeError
          ? "We couldn’t reach the server. Check your connection and try again — your RSVP has not been sent."
          : (err as Error).message,
      );
    }
  }

  if (status === "done") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="text-center outline-none">
        <p className="eyebrow">RSVP received</p>
        <h2 className="mt-4 font-display text-[30px] leading-tight text-ink">
          {attending === "yes" ? `See you in Mexico, ${submittedName}!` : `We’ll miss you, ${submittedName}.`}
        </h2>
        <p className="mx-auto mt-4 max-w-[34ch] text-[16px] leading-[1.6] font-medium text-ink-soft">
          {attending === "yes"
            ? "Thank you for letting us know. Next step: reserve your room with our booking coordinator."
            : "Thank you for letting us know — you’ll be with us in spirit."}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {attending === "yes" && (
            <Link href="/#stay" className="flex h-11 items-center rounded-[10px] btn-gold px-5 text-[15px] font-semibold">
              Where to stay
            </Link>
          )}
          <Link href="/" className="flex h-11 items-center px-3 text-[14px] font-medium text-ink underline decoration-gold underline-offset-4">
            Back to the website
          </Link>
        </div>
      </div>
    );
  }

  const pill =
    "relative flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border text-[15px] font-medium transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <fieldset aria-describedby={errors.attending ? "attending-error" : undefined}>
        <legend className="mb-3 text-[15px] font-medium text-ink">Will you attend?</legend>
        <div className="flex gap-3">
          {(["yes", "no"] as const).map((v) => {
            const selected = attending === v;
            return (
              <div key={v} className="flex flex-1">
                <input
                  ref={v === "yes" ? yesRef : undefined}
                  id={`attending-${v}`}
                  type="radio"
                  name="attending"
                  value={v}
                  checked={selected}
                  onChange={() => {
                    setAttending(v);
                    setErrors((e) => ({ ...e, attending: undefined }));
                  }}
                  className="peer sr-only"
                  required
                />
                <label
                  htmlFor={`attending-${v}`}
                  className={`${pill} ${
                    selected
                      ? "border-ink bg-ink text-white"
                      : `bg-pill text-ink hover:bg-sand ${errors.attending ? "border-clay" : "border-black/[0.06]"}`
                  }`}
                >
                  {selected && (
                    <CheckIcon size={15} weight="bold" aria-hidden="true" />
                  )}
                  {v === "yes" ? "Yes" : "No"}
                </label>
              </div>
            );
          })}
        </div>
        {errors.attending && (
          <p id="attending-error" className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-clay">
            <WarningCircleIcon size={15} aria-hidden="true" /> {errors.attending}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="name" className="block text-[13px] font-medium text-ink-soft">
          Full Name
        </label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
          }}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          maxLength={120}
          required
          className={`mt-1 block h-12 w-full border-0 border-b bg-transparent px-2 text-[17px] text-ink placeholder:text-ink-mute/60 focus:border-b-2 focus:border-ink focus:outline-none focus-visible:outline-none ${errors.name ? "border-clay" : "border-black/10"}`}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-clay">
            <WarningCircleIcon size={15} aria-hidden="true" /> {errors.name}
          </p>
        )}
      </div>

      {/* honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex h-11 min-w-[148px] items-center justify-center gap-2 rounded-[10px] btn-gold px-5 text-[15px] font-semibold disabled:cursor-wait disabled:opacity-80"
          >
            {status === "submitting" && (
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth="2" />
                <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            {status === "submitting" ? "Sending…" : "Submit RSVP"}
          </button>
        </div>
        <p role="alert" className="min-h-[1.25rem] text-right text-[14px] font-medium text-clay">
          {status === "error" ? message : ""}
        </p>
      </div>
    </form>
  );
}
