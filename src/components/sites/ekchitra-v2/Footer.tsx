import Image from "next/image";

import { cn } from "@/lib/utils";

import { FOOTER, LOGO } from "../ekchitra-redesign/data";
import { DISPLAY, CtaLink, SANS, V2_HOME, V2_NAV } from "./shared";

const COLUMN_TITLE =
  "flex items-center justify-between border-b border-(--ek-paper) pb-[6px] text-[22px] leading-[33px]";

function DownArrow() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" className="size-[14px]">
      <path
        d="M7 1v11M2.5 7.5 7 12l4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * Footer on a deep colour: a large line with an action, the logo at the left
 * and ruled link columns beside it, closing on a ruled legal row.
 */
export function Footer() {
  const contact =
    FOOTER.social.find((link) => link.label === "WhatsApp") ?? FOOTER.social[0];

  return (
    <footer
      id="contact"
      className={cn(
        "bg-(--ek-maroon) px-5 pt-14 pb-12 text-(--ek-paper) lg:px-[60px] lg:pt-[60px] lg:pb-[50px]",
        SANS,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p
          className={cn(
            "max-w-[900px] text-[32px] leading-[1.15] text-(--ek-paper)/70 lg:text-[48px]",
            DISPLAY,
          )}
        >
          {FOOTER.tagline}
        </p>
        <CtaLink
          variant="light"
          href={contact.href}
          target="_blank"
          rel="noreferrer"
        >
          Get in touch
        </CtaLink>
      </div>

      <div className="mt-14 grid gap-y-12 lg:mt-[84px] lg:grid-cols-[279px_1fr] lg:gap-x-[100px]">
        <a
          href={V2_HOME}
          aria-label={`${FOOTER.name} — home`}
          className="self-start"
        >
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={LOGO.width}
            height={LOGO.height}
            className="h-auto w-[220px] invert lg:w-[279px]"
          />
        </a>

        <div>
          <div className="grid gap-x-[42px] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className={COLUMN_TITLE}>
                Explore <DownArrow />
              </p>
              <ul className="mt-8 text-[20px] leading-[33px]">
                {V2_NAV.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={COLUMN_TITLE}>
                {FOOTER.location.title} <DownArrow />
              </p>
              <p className="mt-8 text-[20px] leading-[33px]">
                {FOOTER.location.note}
              </p>
            </div>
            <div>
              <p className={COLUMN_TITLE}>
                Contact <DownArrow />
              </p>
              <ul className="mt-8 text-[20px] leading-[33px]">
                <li>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {contact.label}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className={COLUMN_TITLE}>
                Follow us <DownArrow />
              </p>
              <ul className="mt-8 text-[20px] leading-[33px]">
                {FOOTER.social
                  .filter((link) => link !== contact)
                  .map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 border-y border-(--ek-paper) py-5 text-[16px] leading-5 lg:mt-[60px]">
            {FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
