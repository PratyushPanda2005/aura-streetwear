import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const HOT_PINK = "#FF37B4";
const EMERALD = "#009A6E";
const ROYAL = "#2D45C7";
const YELLOW = "#FAC209";
const ORANGE = "#FA5909";
const BLUE = "#0090C7";
const NAVY = "#001482";
const OFF_WHITE = "#F5F4F1";
const BLACK = "#000";

const TILE_COLORS = [HOT_PINK, EMERALD, ROYAL] as const;

/* -------------------------------------------------------------------------- */
/* Ticker                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A 17px tall strip of 17px tiles (16px colour + 1px black gap), 51px longer than
 * its container so the `yn-ticker` loop (translateX 0 → -51px) never shows a gap.
 */
function TickerRow({ id, reverse = false }: { id: string; reverse?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "absolute left-0 top-0 block h-[17px] w-[calc(100%+51px)] max-w-none animate-[yn-ticker_3.6s_linear_infinite]",
        reverse && "[animation-direction:reverse]",
      )}
    >
      <defs>
        <pattern id={id} width={51} height={17} patternUnits="userSpaceOnUse">
          <rect width={51} height={17} fill={BLACK} />
          {TILE_COLORS.map((color, i) => (
            <rect key={color} x={i * 17} y={0} width={16} height={17} fill={color} />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const BAND_BASE = "absolute overflow-hidden border-[#FAC209] bg-black";

type BandProps = { id: string; reverse?: boolean; className: string };

function HorizontalBand({ id, reverse, className }: BandProps) {
  return (
    <div className={cn(BAND_BASE, "left-[80px] right-[80px] h-[21px] border-y-2", className)}>
      <TickerRow id={id} reverse={reverse} />
    </div>
  );
}

function VerticalBand({ id, reverse, className }: BandProps) {
  return (
    <div
      className={cn(
        BAND_BASE,
        "bottom-[133px] top-[133px] w-[21px] border-x-2 [container-type:size]",
        className,
      )}
    >
      {/* Horizontal row as long as the band is tall, rotated 90° around its top-left corner. */}
      <div className="absolute left-0 top-0 h-[17px] w-[100cqh] origin-top-left translate-x-[17px] rotate-90">
        <TickerRow id={id} reverse={reverse} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Medallion glyphs (44 × 44)                                                 */
/* -------------------------------------------------------------------------- */

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 44"
      aria-hidden="true"
      focusable="false"
      className="absolute left-1/2 top-1/2 size-[26px] -translate-x-1/2 -translate-y-1/2 animate-pulse md:size-[44px]"
    >
      <g stroke={BLACK} strokeWidth={1} strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

function KeyGlyph() {
  return (
    <Glyph>
      <g transform="rotate(45 22 22)">
        <path d="M17 20H41V24H40V28H37V24H35V30H32V24H17Z" fill={YELLOW} />
        <circle cx={11} cy={22} r={8.5} fill={YELLOW} />
        <circle cx={10} cy={22} r={3.2} fill={NAVY} />
      </g>
    </Glyph>
  );
}

const SPRIG_LEAF_PATH = "M0 0C4 -6 12 -7 17 -1C12 4 4 4 0 0Z";
const SPRIG_LEAVES = [
  { id: "low-right", transform: "translate(22 31) rotate(-22)" },
  { id: "low-left", transform: "translate(22 31) scale(-1 1) rotate(-22)" },
  { id: "mid-right", transform: "translate(22 22) rotate(-34) scale(0.9)" },
  { id: "mid-left", transform: "translate(22 22) scale(-1 1) rotate(-34) scale(0.9)" },
  { id: "top", transform: "translate(21.2 14) rotate(-86) scale(0.8)" },
] as const;

function SprigGlyph() {
  return (
    <Glyph>
      <path d="M22 41V13" fill="none" stroke={EMERALD} strokeWidth={2} strokeLinecap="round" />
      {SPRIG_LEAVES.map((leaf) => (
        <path key={leaf.id} d={SPRIG_LEAF_PATH} transform={leaf.transform} fill={EMERALD} />
      ))}
    </Glyph>
  );
}

function WaveGlyph() {
  return (
    <Glyph>
      <path
        d="M3 33C8 32 10 22 17 18C24 14 33 16 35 23C36 27 32 30 29 28C31 25 29 21 25 22C20 23 19 30 23 33C28 37 36 35 41 30V40H3Z"
        fill={BLUE}
      />
      <path d="M3 40C9 36 15 36 22 40C29 36 35 36 41 40Z" fill={OFF_WHITE} />
    </Glyph>
  );
}

function CometGlyph() {
  return (
    <Glyph>
      <path d="M4 4C15 8 27 16 37 26L26 37C16 27 8 15 4 4Z" fill={ORANGE} />
      <path d="M10 10C17 13 25 19 32 26L26 32C19 25 13 17 10 10Z" fill={HOT_PINK} />
      <circle cx={31} cy={31} r={7.5} fill={YELLOW} />
    </Glyph>
  );
}

/* -------------------------------------------------------------------------- */
/* Medallions                                                                 */
/* -------------------------------------------------------------------------- */

const RING_TILE_COUNT = 24;
const RING_TILES = Array.from({ length: RING_TILE_COUNT }, (_, i) => ({
  id: `ring-tile-${i}`,
  angle: (360 / RING_TILE_COUNT) * i,
  fill: TILE_COLORS[i % TILE_COLORS.length],
}));

function Medallion({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "absolute size-[72px] overflow-hidden rounded-full border-2 border-[#FAC209] bg-[#001482] md:size-[124px]",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full animate-[yn-spin_10s_linear_infinite]"
      >
        <circle cx={60} cy={60} r={50} fill="none" stroke={BLACK} strokeWidth={14} />
        {RING_TILES.map((tile) => (
          <rect
            key={tile.id}
            x={-5.75}
            y={-6}
            width={11.5}
            height={12}
            fill={tile.fill}
            transform={`rotate(${tile.angle} 60 60) translate(60 10)`}
          />
        ))}
        <circle cx={60} cy={60} r={42.5} fill="none" stroke={YELLOW} strokeWidth={1} />
      </svg>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Corners                                                                    */
/* -------------------------------------------------------------------------- */

const CORNER_LINE = "absolute bg-[#FAC209]";

type Corner = {
  id: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Anchors the 80 × 60 and 35 × 133 black blocks to the stage corner. */
  anchor: string;
  /** Inner step: carries the bands' inner yellow lines around the corner. */
  innerStep: string;
  /** Outer corner: carries the bands' outer yellow lines to a square corner. */
  outerStep: string;
  medallion: string;
  glyph: ReactNode;
};

const CORNERS: readonly Corner[] = [
  {
    id: "top-left",
    anchor: "left-0 top-0",
    innerStep: "left-[33px] top-[58px]",
    outerStep: "left-[14px] top-[39px]",
    medallion: "left-[10px] top-[10px] md:left-[17px] md:top-[17px]",
    glyph: <KeyGlyph />,
  },
  {
    id: "top-right",
    anchor: "right-0 top-0",
    innerStep: "right-[33px] top-[58px]",
    outerStep: "right-[14px] top-[39px]",
    medallion: "right-[10px] top-[10px] md:right-[17px] md:top-[17px]",
    glyph: <SprigGlyph />,
  },
  {
    id: "bottom-left",
    anchor: "bottom-0 left-0",
    innerStep: "bottom-[58px] left-[33px]",
    outerStep: "bottom-[39px] left-[14px]",
    medallion: "bottom-[10px] left-[10px] md:bottom-[17px] md:left-[17px]",
    glyph: <WaveGlyph />,
  },
  {
    id: "bottom-right",
    anchor: "bottom-0 right-0",
    innerStep: "bottom-[58px] right-[33px]",
    outerStep: "bottom-[39px] right-[14px]",
    medallion: "bottom-[10px] right-[10px] md:bottom-[17px] md:right-[17px]",
    glyph: <CometGlyph />,
  },
];

/* -------------------------------------------------------------------------- */
/* Frame                                                                      */
/* -------------------------------------------------------------------------- */

export function HeroFrame({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {/* Black mask outside the frame */}
      <div className="absolute inset-x-0 top-0 h-[39px] bg-black" />
      <div className="absolute inset-x-0 bottom-0 h-[39px] bg-black" />
      <div className="absolute inset-y-0 left-0 w-[14px] bg-black" />
      <div className="absolute inset-y-0 right-0 w-[14px] bg-black" />

      {/* Corner fills */}
      {CORNERS.map((corner) => (
        <div key={`fill-${corner.id}`}>
          <div className={cn("absolute h-[60px] w-[80px] bg-black", corner.anchor)} />
          <div className={cn("absolute h-[133px] w-[35px] bg-black", corner.anchor)} />
        </div>
      ))}

      {/* Ticker bands */}
      <HorizontalBand id="yn-ticker-top" reverse className="top-[39px]" />
      <HorizontalBand id="yn-ticker-bottom" className="bottom-[39px]" />
      <VerticalBand id="yn-ticker-left" className="left-[14px]" />
      <VerticalBand id="yn-ticker-right" reverse className="right-[14px]" />

      {/* Step lines joining the bands, with the medallions on top */}
      {CORNERS.map((corner) => (
        <div key={`corner-${corner.id}`}>
          <div className={cn(CORNER_LINE, "h-[2px] w-[47px]", corner.innerStep)} />
          <div className={cn(CORNER_LINE, "h-[75px] w-[2px]", corner.innerStep)} />
          <div className={cn(CORNER_LINE, "h-[2px] w-[66px]", corner.outerStep)} />
          <div className={cn(CORNER_LINE, "h-[94px] w-[2px]", corner.outerStep)} />
          <Medallion className={corner.medallion}>{corner.glyph}</Medallion>
        </div>
      ))}
    </div>
  );
}
