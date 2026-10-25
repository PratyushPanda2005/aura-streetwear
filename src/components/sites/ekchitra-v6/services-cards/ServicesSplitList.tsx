import { cn } from "@/lib/utils";

import { CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { GRID, ITEM_TITLE } from "../styles";
import {
  CTA_SERVICES,
  INTRO,
  LineArrow,
  MUTED,
  pad,
  SCREEN,
  ServicePhoto,
} from "./shared";

/**
 * 06 — Split list: one photograph filling the left half; the right half
 * opens with the heading and line at the top, and both services sit as
 * ruled rows on the photograph's bottom edge — number,
 * audience, name, line and the way in — each row a link. Static.
 */
export function ServicesSplitList() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink)", SCREEN, SANS)}
    >
      <div className={cn(GRID, "gap-y-10 lg:min-h-0 lg:flex-1")}>
        <ServicePhoto
          service={CTA_SERVICES[1]}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="col-span-4 aspect-[4/3] lg:col-span-6 lg:aspect-auto lg:h-full lg:min-h-0"
        />
        <div className="col-span-4 flex flex-col lg:col-span-6">
          <h2 className={TITLE}>{INTRO.title}</h2>
          <p className="mt-4 mb-8 max-w-[440px] text-[16px] leading-[1.45] text-(--k-ink)/75">
            {INTRO.body}
          </p>
          <ul className="mt-2 lg:mt-auto">
            {CTA_SERVICES.map((service, index) => (
              <li key={service.key} className="">
                <a
                  href={service.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block py-5"
                >
                  <span className="flex items-baseline justify-between gap-x-4">
                    <span className="text-[13px] tabular-nums">
                      {pad(index + 1)}
                    </span>
                    <span className={cn(CAPS, "text-right text-[11px]", MUTED)}>
                      {service.eyebrow}
                    </span>
                  </span>
                  <span className={cn(ITEM_TITLE, "mt-4 block")}>
                    {service.title}
                  </span>
                  <span className="mt-2 block max-w-[420px] text-[15px] leading-[1.45]">
                    {service.body}
                  </span>
                  <span className="mt-4 flex items-center gap-x-3 text-[14px]">
                    {service.cta.label}
                    <LineArrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
