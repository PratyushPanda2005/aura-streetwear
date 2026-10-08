import Image from "next/image";

import { cn } from "@/lib/utils";

import { FOOTER, LOGO, ROUTES } from "./data";
import { BrandStripe, FONT, Text } from "./design-system";

const TITLE = "text-[12px] tracking-[1.4px] text-(--ek-maroon) uppercase";

const LINK =
  "text-(--ek-ink)/75 transition-colors duration-300 ease-out hover:text-(--ek-maroon)";

/**
 * Footer on the off-white ground: the four-colour stripe along the top, then the
 * logo and tagline, two link lists, and location with social links.
 */
export function SiteFooter() {
  return (
    <footer
      id="contact"
      className={cn("bg-(--ek-paper) text-(--ek-ink)", FONT.sans)}
    >
      <BrandStripe />

      <div className="grid gap-y-12 px-[17px] pt-14 pb-12 lg:grid-cols-3 lg:gap-x-[60px] lg:px-[69px] lg:pt-[69px] lg:pb-14">
        <div>
          <a
            href={ROUTES.home}
            aria-label={`${FOOTER.name} — home`}
            className="inline-block"
          >
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              className="h-7 w-auto"
            />
          </a>
          <Text size="sm" className="mt-5 max-w-[320px] text-(--ek-ink)/75">
            {FOOTER.tagline}
          </Text>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-[14px]">
          {FOOTER.columns.map((column) => (
            <div key={column.title}>
              <Text size="sm" className={TITLE}>
                {column.title}
              </Text>
              <ul className="mt-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Text
                      as="a"
                      size="sm"
                      href={link.href}
                      className={cn("leading-7", LINK)}
                    >
                      {link.label}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col lg:items-end lg:text-right">
          <Text size="sm" className={TITLE}>
            {FOOTER.location.title}
          </Text>
          <Text size="sm" className="mt-4 text-(--ek-ink)/75">
            {FOOTER.location.note}
          </Text>
          <ul className="mt-4 flex gap-x-5">
            {FOOTER.social.map((link) => (
              <li key={link.label}>
                <Text
                  as="a"
                  size="sm"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  {link.label}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-[17px] border-t border-(--ek-ink)/15 py-6 lg:mx-[69px]">
        <Text size="sm" className="text-[12px] text-(--ek-ink)/60">
          {FOOTER.copyright}
        </Text>
      </div>
    </footer>
  );
}
