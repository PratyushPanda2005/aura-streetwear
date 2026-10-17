"use client";

import { cn } from "@/lib/utils";

import { Diamonds } from "../ekchitra-v5/Diamonds";
import { FOOTER } from "../ekchitra-redesign/data";
import { CONTACT, SOCIAL } from "../ekchitra-v6/data";
import { DISPLAY, MONO, V7_NAV } from "./styles";
import { Arrow, useHyderabadTime } from "./ui";

/** A small analogue face showing Hyderabad time. */
function ClockFace({ time }: { time: string }) {
  const match = /(\d+):(\d+)/.exec(time);
  const hours = match ? Number(match[1]) % 12 : 0;
  const minutes = match ? Number(match[2]) : 0;
  const hourAngle = hours * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="size-10">
      <circle
        cx="20"
        cy="20"
        r="19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.6"
        transform={`rotate(${hourAngle} 20 20)`}
      />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="5"
        stroke="currentColor"
        strokeWidth="1"
        transform={`rotate(${minuteAngle} 20 20)`}
      />
    </svg>
  );
}

/**
 * Footer, after the reference: a closing line, the page links and the
 * Hyderabad time with its clock face across the top; the contact links in a
 * ruled row; then the name in white on a black cell beside a mint cell that
 * opens a conversation, and the copyright in mono.
 */
export function Footer() {
  const time = useHyderabadTime();

  return (
    <footer className="border-t border-(--e7-rule)">
      <div className="grid grid-cols-1 gap-y-10 px-5 pt-16 pb-12 lg:grid-cols-4 lg:gap-x-5 lg:pt-[5vw]">
        <p className="text-[40px] leading-[0.95] tracking-[-0.045em] lg:col-span-2 lg:text-[3.9vw]">
          Art is everywhere.
          <br />
          Come and notice.
        </p>
        <nav aria-label="Footer" className="flex flex-col gap-y-2 text-[16px]">
          {V7_NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="w-fit hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-start gap-x-4">
          <ClockFace time={time} />
          <div>
            <p className={MONO}>Hyderabad</p>
            <p className="mt-1 text-[16px]" suppressHydrationWarning>
              {time}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-y border-(--e7-rule) lg:grid-cols-4">
        {SOCIAL.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border-r border-(--e7-rule) px-5 py-4 text-[16px] hover:bg-(--e7-grey)"
          >
            {link.label}
            <Arrow rise />
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="relative flex min-h-[220px] items-end overflow-hidden bg-(--e7-ink) p-5 text-white lg:col-span-3 lg:min-h-[22vw]">
          <p className={cn(DISPLAY, "lg:text-[14.6vw]")}>{FOOTER.name}</p>
          <Diamonds
            shape="clusters"
            tint="sky"
            side="right"
            rows={26}
            className="absolute top-1/2 right-0 w-[44px] -translate-y-1/2 text-white/[0.3] lg:w-[56px]"
          />
        </div>
        <a
          href={CONTACT.href}
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-[220px] flex-col justify-between bg-(--e7-maroon) p-5 text-white"
        >
          <span className="text-[24px] leading-[1.05] tracking-[-0.035em]">
            Let&rsquo;s start
            <br />a conversation
          </span>
          <Arrow className="size-20 self-end transition-transform duration-300 group-hover:translate-x-2" />
        </a>
      </div>

      <div className="flex flex-col justify-between gap-y-2 px-5 py-4 sm:flex-row">
        <p className={MONO}>{FOOTER.copyright}</p>
        <p className={MONO}>Contemporary Indian art · Hyderabad</p>
      </div>
    </footer>
  );
}
