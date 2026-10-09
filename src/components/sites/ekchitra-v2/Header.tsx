"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { LOGO, ROUTES, SECONDARY_NAV } from "../ekchitra-redesign/data";
import { CtaLink, DISPLAY, SANS, V2_HOME, V2_NAV } from "./shared";

/** Scroll distance after which scrolling down tucks the bar away. */
const HIDE_AFTER = 240;

/**
 * Floating header: a white bar set in from the edges of the screen, with the
 * logo on the left, the links in the centre and search and contact on the right.
 * Each link fills with dark red from the bottom on hover. The bar slides away when the
 * page scrolls down and returns as soon as it scrolls up.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const contact = SECONDARY_NAV[0];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > HIDE_AFTER) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-3 top-3 z-40 bg-(--ek-paper) text-(--ek-ink) shadow-[0_10px_40px_-12px_rgb(0_0_0/0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:inset-x-10 lg:top-5",
          SANS,
          hidden && !open ? "-translate-y-[calc(100%+24px)]" : "translate-y-0",
        )}
      >
        <div className="flex h-[60px] items-stretch justify-between pl-5 lg:h-[68px] lg:pl-7">
          <a
            href={V2_HOME}
            aria-label="EkChitra — home"
            className="flex items-center"
          >
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              preload
              className="h-6 w-auto lg:h-7"
            />
          </a>

          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex h-full text-[15px] font-medium">
              {V2_NAV.map((link) => (
                <li key={link.label} className="flex">
                  <a
                    href={link.href}
                    className="flex items-center bg-linear-to-t from-(--ek-maroon) to-(--ek-maroon) bg-[length:100%_0%] bg-bottom bg-no-repeat px-5 transition-[background-size,color] duration-300 ease-out hover:bg-[length:100%_100%] hover:text-(--ek-paper) focus-visible:bg-[length:100%_100%] focus-visible:text-(--ek-paper)"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center">
            <a
              href={ROUTES.artworks}
              aria-label="Search artworks"
              className="flex h-full items-center px-4 transition-colors duration-200 hover:text-(--ek-maroon)"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-[22px]"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="m15.5 15.5 5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </a>
            <CtaLink
              size="sm"
              href={contact.href}
              className="mr-[14px] hidden lg:inline-flex"
            >
              {contact.label}
            </CtaLink>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="ek-v2-menu"
              onClick={() => setOpen(true)}
              className="flex h-full items-center gap-x-2 bg-(--ek-ink) px-5 text-[15px] font-medium text-(--ek-paper) lg:hidden"
            >
              Menu
              <svg
                viewBox="0 0 20 14"
                aria-hidden="true"
                className="h-[14px] w-5"
              >
                <path
                  d="M0 1h20M0 7h20M0 13h20"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu — small screens */}
      <div
        id="ek-v2-menu"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-50 overflow-y-auto bg-(--ek-ink) px-5 pb-12 text-(--ek-paper) lg:hidden",
          SANS,
        )}
      >
        <div className="flex h-[84px] items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center gap-x-2 text-[15px] font-medium"
          >
            Close
            <svg viewBox="0 0 18 18" aria-hidden="true" className="size-[18px]">
              <path
                d="m2 2 14 14M16 2 2 16"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
        <ul className={cn("text-[48px] leading-[1.2]", DISPLAY)}>
          {[...V2_NAV, contact].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="transition-colors duration-200 hover:text-(--ek-sky)"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
