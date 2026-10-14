"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { LOGO } from "../ekchitra-redesign/data";
import { Diamonds } from "./Diamonds";
import { MENU_PANELS, type MenuLink } from "./menu-data";
import { CAPS, DISPLAY, GUTTER, SANS, V5_HOME, V5_NAV } from "./shared";

/**
 * Scroll distance over which the large logo settles into the bar. It equals the
 * distance the logo travels, so the logo rises exactly with the page and the
 * text under it never catches up with it.
 */
export const SHRINK_PX = 84;

/** Height of the bar on large screens, px. */
const BAR_PX = 68;

/** kettal.com's menu curve. */
const EASE = "ease-[cubic-bezier(0.785,0.135,0.15,0.86)]";

/**
 * A label with kettal.com's underline: a 1px rule that draws in from the left
 * on hover (or while `on`) and draws out to the right.
 */
function Underlined({ children, on }: { children: ReactNode; on?: boolean }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 -bottom-px h-px bg-current transition-transform duration-500",
          on
            ? "origin-left scale-x-100"
            : "origin-right scale-x-0 group-hover/u:origin-left group-hover/u:scale-x-100 group-focus-visible/u:origin-left group-focus-visible/u:scale-x-100",
        )}
      />
    </span>
  );
}

function PanelLink({ link }: { link: MenuLink }) {
  return (
    <a
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group/u block w-fit py-1 text-[15px] leading-[21px]"
    >
      <Underlined>{link.label}</Underlined>
    </a>
  );
}

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
 *
 * On large screens, hovering a link opens its menu the way kettal.com's does:
 * the link stays underlined, the white of the bar grows down to fit the menu,
 * the page behind dims, and the menu's columns and picture fade in once the
 * white has nearly arrived. Moving between links re-sizes the white to the new
 * menu; leaving the header closes it. While a menu is open the large logo
 * glides up into the bar, out of the menu's way.
 */
export function Header({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [settled, setSettled] = useState(compact);
  const [hidden, setHidden] = useState(false);
  // True for a moment after a menu opens or closes, so the logo glides
  // instead of jumping; otherwise it follows the scroll directly.
  const [gliding, setGliding] = useState(false);
  const glide = useRef(0);
  const lastY = useRef(0);
  const ref = useRef<HTMLElement>(null);
  const panels = useRef(new Map<string, HTMLDivElement>());

  const showMenu = (label: string | null) => {
    if (label === menu) return;
    if (!label || !menu) {
      setGliding(true);
      window.clearTimeout(glide.current);
      glide.current = window.setTimeout(() => setGliding(false), 900);
    }
    setMenu(label);
  };

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

  useEffect(() => () => window.clearTimeout(glide.current), []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // The white grows to the open menu's height.
  useEffect(() => {
    const panel = menu ? panels.current.get(menu) : undefined;
    const height = BAR_PX + (panel?.offsetHeight ?? 0);
    ref.current?.style.setProperty("--menu-h", `${height}px`);
  }, [menu]);

  return (
    <>
      {/* Dims the page while a menu is open. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-0 z-30 hidden bg-black transition-opacity duration-[600ms] lg:block",
          menu ? "opacity-45" : "opacity-0",
        )}
      />

      <header
        ref={ref}
        data-settled={settled}
        onMouseLeave={() => showMenu(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape") showMenu(null);
        }}
        className={cn(
          "group fixed inset-x-0 top-0 z-40 text-(--k-ink) transition-transform duration-500 ease-out",
          compact && "[--s:1]",
          hidden && !open && !menu ? "-translate-y-full" : "translate-y-0",
          SANS,
        )}
      >
        {/* The white: the bar's height, or the open menu's. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-[60px] bg-white transition-[height] duration-[800ms] lg:h-(--menu-h,68px)",
            EASE,
          )}
        />

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
            onMouseEnter={() => showMenu(null)}
            className={cn(
              "absolute top-[19px] left-1/2 origin-top -translate-x-1/2 translate-y-[calc((1_-_var(--s,0))_*_64px)] scale-[calc(1_+_(1_-_var(--s,0))_*_1.3)] will-change-transform lg:top-[22px] lg:translate-y-[calc((1_-_var(--s,0))_*_84px)] lg:scale-[calc(1_+_(1_-_var(--s,0))_*_2.2)]",
              menu && "lg:[--s:1]",
              gliding &&
                cn("transition-[translate,scale] duration-[800ms]", EASE),
            )}
          >
            <span className={cn("block", !compact && "ek5-rise [--d:100ms]")}>
              <Image
                src={LOGO.src}
                alt={LOGO.alt}
                width={LOGO.width}
                height={LOGO.height}
                preload
                sizes="700px"
                className="h-[22px] w-auto lg:h-6"
              />
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="absolute top-1/2 left-5 hidden -translate-y-1/2 lg:block"
          >
            <ul className="flex gap-x-6">
              {V5_NAV.map((link) => {
                const panel = MENU_PANELS.some(
                  (item) => item.for === link.label,
                );
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-haspopup={panel || undefined}
                      aria-expanded={panel ? menu === link.label : undefined}
                      onMouseEnter={() => showMenu(panel ? link.label : null)}
                      onFocus={() => showMenu(panel ? link.label : null)}
                      className="group/u block py-2 text-[14px] tracking-[-0.01em]"
                    >
                      <Underlined on={menu === link.label}>
                        {link.label}
                      </Underlined>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href="#contact"
            onMouseEnter={() => showMenu(null)}
            onFocus={() => showMenu(null)}
            className={cn(
              CAPS,
              "hidden h-9 items-center border border-(--k-ink) px-5 transition-colors duration-300 hover:border-(--k-maroon) hover:bg-(--k-maroon) hover:text-white lg:flex",
            )}
          >
            Contact
          </a>
        </div>

        {/* Menus, large screens only. Closed ones stay laid out (invisible)
            so their height can be measured. */}
        <div className="relative hidden lg:block">
          {MENU_PANELS.map((panel) => {
            const active = menu === panel.for;
            return (
              <div
                key={panel.for}
                ref={(el) => {
                  if (el) panels.current.set(panel.for, el);
                  else panels.current.delete(panel.for);
                }}
                className={cn(
                  "absolute inset-x-0 top-0 flex justify-between px-5 pt-[34px] pb-[100px] transition-[opacity,visibility]",
                  active
                    ? "visible opacity-100 delay-[400ms] duration-[600ms]"
                    : "invisible opacity-0 duration-200",
                )}
              >
                <div className="flex gap-x-[72px]">
                  {panel.columns.map((column, index) => (
                    <div key={`${column.title}-${index}`}>
                      <p
                        className={cn(
                          CAPS,
                          "min-h-4 text-[11px] text-(--k-ink)/60",
                        )}
                      >
                        {column.title}
                      </p>
                      <ul className="mt-[7px]">
                        {column.links.map((link) => (
                          <li key={link.label}>
                            <PanelLink link={link} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <a
                  href={panel.card.href}
                  className="group/u relative block aspect-[346/231] w-[24%] max-w-[346px] shrink-0 overflow-hidden bg-(--k-sand)"
                >
                  <Image
                    src={panel.card.image}
                    alt={panel.card.alt}
                    fill
                    sizes="346px"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/u:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent to-50%" />
                  <span
                    className={cn(
                      CAPS,
                      "absolute bottom-4 left-4 text-[11px] text-white",
                    )}
                  >
                    <Underlined>{panel.card.label}</Underlined>
                  </span>
                </a>
              </div>
            );
          })}
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
          tint="sky"
          side="right"
          className="absolute right-0 bottom-10 w-[84px] text-(--k-navy)"
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
