"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { EYEBROW, SANS } from "../../ekchitra-v5/shared";
import { BUTTON, GRID, SECTION_TITLE } from "../styles";
import { DETAILS, FAQ, REF_PICTURES, sendOnWhatsApp } from "./shared";

/** A field's label: small, over its box. */
const LABEL = "mb-2 block text-[12px]";

/** A boxed field: a hairline square, darkening on focus. */
const FIELD =
  "w-full border border-(--k-ink)/20 bg-white px-3 py-3 text-[15px] placeholder:text-(--k-ink)/60 focus:border-(--k-ink) focus:shadow-[inset_0_0_0_1px_var(--k-ink)] focus:outline-none";

const LINK = "hover:underline hover:underline-offset-4";

/**
 * Layout 01 — after orchid-template.framer.website/contact. A label and a
 * large two-line question over a hairline; then the gallery's details in a
 * hairline box on the left and a boxed form on the right; another hairline,
 * the questions people ask as an accordion between hairlines beside their
 * heading; and the reference's glass flower as a wide band to close.
 */
export function ContactStudio() {
  return (
    <div className={cn("bg-white pb-10 text-(--k-ink) lg:pb-12", SANS)}>
      {/* Heading. */}
      <div className={cn(GRID, "py-10 lg:py-12")}>
        <div className="col-span-4 lg:col-span-7">
          <p className={EYEBROW}>Get in touch</p>
          <h2 className="mt-3 text-[44px] leading-[1] tracking-[-0.045em] lg:text-[5vw]">
            Have a wall, a home or a collection in mind?
          </h2>
          <p className="mt-3 text-[17px] text-(--k-ink)/65">
            We’d love to hear about it.
          </p>
        </div>
      </div>

      {/* Details and form. */}
      <div
        className={cn(
          GRID,
          "gap-y-10 border-t border-(--k-ink)/15 pt-10 lg:pt-12",
        )}
      >
        <div className="col-span-4 h-fit border border-(--k-ink)/15 p-5 lg:p-6">
          <span
            aria-hidden="true"
            className="block aspect-[526/118] w-[120px] bg-(--k-ink) [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]"
          />
          <p className="mt-6">
            <a
              href={`tel:${DETAILS.phone.replace(/\s/g, "")}`}
              className={cn(LINK, "text-[15px]")}
            >
              {DETAILS.phone}
            </a>
          </p>
          <p className="mt-2">
            <a
              href={`mailto:${DETAILS.email}`}
              className={cn(LINK, "text-[20px] tracking-[-0.01em]")}
            >
              {DETAILS.email}
            </a>
          </p>
          <address className="mt-2 text-[14px] not-italic">
            {DETAILS.address.join(" ")}
          </address>
          <p className="mt-6 text-[13px] text-(--k-ink)/65">
            {DETAILS.hours.days}, {DETAILS.hours.time}
          </p>
        </div>

        <form
          onSubmit={sendOnWhatsApp}
          aria-label="Send us a message"
          className="col-span-4 lg:col-span-6 lg:col-start-7"
        >
          <p className="text-[26px] leading-[1.1] tracking-[-0.03em]">
            Send us a message
          </p>
          <div className="mt-6 grid gap-x-3 gap-y-6 sm:grid-cols-2">
            <label>
              <span className={LABEL}>Name</span>
              <input
                name="Name"
                autoComplete="name"
                required
                placeholder="Your name"
                className={FIELD}
              />
            </label>
            <label>
              <span className={LABEL}>Email</span>
              <input
                name="Email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={FIELD}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={LABEL}>Message</span>
              <textarea
                name="Message"
                required
                rows={6}
                placeholder="A wall, a room, an artist you love…"
                className={cn(FIELD, "resize-y")}
              />
            </label>
          </div>
          <button type="submit" className={cn(BUTTON, "mt-6")}>
            Send on WhatsApp
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>

      {/* Questions. */}
      <div
        className={cn(
          GRID,
          "mt-10 gap-y-6 border-t border-(--k-ink)/15 pt-10 lg:mt-12 lg:pt-12",
        )}
      >
        <div className="col-span-4 lg:col-span-5">
          <h2 className={cn(SECTION_TITLE, "max-w-[14ch]")}>
            Answers to the questions we hear most often.
          </h2>
          <p className="mt-3 text-[14px]">FAQ</p>
        </div>
        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          {FAQ.map((item) => (
            <details
              key={item.question}
              className="group border-t border-(--k-ink)/15 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-x-6 py-4 text-[15px] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-[18px] leading-none transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[56ch] pb-5 text-[14px] leading-[1.5] text-(--k-ink)/75">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* The closing band. */}
      <div className={cn(GRID, "mt-10 lg:mt-12")}>
        <div className="relative col-span-4 aspect-[3/2] overflow-hidden sm:aspect-[1122/246] lg:col-span-12">
          <Image
            src={REF_PICTURES.orchid.src}
            alt={REF_PICTURES.orchid.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
