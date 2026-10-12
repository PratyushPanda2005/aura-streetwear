import Image from "next/image";

import { cn } from "@/lib/utils";

import { FOOTER, LOGO } from "../ekchitra-redesign/data";
import { Chars } from "./Chars";
import { BODY, CAPS, GUTTER, SANS, V5_HOME, V5_NAV } from "./shared";

const LINK = "transition-opacity duration-300 hover:opacity-60";

/**
 * Footer in the brand black: the logo and tagline on the left, then columns for the pages,
 * the gallery's location and its social links, and a closing line.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className={cn(
        "bg-(--k-ink) pt-12 pb-6 text-(--k-sand) lg:pt-16",
        GUTTER,
        SANS,
      )}
    >
      <div className="grid gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <a href={V5_HOME} aria-label={`${FOOTER.name} — home`}>
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              className="h-9 w-auto invert lg:h-11"
            />
          </a>
          <p className={cn(BODY, "mt-8 max-w-[340px] opacity-70")}>
            <Chars text={FOOTER.tagline} />
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className={CAPS}>Explore</p>
          <ul className={cn(BODY, "mt-5 space-y-1")}>
            {V5_NAV.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={LINK}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className={CAPS}>{FOOTER.location.title}</p>
          <p className={cn(BODY, "mt-5 max-w-[200px]")}>
            {FOOTER.location.note}
          </p>
        </div>
        <div className="lg:col-span-2">
          <p className={CAPS}>Social</p>
          <ul className={cn(BODY, "mt-5 space-y-1")}>
            {FOOTER.social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-16 text-[12px] opacity-50 lg:mt-24">
        {FOOTER.copyright}
      </p>
    </footer>
  );
}
