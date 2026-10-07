import Image from "next/image";

import { cn } from "@/lib/utils";

import { PARALLAX_IMAGE } from "./data";
import { FONT, Text } from "./design-system";

/**
 * Full-width image band with parallax: the band is a window onto a photograph
 * that is pinned to the viewport, so the page scrolls past it.
 *
 * The pinning is pure CSS — a `position: fixed` layer clipped to the band by
 * `clip-path` — so the browser's compositor handles it and it cannot lag behind
 * the scroll the way a script-driven transform does.
 */
export function ParallaxImage() {
  return (
    <div
      className={cn(
        "relative h-[420px] bg-black [clip-path:inset(0)] lg:h-[560px]",
        FONT.sans,
      )}
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 h-lvh">
        <Image
          src={PARALLAX_IMAGE.src}
          alt={PARALLAX_IMAGE.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {PARALLAX_IMAGE.caption ? (
        <Text
          size="sm"
          className="absolute bottom-[17px] left-[17px] text-white/80 lg:bottom-[30px] lg:left-[30px]"
        >
          {PARALLAX_IMAGE.caption}
        </Text>
      ) : null}
    </div>
  );
}
