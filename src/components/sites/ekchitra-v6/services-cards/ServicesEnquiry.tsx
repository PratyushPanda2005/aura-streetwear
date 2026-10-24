"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { CONTACT } from "../data";
import { EASE } from "../motion";
import { BUTTON, GRID } from "../styles";
import { CTA_PHOTOS, CTA_SERVICES, MUTED, pad } from "./shared";

/** A ruled field, after the underlined inputs of a printed form. */
const FIELD =
  "mt-2 w-full border-b border-(--k-ink)/40 bg-transparent pb-2 text-[17px] outline-none transition-colors duration-300 placeholder:text-(--k-ink)/60 focus:border-(--k-ink)";

/**
 * 11 — Enquiry, after the ruled form cards on cta.gallery (Sapphicindex): on
 * sand, the two services as a pair of choice cards on the left — the chosen
 * one in black with its photograph — and a short ruled form on the right:
 * a name and a few words about the space or collection. Sending opens the
 * gallery's WhatsApp with the message already written.
 */
export function ServicesEnquiry() {
  const [choice, setChoice] = useState(0);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const id = useId();
  const service = CTA_SERVICES[choice];

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lines = [
      `Hello EkChitra, I'm interested in ${service.title.toLowerCase()}.`,
      note.trim(),
      name.trim() && `— ${name.trim()}`,
    ].filter(Boolean);
    const url = `${CONTACT.href}?text=${encodeURIComponent(lines.join("\n\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      aria-label="Services"
      className={cn("bg-(--k-sand) py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      <InView>
        <form onSubmit={send} className={cn(GRID, "gap-y-10")}>
          <fieldset className="ek6-rise col-span-4 lg:col-span-6">
            <legend className={cn(CAPS, "mb-4 text-[11px]", MUTED)}>
              I’d like help with
            </legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
              {CTA_SERVICES.map((item, index) => {
                const on = choice === index;
                const photo = CTA_PHOTOS[item.key];
                return (
                  <label
                    key={item.key}
                    className={cn(
                      "group relative flex min-h-[300px] cursor-pointer flex-col overflow-hidden border p-5 transition-colors duration-500 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-(--k-ink) lg:min-h-[380px]",
                      EASE,
                      on
                        ? "border-(--k-ink) bg-(--k-ink) text-white"
                        : "border-(--k-ink)/25 bg-white hover:border-(--k-ink)",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${id}-service`}
                      value={item.key}
                      checked={on}
                      onChange={() => setChoice(index)}
                      className="sr-only"
                    />
                    {/* The chosen card's photograph, faint behind its words. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        EASE,
                        on ? "opacity-35" : "opacity-0",
                      )}
                    >
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className={cn("object-cover", photo.position)}
                      />
                    </span>
                    <span className="relative flex items-baseline justify-between gap-x-3">
                      <span className="text-[13px] tabular-nums">
                        {pad(index + 1)}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-3 rounded-full border transition-colors duration-300",
                          on ? "border-white bg-white" : "border-(--k-ink)/50",
                        )}
                      />
                    </span>
                    <span className="relative mt-auto">
                      <span className="block text-[30px] leading-[1] tracking-[-0.04em] lg:text-[36px]">
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "mt-2 block text-[14px]",
                          on ? "text-white/80" : MUTED,
                        )}
                      >
                        {item.eyebrow}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="ek6-rise col-span-4 flex flex-col [--delay:150ms] lg:col-span-5 lg:col-start-8">
            <p className="text-[19px] leading-[1.4] tracking-[-0.01em] lg:text-[22px]">
              {service.body}
            </p>
            <label className="mt-10 block">
              <span className={cn(CAPS, "text-[11px]", MUTED)}>Your name</span>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className={FIELD}
              />
            </label>
            <label className="mt-8 block">
              <span className={cn(CAPS, "text-[11px]", MUTED)}>
                {service.key === "bespoke"
                  ? "About the space"
                  : "About your collection"}
              </span>
              <textarea
                rows={3}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={
                  service.key === "bespoke"
                    ? "A home, office or hotel — the room, the brief, the timeline"
                    : "What you have, what you’re drawn to, where you’d like to begin"
                }
                className={cn(FIELD, "resize-none leading-[1.45]")}
              />
            </label>
            <button
              type="submit"
              className={cn(BUTTON, "mt-10 whitespace-nowrap sm:w-[260px]")}
            >
              Continue on WhatsApp
              <span aria-hidden="true">→</span>
            </button>
            <p className={cn("mt-3 text-[13px]", MUTED)}>
              Opens WhatsApp with your message written; nothing is sent until
              you press send there.
            </p>
          </div>
        </form>
      </InView>
    </section>
  );
}
