"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { LOGO } from "../ekchitra-redesign/data";
import { CAPS, DISPLAY, GUTTER, SANS, V5_HOME, V5_NAV } from "./shared";

/** Share of the screen height scrolled while the large logo settles into the bar. */
export const SHRINK_SCREENS = 0.5;

/**
 * Fixed white bar. At the top of the page the logo is shown very large and the
 * links are hidden; scrolling shrinks the logo into the bar's left corner and
 * fades the links in. The scroll amount (0–1) is written to `--s` on the bar.
 * Further down the page the bar slides up out of the way while scrolling down
 * and comes back as soon as you scroll up.
 */
export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const amount = Math.min(
        1,
        window.scrollY / (window.innerHeight * SHRINK_SCREENS),
      );
      el.style.setProperty("--s", amount.toFixed(3));
      setSettled(amount > 0.85);
      // Past the hero entry, slide away on the way down and return on the way up.
      const y = window.scrollY;
      if (amount < 1) setHidden(false);
      else if (y > lastY.current + 2) setHidden(true);
      else if (y < lastY.current - 2) setHidden(false);
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
        ref={ref}
        data-settled={settled}
        className={cn(
          "group fixed inset-x-0 top-0 z-40 bg-white text-(--k-ink) transition-transform duration-500 ease-out",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          SANS,
        )}
      >
        <div
          className={cn(
            "relative flex h-[60px] items-center justify-end lg:h-[68px]",
            GUTTER,
          )}
        >
          <a
            href={V5_HOME}
            aria-label="EkChitra — home"
            className="absolute top-[19px] left-4 origin-top-left scale-[calc(1_+_(1_-_var(--s,0))_*_2.2)] will-change-transform lg:top-[22px] lg:left-5 lg:scale-[calc(1_+_(1_-_var(--s,0))_*_5.2)]"
          >
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              preload
              sizes="700px"
              className="h-[22px] w-auto lg:h-6"
            />
          </a>

          <nav
            aria-label="Primary navigation"
            className="absolute top-1/2 left-[190px] hidden -translate-y-1/2 opacity-0 transition-opacity duration-500 group-data-[settled=true]:opacity-100 lg:block"
          >
            <ul className="flex gap-x-6">
              {V5_NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    tabIndex={settled ? undefined : -1}
                    className="text-[14px] tracking-[-0.01em] transition-colors duration-300 hover:text-(--k-maroon)"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#contact"
            className={cn(
              CAPS,
              "hidden h-9 items-center border border-(--k-ink) px-5 transition-colors duration-300 hover:border-(--k-maroon) hover:bg-(--k-maroon) hover:text-white lg:flex",
            )}
          >
            Contact
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="ek-v5-menu"
            onClick={() => setOpen(true)}
            className={cn(CAPS, "lg:hidden")}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        id="ek-v5-menu"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-50 overflow-y-auto bg-white pb-12 text-(--k-ink) lg:hidden",
          SANS,
          GUTTER,
        )}
      >
        <div className="flex h-[60px] items-center justify-end">
          <button type="button" onClick={() => setOpen(false)} className={CAPS}>
            Close
          </button>
        </div>
        <ul className={cn("mt-8 text-[40px] leading-[1.25]", DISPLAY)}>
          {[...V5_NAV, { label: "Contact", href: "#contact" }].map((link) => (
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
