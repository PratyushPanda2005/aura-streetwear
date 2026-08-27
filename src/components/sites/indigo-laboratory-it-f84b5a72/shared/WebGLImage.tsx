"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useCurtainsPlane } from "./CurtainsProvider";
import type { IndigoImage, IndigoShaderProgram } from "@/types/indigo";

/**
 * The site's `picture.base-image` primitive.
 *
 * Renders a normal responsive image and, when a shader program is given, binds
 * the `<picture>` to a curtains.js plane — mirroring the live site, where the
 * plane host is the `<picture>` and `.-curtains-ready img { visibility: hidden }`
 * hides the DOM copy once the GL plane takes over. With WebGL unavailable the
 * class is never added, so the plain image stays visible.
 */
export function WebGLImage({
  image,
  program,
  className,
  imgClassName,
  sizes,
  priority = false,
  style,
}: {
  image: IndigoImage;
  /** Omit to render a plain image with no WebGL plane. */
  program?: IndigoShaderProgram;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useCurtainsPlane(ref, program ?? "plane-deformation");

  const aspect =
    image.width && image.height ? `${image.width} / ${image.height}` : undefined;

  return (
    <picture
      ref={ref}
      className={cn("base-image relative block", className)}
      style={{ aspectRatio: aspect, ...style }}
      data-sampler="planeTexture"
    >
      <img
        src={image.src}
        alt={image.alt ?? ""}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        data-sampler="planeTexture"
        className={cn("block h-full w-full object-cover", imgClassName)}
      />
    </picture>
  );
}
