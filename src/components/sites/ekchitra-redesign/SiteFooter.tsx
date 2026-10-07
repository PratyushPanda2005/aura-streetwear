import Image from "next/image";

import { cn } from "@/lib/utils";

import { FOOTER, LOGO, ROUTES } from "./data";
import { FONT, Text } from "./design-system";

const LINK = "transition-colors duration-300 ease-out hover:text-[#b50938]";

/** Light grey footer: gallery details, two link lists, location and social links. */
export function SiteFooter() {
  return (
    <footer
      id="contact"
      className={cn("bg-[#f2f2f2] text-[#6e6e6e]", FONT.sans)}
    >
      <div className="grid gap-y-10 px-[17px] py-[30px] lg:grid-cols-3 lg:gap-x-[60px] lg:px-[69px]">
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
              className="h-6 w-auto"
            />
          </a>
          <Text size="sm" className="mt-5 max-w-[320px]">
            {FOOTER.tagline}
          </Text>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-[14px]">
          {FOOTER.columns.map((column) => (
            <div key={column.title}>
              <Text size="sm" className="font-bold">
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
          <Text size="sm" className="font-bold">
            {FOOTER.location.title}
          </Text>
          <Text size="sm" className="mt-4">
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

      <Text
        size="sm"
        className="px-[17px] pb-[30px] text-[12px] lg:px-[69px] lg:text-right"
      >
        {FOOTER.copyright}
      </Text>
    </footer>
  );
}
