import Image from "next/image";

import { cn } from "@/lib/utils";

import { DETAILS } from "../contact/data";
import { CONTACT_PAGE } from "../data";
import { GRID } from "../styles";
import { SILK } from "./FooterSmoke";
import { FOOTER, GroupTitle, LinkList, V6_NAV } from "./shared";

/**
 * The footer's columns. `wide` columns take the full width on
 * phones; the rest sit two to a row.
 */
const COLUMNS = [
  {
    title: "Gallery",
    links: [...V6_NAV, { label: "Contact", href: CONTACT_PAGE }],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: DETAILS.instagram.href, external: true },
      { label: "WhatsApp", href: DETAILS.whatsapp, external: true },
    ],
  },
  {
    title: "Get in touch",
    wide: true,
    links: [
      { label: DETAILS.email, href: `mailto:${DETAILS.email}` },
      { label: DETAILS.phone, href: `tel:${DETAILS.phone.replace(/\s/g, "")}` },
    ],
  },
  {
    title: "Visit",
    wide: true,
    lines: DETAILS.address,
    links: [{ label: "Directions", href: DETAILS.directions, external: true }],
  },
];

/**
 * Variation 07 — short and minimal: small columns for the pages, socials,
 * getting in touch and the address, then the small print. Only as tall as
 * its content. Behind the type, Footer 05's glossy silk in the brand
 * colours (FooterSmoke), dimmed to under half its brightness (and its
 * colour lifted a little to make up) so the white type stays clear even
 * over the silk's highlights; navy shows until the picture loads.
 */
export function FooterCard() {
  return (
    <footer
      id="contact"
      className="relative isolate scroll-mt-11 overflow-hidden bg-(--k-navy) px-4 pt-12 pb-6 text-white lg:px-5 lg:pt-14"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={SILK}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_40%] brightness-42 saturate-135"
        />
      </div>

      <div className={cn(GRID, "gap-y-8 px-0 lg:px-0")}>
        {COLUMNS.map((column) => (
          <div
            key={column.title}
            className={cn(
              "lg:col-span-3",
              "wide" in column ? "col-span-4" : "col-span-2",
            )}
          >
            <GroupTitle className="text-white/85">{column.title}</GroupTitle>
            {"lines" in column && column.lines && (
              <p className="mt-3 text-[14px] leading-[1.5] text-white/90">
                {column.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}
            <LinkList
              links={column.links}
              className={cn(
                "text-[14px] text-white/90",
                "lines" in column ? "mt-2" : "mt-3",
              )}
            />
          </div>
        ))}
      </div>

      <GroupTitle className="mt-12 text-white/85">
        {`${FOOTER.copyright} · Hyderabad, India`}
      </GroupTitle>
    </footer>
  );
}
