import { cn } from "@/lib/utils";

import { CAPS } from "../../ekchitra-v5/shared";
import { GRID } from "../styles";
import { ArrowLink, pad, SERVICES } from "./shared";

const HEAD = cn(CAPS, "text-[10px] text-white/50");

/**
 * Variation 05 — Sheet. Black, no pictures: the services as a table on the
 * grid, read like a spec sheet. A header row names the columns; each
 * service is a row with its number, its name set large, who it is for and
 * what it is, the things it covers, and a link.
 */
export function ServicesSheet() {
  return (
    <div className="bg-black py-12 text-white lg:py-16">
      <div className={cn(GRID, "hidden pb-4 lg:grid")}>
        <p className={cn(HEAD, "lg:col-span-1")}>No.</p>
        <p className={cn(HEAD, "lg:col-span-4")}>Service</p>
        <p className={cn(HEAD, "lg:col-span-3")}>For</p>
        <p className={cn(HEAD, "lg:col-span-3")}>Covers</p>
      </div>
      {SERVICES.map((service, index) => (
        <article
          key={service.title}
          className={cn(GRID, "gap-y-5 border-t border-white/20 py-8")}
        >
          <p className="text-[13px] tabular-nums text-white/50 lg:col-span-1">
            {pad(index + 1)}
          </p>
          <h3 className="col-span-3 text-[34px] leading-none tracking-[-0.035em] lg:col-span-4 lg:text-[52px]">
            {service.title}
          </h3>
          <div className="col-span-4 lg:col-span-3">
            <p className="text-[16px] leading-[1.3]">{service.headline}</p>
            <p className="mt-3 text-[14px] leading-[1.5] text-white/65">
              {service.body}
            </p>
          </div>
          <ul className="col-span-4 space-y-1 text-[14px] text-white/80 lg:col-span-3">
            {service.covers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="col-span-4 lg:col-span-1 lg:text-right">
            <ArrowLink light href={service.cta.href}>
              Go
            </ArrowLink>
          </div>
        </article>
      ))}
    </div>
  );
}
