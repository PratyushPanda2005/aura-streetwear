import Image from "next/image";

import { cn } from "@/lib/utils";

import { CTA_PHOTOS, CTA_SERVICES } from "../cta-variants/shared";
import { Dotted } from "../Dotted";

/**
 * Shared bits for the static services iterations: the two services and their
 * photos come from the calls to action (cta-variants/shared), so every
 * iteration says the same thing. Nothing here moves.
 */
export {
  CTA_PHOTOS,
  CTA_SERVICES,
  INTRO,
  LineArrow,
  pad,
} from "../cta-variants/shared";

export type Service = (typeof CTA_SERVICES)[number];

/** The muted line under a card's name (its audience), at a legible contrast. */
export const MUTED = "text-(--k-ink)/65";

/** A plain text link, underlined. */
export const TEXT_LINK =
  "underline decoration-1 underline-offset-4 hover:no-underline";

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

/** A service's photograph filling its frame (set the frame's size with `className`). */
export function ServicePhoto({
  service,
  sizes,
  dotted = false,
  className,
}: {
  service: Service;
  sizes: string;
  /** Show the photo as a grey halftone that clears when its group is hovered (see .ek6-dots). */
  dotted?: boolean;
  className?: string;
}) {
  const photo = CTA_PHOTOS[service.key];
  return (
    <div className={cn("relative overflow-hidden bg-(--k-ink)/5", className)}>
      <Dotted on={dotted}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className={cn(
            "object-cover",
            photo.position,
            dotted &&
              "transition-transform duration-900 ease-[cubic-bezier(0.45,0,0.25,1)] group-hover:scale-[1.03] group-hover:duration-750 group-hover:ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
          )}
        />
      </Dotted>
    </div>
  );
}

/**
 * Every iteration fits one screen on desktop: the section is as tall as the
 * screen below the 44px top bar (never under 640px), and its content is
 * centred in it; photographs flex to fill whatever height the words leave.
 */
export const SCREEN =
  "lg:flex lg:h-[calc(100svh-44px)] lg:min-h-[640px] lg:flex-col lg:justify-center lg:py-12";
