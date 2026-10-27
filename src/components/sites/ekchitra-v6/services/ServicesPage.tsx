import Image from "next/image";

import { cn } from "@/lib/utils";

import { BODY, SANS } from "../../ekchitra-v5/shared";
import { CtaBanner } from "../CtaBanner";
import { CONTACT_PAGE, SERVICE_LIST } from "../data";
import { BUTTON, GRID, SECTION_TITLE } from "../styles";

const PLACEHOLDERS = "/sites/ekchitra-redesign/placeholders";

/**
 * TEMPORARY PLACEHOLDERS — replace with EkChitra photographs before launch:
 * - `banner` (the page banner) and `advisory`: interiors from
 *   goodman-gallery.com/goodman-advisory, showing other artists' work; for
 *   reference only, not for publishing.
 * - `closing`: a gallery interior from Unsplash (free licence).
 */
export const SERVICES_PHOTOS = {
  banner: { src: `${PLACEHOLDERS}/services-hero-goodman.jpg`, alt: "" },
  advisory: {
    src: `${PLACEHOLDERS}/services-room-goodman.jpg`,
    alt: "A large photographic work installed in an office interior",
  },
  closing: `${PLACEHOLDERS}/hero-grid-gallery-unsplash.jpg`,
};

/** The services offered to clients — advisory and sourcing — each with the picture for its row. */
const ROWS = SERVICE_LIST.filter(
  (service) => service.title !== "Exhibitions",
).map((service) =>
  service.title === "Art advisory"
    ? { ...service, image: SERVICES_PHOTOS.advisory }
    : service,
);

/**
 * Services, after goodman-gallery.com/goodman-advisory, under the shared
 * page frame: a row per service — the words on the left, a picture on the
 * right — then the shared closing banner. The words are EkChitra's own.
 */
export function ServicesPage() {
  return (
    <div className={SANS}>
      <div className="space-y-20 pt-12 lg:space-y-[120px] lg:pt-20">
        {ROWS.map((service, index) => (
          <section
            key={service.title}
            aria-labelledby={`service-${index}`}
            className={cn(GRID, "gap-y-8 lg:items-center")}
          >
            <div className="col-span-4 lg:col-span-5">
              <h2 id={`service-${index}`} className={SECTION_TITLE}>
                {service.title}
              </h2>
              <p className="mt-2 text-[15px] text-(--k-ink)/70">
                {service.headline}
              </p>
              <p className={cn(BODY, "mt-6 max-w-[440px]")}>{service.body}</p>
              <ul className="mt-8 max-w-[440px] border-t border-(--k-ink)/15 text-[14px]">
                {service.covers.map((item) => (
                  <li
                    key={item}
                    className="border-b border-(--k-ink)/15 py-2.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={service.cta.href}
                target="_blank"
                rel="noreferrer"
                className={cn(BUTTON, "mt-8")}
              >
                {service.cta.label}
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="relative col-span-4 aspect-[4/3] overflow-hidden lg:col-span-6 lg:col-start-7">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </section>
        ))}
      </div>

      <CtaBanner
        href={CONTACT_PAGE}
        title="Speak with the gallery"
        line="Visits, enquiries and commissions — tell us what you have in mind."
        cta="Get in touch"
        image={SERVICES_PHOTOS.closing}
      />
    </div>
  );
}
