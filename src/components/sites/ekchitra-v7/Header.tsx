"use client";

import { cn } from "@/lib/utils";

import { CONTACT } from "../ekchitra-v6/data";
import { MONO, V7_HOME, V7_NAV } from "./styles";
import { Arrow, useHyderabadTime } from "./ui";

/**
 * The top bar, after aspensearch.com: 61px tall and ruled underneath, over
 * the same four columns as the page. The brand mark sits in a black square;
 * the Hyderabad time runs beside it; the page links sit across the third
 * column; and the fourth column is a black Contact cell with an arrow.
 */
export function Header() {
  const time = useHyderabadTime();

  return (
    <header className="sticky top-0 z-50 grid h-(--e7-header) grid-cols-[61px_1fr_auto] border-b border-(--e7-rule) bg-white lg:grid-cols-4">
      <div className="flex items-stretch lg:col-span-2">
        <a
          href={V7_HOME}
          aria-label="EkChitra — home"
          className="flex w-[61px] shrink-0 items-center justify-center bg-(--e7-ink)"
        >
          <span aria-hidden="true" className="size-4 rotate-45 bg-white" />
        </a>
        <p
          className={cn(MONO, "hidden items-center px-5 sm:flex")}
          suppressHydrationWarning
        >
          {time} Hyderabad
        </p>
      </div>
      <nav className="hidden items-center gap-x-5 px-5 text-[15px] lg:flex">
        {V7_NAV.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition-opacity hover:opacity-60"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href={CONTACT.href}
        target="_blank"
        rel="noreferrer"
        className="col-start-3 flex items-center justify-between gap-x-10 bg-(--e7-ink) px-5 text-[15px] text-white lg:col-start-4"
      >
        Contact
        <Arrow />
      </a>
    </header>
  );
}
