import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { BODY, CAPS, SANS, TITLE } from "../ekchitra-v5/shared";
import { SmoothScroll } from "./SmoothScroll";
import { TopBar } from "./TopBar";
import { FooterLedger } from "./footer-variants/FooterLedger";
import { GRID, HEAD } from "./styles";

/**
 * The frame every inner v6 page shares: top bar, a full-width banner, the
 * label, a line and the intro with a count, then the page's own content and
 * the shared footer.
 */
export function PageFrame({
  banner,
  label,
  title,
  intro,
  note,
  hideHeading = false,
  nameOnBanner = false,
  children,
}: {
  banner: { src: string; alt: string; position?: string };
  label: string;
  title: string;
  intro: string;
  /** A short line under the intro, e.g. "15 artists represented". */
  note: string;
  /** Keep the heading for screen readers only, so the page's own content follows the banner. */
  hideHeading?: boolean;
  /**
   * Set the title over the banner instead — white, its first word over the
   * rest, at the foot (after goodman-gallery.com's artist pages). The label,
   * intro and note are then left to the page's own content.
   */
  nameOnBanner?: boolean;
  children: ReactNode;
}) {
  return (
    <main className={cn("min-h-svh bg-white text-(--k-ink)", SANS)}>
      <SmoothScroll />
      <TopBar />

      {/* The banner, full width under the top bar. */}
      <div className="relative h-[42svh] min-h-[280px] overflow-hidden bg-(--k-ink) lg:h-[52svh]">
        <Image
          src={banner.src}
          alt={banner.alt}
          fill
          priority
          sizes="100vw"
          className={cn("object-cover", banner.position)}
        />
        {nameOnBanner && (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent"
            />
            <h1 className="absolute bottom-5 left-4 text-[40px] leading-[0.95] font-medium tracking-[-0.04em] text-white lg:bottom-8 lg:left-5 lg:text-[4.2vw]">
              <span className="block">{title.split(" ")[0]}</span>
              {title.includes(" ") && (
                <span className="block">
                  {title.split(" ").slice(1).join(" ")}
                </span>
              )}
            </h1>
          </>
        )}
      </div>

      {nameOnBanner ? null : hideHeading ? (
        <h1 className="sr-only">{title}</h1>
      ) : (
        <div className={cn(GRID, HEAD, "gap-y-6")}>
          <div className="col-span-4 lg:col-span-7">
            <p className={cn(CAPS, "text-[12px]")}>{label}</p>
            <h1 className={cn(TITLE, "mt-3")}>{title}</h1>
          </div>
          <div className="col-span-4 flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className={cn(BODY, "text-(--k-ink)/80")}>{intro}</p>
            <p className="mt-2 text-[13px] tabular-nums">{note}</p>
          </div>
        </div>
      )}

      {children}
      <FooterLedger />
    </main>
  );
}
