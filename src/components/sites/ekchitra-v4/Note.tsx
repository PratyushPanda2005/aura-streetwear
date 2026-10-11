import { cn } from "@/lib/utils";

import { ABOUT_SECTION, FOOTER } from "../ekchitra-redesign/data";
import { Reveal } from "./Reveal";
import { SCRIPT } from "./shared";

/**
 * A handwritten note on the page colour: the gallery's two opening lines, set at
 * a slight slant and signed.
 */
export function Note() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center px-6 py-24 text-black lg:min-h-[770px]">
      <Reveal>
        <div
          className={cn(
            "-rotate-[4deg] text-[26px] leading-[1.5] sm:text-[36px] lg:text-[46px]",
            SCRIPT,
          )}
        >
          {ABOUT_SECTION.heading.map((line, index) => (
            <p key={line} className={index % 2 ? "pl-8 lg:pl-16" : undefined}>
              {line}
            </p>
          ))}
          <p className="mt-6 text-right text-[22px] lg:mt-8 lg:text-[32px]">
            — {FOOTER.name}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
