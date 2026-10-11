"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { LOGO } from "../ekchitra-redesign/data";
import { CAPS, GUTTER, SANS, SERIF, V4_HOME, V4_NAV } from "./shared";

/** Links shown beside the menu button on wide screens. */
const QUICK_LINKS = V4_NAV.slice(0, 3);
const CONTACT = V4_NAV[V4_NAV.length - 1];

/**
 * Fixed header: menu button and three links on the left, the logo in the centre
 * and a frosted contact button on the right. White over the hero; past it the
 * bar turns to the page colour, slides away on the way down and returns on the
 * way up. The menu button opens a full-screen list.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const pastHero = y > window.innerHeight - 80;
      setSolid(pastHero);
      setHidden(pastHero && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
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
        data-solid={solid}
        className={cn(
          "group fixed inset-x-0 top-0 z-40 text-white transition-[background-color,color,transform] duration-500 ease-out data-[solid=true]:bg-(--v-bone)/85 data-[solid=true]:text-(--v-ink) data-[solid=true]:backdrop-blur-[10px]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          SANS,
        )}
      >
        <div
          className={cn(
            "relative flex h-[72px] items-center justify-between",
            GUTTER,
          )}
        >
          <div className="flex items-center">
            <button
              type="button"
              aria-expanded={open}
              aria-controls="ek-v4-menu"
              onClick={() => setOpen(true)}
              className={cn("flex h-10 items-center gap-x-6", CAPS)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                <path
                  d="M4 7.5h16M4 12h16M4 16.5h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <span className="hidden sm:inline">Menu</span>
            </button>
            <nav
              aria-label="Primary navigation"
              className="ml-6 hidden border-l border-current/30 pl-6 lg:block"
            >
              <ul className="flex gap-x-6">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        CAPS,
                        "transition-opacity duration-300 hover:opacity-60",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <a
            href={V4_HOME}
            aria-label="EkChitra — home"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              preload
              className="h-6 w-auto invert transition-[filter] duration-500 group-data-[solid=true]:invert-0 lg:h-7"
            />
          </a>

          <a
            href={CONTACT.href}
            className={cn(
              CAPS,
              "flex h-10 items-center rounded-[4px] bg-black/10 px-4 backdrop-blur-[10px] transition-colors duration-300 group-data-[solid=true]:bg-(--v-ink)/10 hover:bg-(--v-maroon) hover:text-white group-data-[solid=true]:hover:bg-(--v-maroon) group-data-[solid=true]:hover:text-white lg:px-6",
            )}
          >
            {CONTACT.label}
          </a>
        </div>
      </header>

      <div
        id="ek-v4-menu"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-50 overflow-y-auto bg-(--v-bone) pb-12 text-(--v-ink)",
          SANS,
          GUTTER,
        )}
      >
        <div className="flex h-[72px] items-center">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={cn("flex h-10 items-center gap-x-6", CAPS)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            Close
          </button>
        </div>
        <ul className="mt-8 lg:mt-16">
          {V4_NAV.map((link, index) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="group/item flex items-baseline gap-x-4 py-1"
              >
                <span className="w-6 text-[12px] opacity-60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    SERIF,
                    "text-[44px] leading-[1.1] tracking-[-0.02em] transition-[padding] duration-500 ease-out group-hover/item:pl-4 group-hover/item:italic lg:text-[80px]",
                  )}
                >
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
