"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { LOGO } from "../ekchitra-redesign/data";
import { Diamonds } from "./Diamonds";
import { CAPS, DISPLAY, GUTTER, SANS, V5_HOME, V5_NAV } from "./shared";

/**
 * Scroll distance over which the large logo settles into the bar. It equals the
 * distance the logo travels, so the logo rises exactly with the page and the
 * text under it never catches up with it.
 */
export const SHRINK_PX = 84;

/**
 * Fixed white bar: the page links on the left, the logo in the middle and the
 * contact button on the right, all there from the start.
 *
 * On the homepage the logo begins large, hanging below the bar over the top of
 * the page, and as the page is scrolled it rises and shrinks into its place in
 * the middle of the bar, where it stays. The scroll amount (0–1) is written to
 * `--s` on the bar. Inner pages pass `compact`: the logo starts in the bar.
 * Further down the page the bar slides up out of the way while scrolling down
 * and comes back as soon as you scroll up.
 */
export function Header({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(compact);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const amount = compact ? 1 : Math.min(1, window.scrollY / SHRINK_PX);
      el.style.setProperty("--s", amount.toFixed(3));
      setSettled(amount > 0.85);
      // Past the hero entry, slide away on the way down and return on the way up.
      const y = window.scrollY;
      // Stay put through the hero so the logo is seen settling into the bar.
      const stayUntil = compact ? 120 : window.innerHeight * 0.9;
      if (amount < 1 || y < stayUntil) setHidden(false);
      else if (y > lastY.current + 2) setHidden(true);
      else if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [compact]);

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
          compact && "[--s:1]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          SANS,
        )}
      >
        <div
          className={cn(
            "relative flex h-[60px] items-center justify-between lg:h-[68px] lg:justify-end",
            GUTTER,
          )}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-controls="ek-v5-menu"
            onClick={() => setOpen(true)}
            className={cn(CAPS, "lg:hidden")}
          >
            Menu
          </button>
          <a
            href={V5_HOME}
            aria-label="EkChitra — home"
            className="absolute top-[19px] left-1/2 origin-top -translate-x-1/2 translate-y-[calc((1_-_var(--s,0))_*_64px)] scale-[calc(1_+_(1_-_var(--s,0))_*_1.7)] will-change-transform lg:top-[22px] lg:translate-y-[calc((1_-_var(--s,0))_*_84px)] lg:scale-[calc(1_+_(1_-_var(--s,0))_*_3.1)]"
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
            className="absolute top-1/2 left-5 hidden -translate-y-1/2 lg:block"
          >
            <ul className="flex gap-x-6">
              {V5_NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
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
        <Diamonds
          rows={21}
          shape="clusters"
          tint="navy"
          side="right"
          className="absolute right-0 bottom-10 w-[84px] text-(--k-ink)/10"
        />
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
