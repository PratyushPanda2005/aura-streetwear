import { cn } from "@/lib/utils";

import { Chars } from "../ekchitra-v5/Chars";
import { InView } from "../ekchitra-v5/InView";
import { CAPS, SANS, TITLE } from "../ekchitra-v5/shared";
import { SERVICE_LIST } from "./data";
import { GRID, HEAD } from "./styles";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * 04 — Services, on black: three columns of four across the grid, words
 * only. Each column hangs from a fine rule that draws itself across as the
 * row scrolls in, then its number, name, who it is for, a few words, what
 * it covers and a link fade up — the columns one after another.
 */
export function ServicesDark() {
  return (
    <section
      id="services"
      className={cn(
        "scroll-mt-11 bg-(--k-ink) pb-16 text-white lg:pb-24",
        SANS,
      )}
    >
      <div className={cn(GRID, HEAD)}>
        <div className="col-span-4 lg:col-span-7">
          <div className="flex items-baseline gap-x-3">
            <span className="text-[13px] tabular-nums">04</span>
            <span className={cn(CAPS, "text-[10px] text-white/60")}>
              Services
            </span>
          </div>
          <h2 className={cn(TITLE, "mt-2 lg:mt-3")}>
            <Chars text="Art for spaces, minds & souls" />
          </h2>
        </div>
      </div>

      <div className={cn(GRID, "gap-y-14")}>
        {SERVICE_LIST.map((service, index) => (
          <InView
            key={service.title}
            delay={index * 160}
            className="col-span-4 flex flex-col"
          >
            <span
              aria-hidden="true"
              className="ek6-rule block h-px w-full bg-white/40"
            />
            <div className="ek5-fade flex flex-1 flex-col pt-6">
              <p className="text-[13px] tabular-nums text-white/45">
                {pad(index + 1)}
              </p>
              <h3 className="mt-2 text-[32px] leading-none tracking-[-0.035em] lg:text-[40px]">
                {service.title}
              </h3>
              <p className={cn(CAPS, "mt-4 text-[10px] text-white/55")}>
                {service.headline}
              </p>
              <p className="mt-3 max-w-[380px] text-[15px] leading-[1.5] text-white/75">
                {service.body}
              </p>
              <ul className="mt-6 mb-8 space-y-1.5 text-[14px] text-white/80">
                {service.covers.slice(0, 3).map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
              <a
                href={service.cta.href}
                {...(service.cta.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="mt-auto flex items-center justify-between bg-white px-4 py-3 text-[14px] text-(--k-ink) transition-opacity hover:opacity-85"
              >
                {service.cta.label} <span aria-hidden="true">→</span>
              </a>
            </div>
          </InView>
        ))}
      </div>
    </section>
  );
}
