import { cn } from "@/lib/utils";

import { FOOTER } from "../ekchitra-redesign/data";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { BODY, CAPS, DISPLAY, SANS } from "./shared";

/**
 * Closing call on inner pages: a band in the brand black (the footer below it is
 * dark red) with a short invitation, a white
 * button to get in touch, and the diamond motif tone on tone along one edge.
 */
export function Enquire({
  label = "Enquiries",
  title = ["Interested in a work?", "We’d love to hear from you."],
  body = "Ask about availability, pricing or seeing a piece in person at the gallery.",
}: {
  label?: string;
  title?: string[];
  body?: string;
}) {
  const contact =
    FOOTER.social.find((link) => link.label === "WhatsApp") ?? FOOTER.social[0];

  return (
    <section
      className={cn(
        "relative flex flex-col items-center overflow-hidden bg-(--k-ink) px-4 py-20 text-center text-white lg:py-[110px]",
        SANS,
      )}
    >
      <Diamonds
        rows={30}
        horizontal
        className="absolute top-0 left-0 h-[84px] text-white/15 lg:h-[132px]"
      />
      <p className={CAPS}>
        <Chars text={label} />
      </p>
      <h2
        className={cn(DISPLAY, "mt-4 text-[32px] leading-[1.1] lg:text-[56px]")}
      >
        <Chars text={title} />
      </h2>
      <p className={cn(BODY, "mt-5 max-w-[420px] text-white/75")}>
        <Chars text={body} />
      </p>
      <a
        href={contact.href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          CAPS,
          "mt-9 flex h-11 items-center bg-white px-7 text-(--k-ink) transition-colors duration-300 hover:bg-(--k-maroon) hover:text-white",
        )}
      >
        Get in touch
      </a>
    </section>
  );
}
