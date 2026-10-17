import { cn } from "@/lib/utils";

import { Diamonds } from "../ekchitra-v5/Diamonds";
import { CONTACT, SERVICE_LIST, SERVICES_INTRO } from "../ekchitra-v6/data";
import { CAPITALS, MONO } from "./styles";
import { InView, MonoButton } from "./ui";

/** Wireframe line drawings, one per practice: a gallery wall, an easel, a room. */
function LineArt({ index }: { index: number }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };
  return (
    <svg
      viewBox="0 0 240 160"
      aria-hidden="true"
      className="h-auto w-full max-w-[300px] text-white/70"
    >
      {index === 0 && (
        <g {...common}>
          <path d="M10 140h220M10 140 50 110h140l40 30" />
          <rect x="30" y="24" width="70" height="80" />
          <rect x="38" y="32" width="54" height="64" />
          <rect x="118" y="40" width="44" height="56" />
          <rect x="176" y="30" width="40" height="66" />
          <path d="M65 24V12M140 40V12M196 30V12M10 12h220" />
        </g>
      )}
      {index === 1 && (
        <g {...common}>
          <path d="M120 14 70 150M120 14l50 136M120 14v136M84 112h72" />
          <rect x="78" y="34" width="84" height="64" />
          <path d="M90 86c14-22 26-30 40-18s20 4 22-6" />
          <circle cx="104" cy="54" r="8" />
          <path d="M30 150h180" />
        </g>
      )}
      {index === 2 && (
        <g {...common}>
          <path d="M20 20h200v120H20zM20 140l40-30h120l40 30M60 110V40h120v70" />
          <rect x="94" y="52" width="52" height="34" />
          <path d="M70 110v-14h40v14M130 110v-20h36v20M148 90V70" />
          <circle cx="148" cy="66" r="4" />
        </g>
      )}
    </svg>
  );
}

/**
 * Services, after aspensearch.com: the section's statement in big capitals
 * held on grey on the left with a short paragraph and a dark button, while
 * a black list of the gallery's three practices scrolls past on the right —
 * each with a mono number, its name, a description, a line drawing and its
 * services as mono bullets with mint squares.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="e7-services"
      className="grid scroll-mt-(--e7-header) grid-cols-1 border-b border-(--e7-rule) lg:grid-cols-4"
    >
      <div className="relative overflow-clip bg-(--e7-maroon) text-white lg:col-span-2">
        <div className="flex flex-col justify-between gap-y-12 px-5 pt-16 pb-10 lg:sticky lg:top-(--e7-header) lg:h-[calc(100svh-var(--e7-header))] lg:pt-8 lg:pb-5">
          <h2 id="e7-services" className={CAPITALS}>
            {SERVICES_INTRO.words.join(" ")}
          </h2>
          <div className="flex max-w-[360px] flex-col items-start gap-y-6">
            <p className="text-[16px] leading-[1.25] tracking-[-0.02em]">
              {SERVICES_INTRO.body} Three ways we work with the people who come
              to us.
            </p>
            <MonoButton href={CONTACT.href} external light>
              Talk to the gallery
            </MonoButton>
          </div>
          <Diamonds
            shape="steps"
            tint="sky"
            horizontal
            rows={17}
            className="absolute right-0 bottom-0 h-[90px] -scale-y-100 text-white/[0.16] lg:h-[120px]"
          />
        </div>
      </div>

      <ol className="bg-(--e7-ink) text-white lg:col-span-2">
        {SERVICE_LIST.map((service, i) => (
          <li
            key={service.title}
            className="border-b border-white/15 last:border-b-0"
          >
            <InView className="grid gap-y-10 px-5 py-12 sm:grid-cols-2 sm:gap-x-5 lg:min-h-[100svh] lg:py-8">
              <div className="e7-in flex flex-col justify-between gap-y-10">
                <div>
                  <p className={cn(MONO, "text-white/60")}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 text-[36px] leading-[0.95] tracking-[-0.045em] lg:text-[3.35vw]">
                    {service.title}
                  </h3>
                  <p className="mt-6 max-w-[340px] text-[16px] leading-[1.25] tracking-[-0.02em] text-white/75">
                    {service.body}
                  </p>
                </div>
                <ul className="flex flex-col gap-y-3">
                  {service.covers.map((item) => (
                    <li
                      key={item}
                      className={cn(MONO, "flex items-start gap-x-2.5")}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[3px] size-[7px] shrink-0 bg-(--e7-sky)"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="e7-in flex items-center justify-center [--delay:150ms] sm:items-end">
                <LineArt index={i} />
              </div>
            </InView>
          </li>
        ))}
      </ol>
    </section>
  );
}
