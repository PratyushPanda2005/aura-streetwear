"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { LOGO, SECONDARY_NAV } from "../ekchitra-redesign/data";
import {
  GUTTER,
  LABEL,
  LabelLink,
  SANS,
  SERIF,
  V3_HOME,
  V3_NAV,
} from "./shared";

/**
 * Fixed header on frosted glass: logo on the left, links in the centre, contact
 * on the right. Small screens get a menu button and a full-screen list.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const contact = SECONDARY_NAV[0];

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 bg-white/40 text-(--ek-ink) backdrop-blur-[10px]",
          SANS,
        )}
      >
        <div
          className={cn(
            "relative flex h-16 items-center justify-between lg:h-20",
            GUTTER,
          )}
        >
          <a href={V3_HOME} aria-label="EkChitra — home">
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              preload
              className="h-6 w-auto lg:h-[26px]"
            />
          </a>

          <nav
            aria-label="Primary navigation"
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <ul className="flex gap-x-9">
              {V3_NAV.map((link) => (
                <li key={link.label}>
                  <LabelLink href={link.href}>{link.label}</LabelLink>
                </li>
              ))}
            </ul>
          </nav>

          <LabelLink href={contact.href} className="hidden lg:inline-block">
            {contact.label}
          </LabelLink>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="ek-v3-menu"
            onClick={() => setOpen(true)}
            className={cn(LABEL, "lg:hidden")}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        id="ek-v3-menu"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-50 overflow-y-auto bg-(--ek-ink) pb-12 text-(--ek-paper) lg:hidden",
          SANS,
          GUTTER,
        )}
      >
        <div className="flex h-16 items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={LABEL}
          >
            Close
          </button>
        </div>
        <ul className={cn("mt-6 text-[44px] leading-[1.2]", SERIF)}>
          {[...V3_NAV, contact].map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
