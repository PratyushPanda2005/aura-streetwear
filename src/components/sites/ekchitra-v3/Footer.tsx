import Image from "next/image";

import { cn } from "@/lib/utils";

import { FOOTER, LOGO } from "../ekchitra-redesign/data";
import { GUTTER, LABEL, SANS, V3_HOME, V3_NAV } from "./shared";

const LINK = cn(
  LABEL,
  "block leading-[22px] transition-colors duration-200 hover:text-(--ek-sky)",
);

/**
 * Footer in two bands: follow links and a contact call on navy, then the logo
 * with columns of links on dark red.
 */
export function Footer() {
  const contact =
    FOOTER.social.find((link) => link.label === "WhatsApp") ?? FOOTER.social[0];

  return (
    <footer id="contact" className={cn("text-(--ek-paper)", SANS)}>
      <div
        className={cn(
          "grid gap-y-12 bg-(--ek-navy) py-[72px] lg:grid-cols-2 lg:py-[110px]",
          GUTTER,
        )}
      >
        <div>
          <h3 className={LABEL}>Follow</h3>
          <ul className="mt-9 flex gap-x-8">
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
        <div>
          <h3 className={LABEL}>Get in touch</h3>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-[341px] text-[14px] leading-4 text-(--ek-paper)/70 uppercase">
              {FOOTER.tagline}
            </p>
            <a
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-[54px] w-full max-w-[283px] items-center justify-center border border-(--ek-paper)/60 text-[15px] leading-5 font-medium uppercase transition-colors duration-200 hover:bg-(--ek-paper) hover:text-(--ek-ink)"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid gap-y-10 bg-(--ek-maroon) py-[72px] lg:grid-cols-4 lg:gap-x-6 lg:py-[96px]",
          GUTTER,
        )}
      >
        <a
          href={V3_HOME}
          aria-label={`${FOOTER.name} — home`}
          className="self-start"
        >
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={LOGO.width}
            height={LOGO.height}
            className="h-7 w-auto invert"
          />
        </a>
        <div>
          <p className={cn(LABEL, "leading-[22px]")}>{FOOTER.location.title}</p>
          <p className="mt-1 max-w-[240px] text-[13px] leading-[18px] text-(--ek-paper)/70 uppercase">
            {FOOTER.location.note}
          </p>
        </div>
        <ul>
          {V3_NAV.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={LINK}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <a
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              Contact
            </a>
          </li>
          <li className={cn(LABEL, "leading-[22px] text-(--ek-paper)/70")}>
            {FOOTER.copyright}
          </li>
        </ul>
      </div>
    </footer>
  );
}
