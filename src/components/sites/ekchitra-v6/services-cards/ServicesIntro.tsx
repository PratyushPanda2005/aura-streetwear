import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS, TITLE } from "../../ekchitra-v5/shared";
import { CTA_PHOTOS, INTRO } from "./shared";

/** The photograph behind the box: the bespoke room, art in a space. */
const PHOTO = CTA_PHOTOS.bespoke;

/**
 * The services heading box: the photograph filling it, darkened with brand
 * black so the white type over it reads. Static.
 */
export function ServicesIntro({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate flex min-h-[320px] flex-col justify-between gap-y-10 overflow-hidden bg-(--k-ink) p-5 text-white lg:p-7",
        className,
      )}
    >
      <Image
        src={PHOTO.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 34vw, 100vw"
        className={cn("-z-10 object-cover", PHOTO.position)}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-(--k-ink)/55"
      />

      <p className={cn(CAPS, "text-[11px] text-white/80")}>Services</p>
      <div>
        <h2 className={TITLE}>{INTRO.title}</h2>
        <p className="mt-4 max-w-[380px] text-[15px] leading-[1.45] text-white/85">
          {INTRO.body}
        </p>
      </div>
    </div>
  );
}
