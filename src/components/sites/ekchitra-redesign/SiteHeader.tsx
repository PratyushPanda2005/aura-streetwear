"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { LOGO, PRIMARY_NAV, ROUTES, SECONDARY_NAV } from "./data";
import { FONT } from "./design-system";

/**
 * Nav link: small uppercase label with a hairline underline that draws in from
 * the left on hover and leaves to the right. `aria-current` keeps it drawn.
 */
const NAV_LINK =
  "relative inline-block pb-[5px] uppercase after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 aria-[current=page]:after:scale-x-100";

/** Scroll distance after which a downward scroll slides the header away. */
const HIDE_AFTER = 140;

/**
 * Fixed two-tier header that sits transparent over the hero.
 *
 * - At the top of the page: transparent, white type.
 * - Scrolling down past `HIDE_AFTER`: slides out of view.
 * - Scrolling back up: returns on a solid white ground with dark type.
 * - Hovering the primary nav at the top also switches it to the solid state.
 *
 * Pages without a hero photograph pass `alwaysSolid` so the header is readable
 * from the first pixel.
 */
export function SiteHeader({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [scrolledUp, setScrolledUp] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      if (y <= 0) {
        setHidden(false);
        setScrolledUp(false);
      } else if (goingDown) {
        if (y > HIDE_AFTER) setHidden(true);
      } else if (y < lastY.current) {
        setHidden(false);
        setScrolledUp(true);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const solid = alwaysSolid || scrolledUp || navHover || menuOpen;

  return (
    <header
      data-solid={solid}
      className={cn(
        "group fixed inset-x-0 top-0 z-[11] h-[112px] transition-[background-color,transform] duration-300 ease-out min-[600px]:h-[128px] min-[1200px]:h-[140px]",
        FONT.sans,
        solid ? "bg-white" : "bg-white/0",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="relative h-full px-[17px] lg:px-[69px]">
        <div className="relative h-full">
          <a
            href={ROUTES.home}
            aria-label="EkChitra — home"
            className="absolute top-[46px] left-0 block min-[600px]:top-[53px] min-[1200px]:top-[58px]"
          >
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              preload
              className="h-5 w-auto invert transition-[filter] delay-[250ms] duration-[250ms] group-data-[solid=true]:invert-0 min-[600px]:h-[22px] min-[1200px]:h-6"
            />
          </a>

          {/* Secondary navigation — top row */}
          <nav
            aria-label="Secondary navigation"
            className="absolute top-20 right-0 min-[600px]:top-5"
          >
            <ul className="flex text-[12px] leading-6 tracking-[1.4px] min-[1200px]:text-[12.5px]">
              {SECONDARY_NAV.map((link) => (
                <li key={link.label} className="ml-4 min-[1200px]:ml-8">
                  <a
                    href={link.href}
                    className={cn(
                      NAV_LINK,
                      "text-white/75 transition-colors duration-300 ease-out group-data-[solid=true]:text-[#767676] hover:text-white group-data-[solid=true]:hover:text-[#1a1a1a]",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Primary navigation — bottom row */}
          <nav
            aria-label="Primary navigation"
            className="absolute top-[88px] right-0 hidden min-[600px]:block min-[1200px]:top-[92px]"
          >
            <ul
              onMouseEnter={() => setNavHover(true)}
              onMouseLeave={() => setNavHover(false)}
              className="flex text-[13px] leading-6 tracking-[1.4px] min-[1200px]:text-[14px] min-[1200px]:tracking-[1.6px]"
            >
              {PRIMARY_NAV.map((link) => (
                <li key={link.label} className="ml-5 min-[1200px]:ml-9">
                  <a
                    href={link.href}
                    aria-current={link.href === pathname ? "page" : undefined}
                    className={cn(
                      NAV_LINK,
                      "text-white transition-colors duration-300 ease-out group-data-[solid=true]:text-[#1a1a1a]",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu trigger */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="ekchitra-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="absolute top-4 right-0 flex items-center gap-2 text-[12px] leading-6 tracking-[1.4px] text-white uppercase transition-colors duration-[250ms] group-data-[solid=true]:text-[#1a1a1a] min-[600px]:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              ) : (
                <path
                  d="M4 7.5h16M4 12h16M4 16.5h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="ekchitra-mobile-menu"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-112px)] overflow-y-auto border-t border-[#e6e6e6] bg-white px-[17px] py-6 min-[600px]:hidden"
      >
        <ul className={cn("text-[27px] leading-9 uppercase", FONT.serif)}>
          {[...PRIMARY_NAV, ...SECONDARY_NAV].map((link) => (
            <li key={link.label} className="border-b border-[#e6e6e6]">
              <a
                href={link.href}
                aria-current={link.href === pathname ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-[#1a1a1a] transition-colors duration-150 ease-in-out hover:text-[#b50938] aria-[current=page]:text-[#b50938]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
