"use client";

import { WebGLImage } from "../shared/WebGLImage";
import type { IndigoProductGallery } from "@/types/indigo";

/**
 * "THE COLLECTION" — a centred row of product cards.
 *
 * Measured: section 392px, padding 0 20px. Title is IBM Plex Mono 16/18 uppercase,
 * centred, margin-bottom 40px. The list is `flex; justify-center; gap: 32px;
 * padding-bottom: 40px`; each item is 206.672 x 293.719 with a WebGL image
 * (aspect-ratio 1610/2148) and a 14px IBM Plex Mono caption below.
 * Items link to the shop and are `cursor: pointer` on desktop.
 */
export function TaleProductGallery({
  gallery,
}: {
  gallery: IndigoProductGallery;
}) {
  return (
    <section className="relative w-full px-5 bg-[#f4f3eb] text-[#030303]">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-10 text-center font-mono text-[16px] leading-[18px] uppercase">
          {gallery.title}
        </h2>

        <ul className="flex flex-wrap justify-center gap-8 pb-10">
          {gallery.gallery.map((product) => {
            const card = (
              <>
                <WebGLImage
                  image={product.image}
                  program="plane-deformation"
                  className="w-full"
                  imgClassName="aspect-[1610/2148]"
                  sizes="207px"
                />
                <h3 className="mt-4 text-center font-mono text-[14px] leading-[18px] uppercase">
                  {product.title}
                </h3>
              </>
            );

            return (
              <li key={product.title} className="w-[206.672px] cursor-pointer">
                {product.shopLink ? (
                  <a
                    href={product.shopLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
