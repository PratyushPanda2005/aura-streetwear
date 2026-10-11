import Image from "next/image";

import { cn } from "@/lib/utils";

import { ARTWORKS } from "../ekchitra-redesign/data";
import { Progress } from "./Progress";
import { SERIF } from "./shared";
import { WaveCanvas } from "./WaveCanvas";

/** Lines of the pinned statement and the scroll progress at which each appears. */
const LINES = [
  { text: "A gallery for the curious.", step: 0.08 },
  { text: "Welcoming, thoughtful,", step: 0.36 },
  { text: "open to everyone.", step: 0.62, italic: true },
];

const TILES = ARTWORKS.filter((artwork) => !artwork.cutout).slice(0, 6);
const COLUMNS = [
  TILES.filter((_, index) => index % 2 === 0),
  TILES.filter((_, index) => index % 2 === 1),
];

/**
 * Dark band: two columns of tall artwork tiles scroll past, bowing with the
 * scroll, while a statement stays pinned in the middle of the screen and gains a
 * line at a time.
 */
export function World() {
  return (
    <Progress mode="pinned" className="relative bg-(--v-night) text-white">
      <div className="pointer-events-none sticky top-0 z-10 flex h-svh items-center justify-center px-4 text-center">
        <p
          className={cn(
            SERIF,
            "text-[34px] leading-[1] tracking-[-0.02em] [text-shadow:0_1px_24px_rgb(0_0_38/0.55)] lg:text-[60px]",
          )}
        >
          {LINES.map((line) => (
            <span
              key={line.text}
              data-step={line.step}
              className={cn(
                "block translate-y-3 opacity-0 transition-[opacity,translate] duration-1000 ease-out data-[on=true]:translate-y-0 data-[on=true]:opacity-100",
                line.italic && "italic",
              )}
            >
              {line.text}
            </span>
          ))}
        </p>
      </div>

      <WaveCanvas className="-mt-[100svh] grid grid-cols-2 gap-x-3 px-4 pb-24 lg:gap-x-24 lg:px-24 lg:pb-40">
        {COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={cn(
              "flex flex-col gap-y-12 lg:gap-y-24",
              columnIndex === 0
                ? "pt-[60svh]"
                : "translate-y-[calc(var(--p,0)_*_-140px)] pt-[95svh] will-change-transform",
            )}
          >
            {column.map((artwork) => (
              <div
                key={artwork.image}
                data-wave
                className="group relative aspect-[576/760]"
              >
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} by ${artwork.artist}`}
                  fill
                  sizes="(max-width: 1023px) 50vw, 40vw"
                  loading="eager"
                  data-sampler="planeTexture"
                  className="object-cover brightness-[0.82] group-data-[gl=true]:invisible"
                />
              </div>
            ))}
          </div>
        ))}
      </WaveCanvas>
    </Progress>
  );
}
