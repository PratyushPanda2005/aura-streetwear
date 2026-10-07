import Image from "next/image";

import { cn } from "@/lib/utils";

import { FONT } from "./tokens";
import { Heading, Label, Text } from "./Typography";

type PageBannerProps = {
  label: string;
  heading: string;
  /** Short line under the heading, e.g. "15 artists". */
  meta?: string;
  image: { src: string; alt: string; caption?: string };
};

/**
 * Page banner for inner pages: a photograph or artwork detail under a dark
 * scrim, with the page label, heading and a line of meta set on top.
 */
export function PageBanner({ label, heading, meta, image }: PageBannerProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[380px] items-end overflow-hidden bg-[#191919] lg:min-h-[480px]",
        FONT.sans,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/55 to-black/35" />
      <div className="relative w-full px-[17px] pt-24 pb-10 text-white lg:px-[69px] lg:pb-14">
        <Label as="p">{label}</Label>
        <Heading as="h1" className="mt-3 max-w-[980px]">
          {heading}
        </Heading>
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          {meta ? (
            <Text size="sm" className="text-white/80 uppercase">
              {meta}
            </Text>
          ) : null}
          {image.caption ? (
            <Text size="sm" className="text-white/60">
              {image.caption}
            </Text>
          ) : null}
        </div>
      </div>
    </div>
  );
}
