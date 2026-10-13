import { cn } from "@/lib/utils";

import { FOOTER, LOGO } from "../ekchitra-redesign/data";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { DISPLAY, GUTTER, SANS, V5_HOME, V5_ROUTES } from "./shared";

const CONTACT =
  FOOTER.social.find((link) => link.label === "WhatsApp") ?? FOOTER.social[0];

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

/** Link columns; the last one is filled from the gallery's social accounts. */
const COLUMNS: { title: string; links: FooterLink[]; note?: string }[] = [
  {
    title: "Discover",
    links: [
      { label: "Artworks", href: V5_ROUTES.artworks },
      { label: "Exhibitions", href: V5_ROUTES.exhibitions },
      { label: "Artists", href: V5_ROUTES.artists },
    ],
  },
  {
    title: "The gallery",
    links: [
      { label: "About", href: `${V5_HOME}#about` },
      { label: "Services", href: `${V5_HOME}#services` },
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
    links: FOOTER.social.map((link) => ({ ...link, external: true })),
  },
];

const LINK =
  "text-[16px] leading-[1.9] transition-colors duration-300 hover:text-white lg:text-[17px]";

/**
 * Footer: deep red ground, light blue type.
 *
 * A large invitation with an outlined button on top; below it the logo, large,
 * on the left and four link columns on the right, each headed by a title ruled above and
 * below with a small arrow. A closing line sits between two more rules, and
 * a short run of the diamond motif in grey and blue sits flush in the bottom-left
 * corner.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className={cn(
        "relative overflow-hidden bg-(--k-maroon) pt-14 pb-10 text-(--k-sky) lg:pt-[72px] lg:pb-14",
        GUTTER,
        SANS,
      )}
    >
      <Diamonds
        rows={18}
        horizontal
        accent
        className="absolute bottom-0 left-0 h-[84px] -scale-y-100 text-white/15 lg:h-[116px]"
      />
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <h2
          className={cn(
            DISPLAY,
            "text-[28px] leading-[1.1] text-(--k-sky)/55 lg:text-[40px]",
          )}
        >
          <Chars text="Art is everywhere. Come and notice." />
        </h2>
        <a
          href={CONTACT.href}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center border border-(--k-sky)/60 px-8 text-[16px] transition-colors duration-300 hover:border-(--k-sky) hover:bg-(--k-sky) hover:text-(--k-maroon)"
        >
          Get in touch
        </a>
      </div>

      <div className="relative mt-14 grid gap-y-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] lg:gap-x-16">
        <div className="relative">
          <a
            href={V5_HOME}
            aria-label={`${FOOTER.name} — home`}
            className="relative block w-[200px] lg:w-full lg:max-w-[260px]"
          >
            {/* The logo file is black; it is used as a mask so it takes the
                footer's light blue. */}
            <span
              role="img"
              aria-label={LOGO.alt}
              className="block aspect-[526/118] bg-(--k-sky) [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]"
            />
          </a>
          <p className="mt-6 max-w-[280px] text-[14px] leading-[1.5] text-(--k-sky)/75">
            {FOOTER.tagline}
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-12">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="flex items-center justify-between border-y border-(--k-sky)/70 py-2 text-[17px] leading-[1.4] lg:text-[19px]">
                  {column.title}
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="size-4"
                  >
                    <path
                      d="M8 2v11M3.5 8.5 8 13l4.5-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </h3>
                <ul className="mt-5">
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
                {column.note && (
                  <p className="mt-5 max-w-[220px] text-[14px] leading-[1.5] text-(--k-sky)/75">
                    {column.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-y border-(--k-sky)/70 py-4 text-[14px] lg:mt-14">
            <p>{FOOTER.copyright}</p>
            <p className="text-(--k-sky)/75">Hyderabad, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
