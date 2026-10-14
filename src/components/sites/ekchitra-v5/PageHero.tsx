import Image from "next/image";

import { cn } from "@/lib/utils";

import { Progress } from "../ekchitra-v4/Progress";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { InView } from "./InView";
import { BODY, CAPS, DISPLAY, GUTTER, SANS } from "./shared";

/**
 * Top of an inner page: a wide picture set in from the page edges, which wipes
 * open on arrival and moves a little slower than the page, with the page's label
 * and a two-line title over its centre. Below it, a line of introduction and a
 * short note centred in white space, with the diamond motif on the left edge
 * (left out when the page opens with its own introduction).
 */
export function PageHero({
  label,
  title,
  image,
  intro,
  note,
  once = false,
}: {
  label: string;
  title: string[];
  image: { src: string; alt: string };
  intro?: string;
  note?: string;
  /** Play the text entrances only the first time they are seen. */
  once?: boolean;
}) {
  return (
    <section className={cn("pt-[60px] lg:pt-[68px]", SANS)}>
      <Progress className={GUTTER}>
        <InView>
          <div className="ek5-wipe relative h-[52svh] min-h-[340px] overflow-hidden bg-(--k-ink) lg:h-[64svh]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-(--k-ink)/35" />
            <div className="absolute inset-0 flex translate-y-[calc((var(--p,0.5)_-_0.5)_*_60px)] flex-col items-center justify-center px-4 text-center text-white">
              <p className={CAPS}>
                <Chars once={once} text={label} />
              </p>
              <h1
                className={cn(
                  DISPLAY,
                  "mt-4 text-[44px] leading-[1.05] lg:text-[72px]",
                )}
              >
                <Chars once={once} text={title} />
              </h1>
            </div>
          </div>
        </InView>
      </Progress>

      {intro && (
        <div className="relative flex flex-col items-center px-4 pt-20 pb-14 text-center lg:pt-[110px] lg:pb-20">
          <Diamonds
            rows={16}
            shape="scatter"
            tint="maroon"
            className="absolute top-10 left-0 w-[56px] text-(--k-sky) lg:w-[100px]"
          />
          <h2
            className={cn(
              DISPLAY,
              "max-w-[620px] text-[28px] leading-[1.15] lg:text-[40px]",
            )}
          >
            <Chars once={once} text={intro} />
          </h2>
          <p className={cn(BODY, "mt-5 text-(--k-ink)/60")}>
            {note && <Chars once={once} text={note} />}
          </p>
        </div>
      )}
    </section>
  );
}
