"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { BUTTON, GRID } from "../styles";
import { DETAILS, REF_PICTURES, sendOnWhatsApp } from "./shared";

/** The two lines that head each half of the form. */
const LINE =
  "text-center text-[28px] leading-[1.1] tracking-[-0.03em] lg:text-[34px]";

/**
 * Layout 02 — after leeroy.ca/en/contact. White, with a white panel down
 * the middle columns; a band of the reference's blue silk gradient runs
 * across the page behind the panel, so the panel reads as a column cut out
 * of it. In the panel: a greeting, underlined fields, a second line over
 * the message, the house button, and the number and email at the foot.
 */
export function ContactSignal() {
  return (
    <section
      aria-label="Contact form"
      className={cn("relative bg-white text-(--k-ink)", SANS)}
    >
      {/* The band. */}
      <div className="absolute inset-x-0 top-[150px] h-[330px] overflow-hidden lg:top-[160px] lg:h-[340px]">
        <Image
          src={REF_PICTURES.leeroy.src}
          alt={REF_PICTURES.leeroy.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className={cn(GRID, "relative")}>
        <form
          onSubmit={sendOnWhatsApp}
          aria-label="Send us a message"
          className="col-span-4 bg-white px-5 py-10 lg:col-span-6 lg:col-start-4 lg:px-[12%] lg:py-12"
        >
          <p className={LINE}>Hello, nice to meet you.</p>
          <div className="mt-6 space-y-6">
            <Field label="What’s your name?">
              <input name="Name" autoComplete="name" className={INPUT} />
            </Field>
            <Field label="What’s your email?" required>
              <input
                name="Email"
                type="email"
                autoComplete="email"
                required
                className={INPUT}
              />
            </Field>
            <Field label="What’s your phone number?">
              <input
                name="Phone"
                type="tel"
                autoComplete="tel"
                className={INPUT}
              />
            </Field>
          </div>

          <p className={cn(LINE, "mt-10 lg:mt-12")}>
            If your wall could talk, what would it ask for?
          </p>
          <div className="mt-6">
            <Field label="Your message" required>
              <textarea
                name="Message"
                required
                rows={3}
                className={cn(INPUT, "resize-y")}
              />
            </Field>
          </div>

          <button type="submit" className={cn(BUTTON, "mx-auto mt-6")}>
            Send on WhatsApp
            <span aria-hidden="true">→</span>
          </button>

          <div className="mt-10 flex flex-col items-center gap-y-1 text-[15px] lg:mt-12">
            <a
              href={`tel:${DETAILS.phone.replace(/\s/g, "")}`}
              className="hover:underline hover:underline-offset-4"
            >
              {DETAILS.phone}
            </a>
            <a
              href={`mailto:${DETAILS.email}`}
              className="hover:underline hover:underline-offset-4"
            >
              {DETAILS.email}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

/** An underlined field: hairline under, darkening on focus. */
const INPUT =
  "mt-2 block w-full border-b border-(--k-ink)/50 bg-transparent pb-2 text-[16px] focus:border-(--k-ink) focus:shadow-[0_1px_0_0_var(--k-ink)] focus:outline-none";

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className={cn(CAPS, "text-[11px]")}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-(--k-maroon)">
            {" "}
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
