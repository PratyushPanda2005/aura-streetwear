import { cn } from "@/lib/utils";

/**
 * Shared bits for the services iterations: the two services, their photos,
 * the intro, the section head and v6's line arrow all come from the calls to
 * action (cta-variants/shared), so every iteration says the same thing.
 */
export {
  CTA_PHOTOS,
  CTA_SERVICES,
  INTRO,
  LineArrow,
  pad,
  SectionHead,
} from "../cta-variants/shared";

/**
 * A text link underlined by a 1px rule that draws away to the right on hover
 * and back on leaving, as Goodman Gallery sets its contact links.
 */
export const UNDERLINE =
  "bg-linear-to-r from-current to-current bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-[length:0%_1px] hover:bg-[length:0%_1px]";

/** The muted line under a card's name (its audience), at a legible contrast. */
export const MUTED = "text-(--k-ink)/65";

/** What a service covers, as a short run of lines. */
export function Covers({
  items,
  light = false,
  className,
}: {
  items: string[];
  light?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "space-y-1 text-[14px] leading-[1.45]",
        light ? "text-white/75" : "text-(--k-ink)/75",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item}>— {item}</li>
      ))}
    </ul>
  );
}
