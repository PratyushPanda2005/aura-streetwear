import Image from "next/image";

import { cn } from "@/lib/utils";

import { FOOTER, LOGO } from "../ekchitra-redesign/data";
import { BODY, GUTTER, SANS, V4_HOME, V4_NAV } from "./shared";

const LINK = "transition-opacity duration-300 hover:opacity-60";

const SMALL = "text-[12px] leading-4 opacity-60";

/**
 * Footer on the page colour: a numbered sitemap, a hairline, then contact and
 * social links beside the logo, and a closing line.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className={cn("pt-24 pb-6 lg:pt-[240px]", GUTTER, SANS)}
    >
      <p className={cn(BODY, "opacity-60")}>Sitemap</p>
      <ul className="mt-12 grid grid-cols-2 gap-y-3 sm:grid-cols-3 lg:w-2/3 lg:grid-cols-4">
        {V4_NAV.map((link, index) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={cn(BODY, LINK, "flex items-baseline gap-x-3")}
            >
              <span className="w-4 text-[12px] opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-y-12 border-t border-(--v-ink) pt-12 lg:grid-cols-6">
        <div>
          <p className={SMALL}>{FOOTER.location.title}</p>
          <p className={cn(BODY, "mt-6 max-w-[200px]")}>
            {FOOTER.location.note}
          </p>
        </div>
        <div>
          <p className={SMALL}>Socials</p>
          <ul className={cn(BODY, "mt-6")}>
            {FOOTER.social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a
          href={V4_HOME}
          aria-label={`${FOOTER.name} — home`}
          className="lg:col-span-4 lg:justify-self-end"
        >
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={LOGO.width}
            height={LOGO.height}
            className="h-12 w-auto opacity-70 lg:h-20"
          />
        </a>
      </div>

      <div
        className={cn(
          BODY,
          "mt-20 flex flex-wrap justify-between gap-x-6 gap-y-2 opacity-60 lg:mt-[120px]",
        )}
      >
        <p>{FOOTER.tagline}</p>
        <p>{FOOTER.copyright}</p>
      </div>
    </footer>
  );
}
