"use client";

import { useState } from "react";
import Image from "next/image";
import { products, type Product } from "./data";
import { cn } from "@/lib/utils";

function Media({ product, active }: { product: Product; active: number }) {
  return (
    <>
      {product.media.map((m, i) =>
        m.kind === "video" ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            key={i}
            src={m.src}
            autoPlay
            muted
            loop
            playsInline
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              active === i ? "opacity-100" : "opacity-0",
            )}
          />
        ) : (
          <Image
            key={i}
            src={m.src}
            alt={product.name}
            fill
            sizes="(min-width:1024px) 33vw, 50vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              active === i ? "opacity-100" : "opacity-0",
            )}
          />
        ),
      )}
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  return (
    <div className="y-fade group flex flex-col">
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-[var(--y-beige)]"
        onMouseLeave={() => setActive(0)}
      >
        <Media product={product} active={active} />
      </a>
      <div className="mt-3 flex items-start justify-between gap-2">
        <a
          href={product.href}
          target="_blank"
          rel="noreferrer"
          className="y-title text-[15px] leading-none tracking-tight"
        >
          {product.name}
        </a>
        <p className="y-title shrink-0 text-[15px] leading-none">{product.price}</p>
      </div>
      {product.colors.length > 1 && (
        <div className="mt-2 flex gap-1.5">
          {product.colors.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Variante ${i + 1}`}
              onMouseEnter={() => setActive(Math.min(i, product.media.length - 1))}
              onClick={() => setActive(Math.min(i, product.media.length - 1))}
              className={cn(
                "size-3.5 rounded-full border border-black/60 transition-transform",
                active === i && "scale-110 ring-1 ring-black",
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductGrid() {
  return (
    <section
      id="collection"
      className="c-products relative z-20 overflow-x-clip bg-[var(--y-pink-100)] pb-24"
    >
      <div className="mx-auto max-w-[1500px] px-5 lg:px-30">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {products.map((p) => (
            <ProductCard key={p.index} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
