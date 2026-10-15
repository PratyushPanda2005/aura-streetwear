import { cn } from "@/lib/utils";

import { FOOTER, LOGO } from "../ekchitra-redesign/data";
import { Chars } from "../ekchitra-v5/Chars";
import { Diamonds } from "../ekchitra-v5/Diamonds";
import { CAPS, SANS, TITLE } from "../ekchitra-v5/shared";
import { CONTACT, SOCIAL, V6_HOME, V6_NAV } from "./data";
import { GRID } from "./styles";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const page = (label: string) =>
  V6_NAV.find((link) => link.label === label)?.href ?? V6_HOME;

/** Link columns, as in the v5 footer. */
const COLUMNS: {
  title: string;
  links: FooterLink[];
  note?: string;
}[] = [
  {
    title: "Discover",
    links: [
      { label: "Artworks", href: page("Artworks") },
      { label: "Exhibitions", href: page("Exhibitions") },
      { label: "Artists", href: page("Artists") },
    ],
  },
  {
    title: "The gallery",
    links: [
      { label: "About", href: page("About") },
      { label: "Services", href: page("Services") },
      { label: "Contact us", href: CONTACT.href, external: true },
    ],
  },
  {
    title: FOOTER.location.title,
    links: [],
    note: FOOTER.location.note,
  },
  {
    title: "Follow us",
    links: SOCIAL.map((link) => ({ ...link, external: true })),
  },
];

const LINK =
  "text-[16px] leading-[1.9] transition-colors duration-300 hover:text-(--k-sky) lg:text-[17px]";

/**
 * Footer: the v5 footer set on the Swiss grid — deep maroon, white type.
 *
 * A large invitation with a solid white button opposite; below it the logo
 * and tagline in the first four columns and four link columns across the
 * other eight, each under a small capitals label. The closing line sits under the links, and a short run
 * of the diamond motif sits flush in the bottom-left corner.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className={cn(
        "relative scroll-mt-11 overflow-hidden bg-(--k-maroon) pt-20 pb-[136px] text-white lg:pt-28 lg:pb-24",
        SANS,
      )}
    >
      <Diamonds
        rows={21}
        shape="clusters"
        tint="sky"
        tintOpacity={0.6}
        horizontal
        className="absolute bottom-0 left-0 h-[84px] -scale-y-100 text-white/15 lg:h-[116px]"
      />

      <div className={cn(GRID, "relative items-end gap-y-6")}>
        <h2 className={cn(TITLE, "col-span-4 text-white/55 lg:col-span-8")}>
          <Chars text="Art is everywhere. Come and notice." />
        </h2>
        <div className="col-span-4 lg:col-span-3 lg:col-start-10">
          <a
            href={CONTACT.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between bg-white px-4 py-3 text-[14px] text-(--k-maroon) transition-opacity hover:opacity-85"
          >
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className={cn(GRID, "relative mt-16 gap-y-12 lg:mt-28")}>
        <div className="col-span-4">
          <a
            href={V6_HOME}
            aria-label={`${FOOTER.name} — home`}
            className="block w-[200px] lg:w-full lg:max-w-[260px]"
          >
            {/* The logo file is black; it is used as a mask so it takes the
                footer's white. */}
            <span
              role="img"
              aria-label={LOGO.alt}
              className="block aspect-[526/118] bg-white [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]"
            />
          </a>
          <p className="mt-6 max-w-[280px] text-[14px] leading-[1.5] text-white/70">
            {FOOTER.tagline}
          </p>
        </div>

        <div className="col-span-4 grid grid-cols-2 gap-x-4 gap-y-10 lg:col-span-8 lg:col-start-5 lg:grid-cols-4 lg:gap-x-5">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className={cn(CAPS, "text-[10px] text-white/60")}>
                {column.title}
              </h3>
              {column.links.length > 0 && (
                <ul className="mt-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className={LINK}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {column.note && (
                <p className="mt-4 max-w-[220px] text-[14px] leading-[1.5] text-white/70">
                  {column.note}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-2 mt-2 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] text-white/60 lg:col-span-4 lg:mt-4">
            <p>{FOOTER.copyright}</p>
            <p>Hyderabad, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
