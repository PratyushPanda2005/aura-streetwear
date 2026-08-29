"use client";

import Image from "next/image";
import { Shape } from "./Shapes";
import { SplitTagline } from "./SplitTagline";
import { IMG } from "./data";

export function ArtistSection() {
  return (
    <section
      id="dalkhafine"
      className="c-artist relative z-30 overflow-clip bg-[var(--y-pink-100)] py-24 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 lg:px-30">
        <div className="w-full gap-x-16 lg:inline-flex lg:items-start">
          {/* Big lower-case tagline */}
          <div className="min-w-0 shrink-0">
            <SplitTagline
              as="h2"
              delay={0.15}
              className="y-title-200 lowercase"
              lines={[
                [{ text: "Hi," }],
                [{ text: "I'm" }],
                [{ text: "Dalkhafine", em: true }],
                [{ text: "an" }],
                [{ text: "artist" }],
                [{ text: "based" }],
                [{ text: "in" }],
                [{ text: "Montreal" }],
                [{ text: "and" }],
                [{ text: "Paris." }],
              ]}
            />
          </div>

          {/* Portrait + bio */}
          <div className="relative mt-12 lg:mt-0">
            <div className="relative z-[1] origin-right">
              <Image
                src={`${IMG}/dalkhafine-artist.webp`}
                alt="Yestalgia"
                width={1122}
                height={1230}
                className="h-auto w-full"
              />
              <Shape name="scribble-sun" className="y-spin-slow absolute bottom-0 left-0 w-[34%] translate-x-[-20%] translate-y-[15%]" />
            </div>
            <Shape name="sun-orange" className="absolute -top-10 -right-6 -z-[1] w-[26%]" />

            <div className="py-10">
              <p className="y-title-300 y-fade">
                Dalkhafine is a French-Canadian artist who primarily focuses on brand collaborations,
                ranging from illustration and motion design to mural art. Her colorful and resolutely
                positive universe features expressive characters evolving in vibrant settings, often
                tinged with nostalgia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
