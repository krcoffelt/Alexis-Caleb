"use client";

import { CheckIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "done" | "error";
type Field = "attending" | "name" | "phone" | "guests";

const GUEST_OPTIONS = [1, 2, 3, 4] as const;

const pill =
  "relative flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border text-[15px] font-medium transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay";

function pillClass(selected: boolean, invalid: boolean) {
  return `${pill} ${
    selected
      ? "border-ink bg-ink text-white"
      : `bg-pill text-ink hover:bg-sand ${invalid ? "border-clay" : "border-black/[0.06]"}`
  }`;
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-clay">
      <WarningCircleIcon size={15} aria-hidden="true" /> {children}
    </p>
  );
}

const inputClass = (invalid: boolean) =>
  `mt-1 block h-12 w-full border-0 border-b bg-transparent px-2 text-[17px] text-ink placeholder:text-ink-mute/60 focus:border-b-2 focus:border-ink focus:outline-none focus-visible:outline-none ${invalid ? "border-clay" : "border-black/10"}`;

export function RsvpForm() {
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [guests, setGuests] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const refs = {
    attending: useRef<HTMLInputElement>(null),
    guests: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
  };
  const resultRef = useRef<HTMLDivElement>(null);
  const [submittedName, setSubmittedName] = useState("");

  const clear = (f: Field) => setErrors((e) => ({ ...e, [f]: undefined }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const next: Partial<Record<Field, string>> = {};
    if (!attending) next.attending = "Please choose Yes or No.";
    if (attending === "yes" && !guests) next.guests = "Please choose how many guests are attending.";
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a phone or WhatsApp number.";
    setErrors(next);
    const first = (["attending", "guests", "name", "phone"] as Field[]).find((f) => next[f]);
    if (first) return refs[first].current?.focus();

    setStatus("submitting");
    setMessage("");
    const company = (new FormData(e.currentTarget).get("company") as string) ?? "";
    try {
      // Netlify Forms: POST url-encoded fields to the static detection file.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "rsvp",
          attending,
          guests: attending === "yes" && guests ? String(guests) : "0",
          name: name.trim(),
          phone: phone.trim(),
          company,
        }).toString(),
      });
      if (!res.ok) throw new Error("We couldn’t send your RSVP. Please try again.");
      setSubmittedName(name.trim().split(" ")[0]);
      setStatus("done");
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof TypeError
          ? "We couldn’t reach the server. Check your connection and try again. Your RSVP has not been sent."
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
            ? `We’ve saved ${guests === 1 ? "1 guest" : `${guests} guests`}. Next step: reserve your room with our booking coordinator.`
            : "Thank you for letting us know. You’ll be with us in spirit."}
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

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <fieldset aria-describedby={errors.attending ? "attending-error" : undefined}>
        <legend className="mb-3 text-[15px] font-medium text-ink">Will you attend?</legend>
        <div className="flex gap-3">
          {(["yes", "no"] as const).map((v) => (
            <div key={v} className="flex flex-1">
              <input
                ref={v === "yes" ? refs.attending : undefined}
                id={`attending-${v}`}
                type="radio"
                name="attending"
                value={v}
                checked={attending === v}
                onChange={() => {
                  setAttending(v);
                  clear("attending");
                  if (v === "no") clear("guests");
                }}
                className="peer sr-only"
                required
              />
              <label htmlFor={`attending-${v}`} className={pillClass(attending === v, !!errors.attending)}>
                {attending === v && <CheckIcon size={15} weight="bold" aria-hidden="true" />}
                {v === "yes" ? "Yes" : "No"}
              </label>
            </div>
          ))}
        </div>
        <FieldError id="attending-error">{errors.attending}</FieldError>
      </fieldset>

      {attending === "yes" && (
        <fieldset aria-describedby={errors.guests ? "guests-error" : "guests-hint"}>
          <legend className="text-[15px] font-medium text-ink">Number of guests attending</legend>
          <p id="guests-hint" className="mt-1 mb-3 text-[13px] text-ink-mute">
            Including you.
          </p>
          <div className="flex gap-3">
            {GUEST_OPTIONS.map((n) => (
              <div key={n} className="flex flex-1">
                <input
                  ref={n === 1 ? refs.guests : undefined}
                  id={`guests-${n}`}
                  type="radio"
                  name="guests"
                  value={n}
                  checked={guests === n}
                  onChange={() => {
                    setGuests(n);
                    clear("guests");
                  }}
                  className="peer sr-only"
                />
                <label htmlFor={`guests-${n}`} className={pillClass(guests === n, !!errors.guests)}>
                  {n}
                </label>
              </div>
            ))}
          </div>
          <FieldError id="guests-error">{errors.guests}</FieldError>
        </fieldset>
      )}

      <div>
        <label htmlFor="name" className="block text-[13px] font-medium text-ink-soft">
          Full Name
        </label>
        <input
          ref={refs.name}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) clear("name");
          }}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          maxLength={120}
          required
          className={inputClass(!!errors.name)}
        />
        <FieldError id="name-error">{errors.name}</FieldError>
      </div>

      <div>
        <label htmlFor="phone" className="block text-[13px] font-medium text-ink-soft">
          Phone / WhatsApp
        </label>
        <input
          ref={refs.phone}
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+1 (212) 555-0123"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) clear("phone");
          }}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          maxLength={30}
          required
          className={inputClass(!!errors.phone)}
        />
        <FieldError id="phone-error">{errors.phone}</FieldError>
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
