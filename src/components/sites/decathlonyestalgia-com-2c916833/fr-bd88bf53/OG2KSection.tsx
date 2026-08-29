"use client";

import Image from "next/image";
import { Shape } from "./Shapes";
import { IMG } from "./data";

export function OG2KSection() {
  return (
    <section id="og2k" className="c-og2k relative z-40 overflow-hidden bg-[var(--y-pink-200)] py-16 lg:-mb-12 lg:pt-40">
      {/* diagonal line texture */}
      <Shape name="diagonal-lines" className="absolute inset-0 h-full w-full object-cover opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 lg:px-30">
        {/* Big OG2K logo */}
        <div className="relative pb-6 lg:pb-16">
          <Image
            src={`${IMG}/og2k-logo.svg`}
            alt="OG2K"
            width={1204}
            height={273}
            className="h-auto w-full"
          />
        </div>

        <div className="grid gap-y-12 pt-6 lg:grid-cols-2 lg:gap-x-16 lg:py-16">
          {/* Left: shoe visuals */}
          <div className="relative">
            <div className="y-fade -mb-10 lg:mr-20 lg:-mb-32">
              <Image
                src={`${IMG}/og2k-replacement.jpg`}
                alt="OG2K"
                width={1000}
                height={1000}
                className="h-auto w-full"
              />
            </div>
            <div data-parallax="60" className="relative z-20">
              <div className="y-fade">
                <Image
                  src={`${IMG}/og2k-outline-white.jpg`}
                  alt="OG2K outline"
                  width={1238}
                  height={1716}
                  className="mx-auto h-auto w-[80%] lg:w-full"
                />
              </div>
            </div>
          </div>

          {/* Right: paragraph + visual */}
          <div data-parallax="-40">
            <div className="mb-10 text-right lg:mb-24">
              <p className="y-fade y-title inline-block indent-16 text-left text-[15px] leading-none lg:max-w-[78%] lg:text-[17px]">
                It all began in the bustling playgrounds of the 80s, long before our vision truly
                took hold in 2009 with the Ekiden 2000. Drawing from this rich heritage, the OG2K
                expands our running range, offering a silhouette that transcends generations.
                <br />
                <br />
                Alongside the iconic RR2K, it has established itself as the ultimate must-have for
                fans of the &quot;Y2K&quot; trend. Its sleek design focuses on a minimalist aesthetic
                without ever compromising on comfort, at an accessible price point. It is the perfect
                pair for those seeking a precise retro-tech look and absolute lightness for everyday
                wear.
              </p>
            </div>
            <div className="y-fade lg:-mr-16">
              <Image
                src={`${IMG}/og2k-visual-2.jpg`}
                alt="OG2K visual"
                width={1354}
                height={886}
                className="h-auto w-full rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
