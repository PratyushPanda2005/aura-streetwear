import Image from "next/image";

import { cn } from "@/lib/utils";

import { SECTION_TITLE } from "./styles";

/**
 * The closing banner every inner v6 page shares, after goodman-gallery.com:
 * a picture as wide as the grid under a dark wash, with a title, an
 * optional line and a small white button centred on it. The whole banner is
 * the link. It brings its own space above and below, so the footer always
 * sits the same distance under it.
 */
export function CtaBanner({
  href,
  title,
  line,
  cta,
  image,
}: {
  href: string;
  title: string;
  line?: string;
  cta: string;
  /** Shown as decoration; the title and button carry the meaning. */
  image: string;
}) {
  const external = href.startsWith("http");
  return (
    <div className="px-4 pt-12 pb-8 lg:px-5 lg:pt-20 lg:pb-10">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="group relative flex min-h-[360px] flex-col items-center justify-center gap-y-4 overflow-hidden px-6 text-center text-white lg:min-h-[480px]"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <span className="absolute inset-0 bg-(--k-ink)/55" />
        <span className={cn(SECTION_TITLE, "relative max-w-[18ch]")}>
          {title}
        </span>
        {line && (
          <span className="relative max-w-[420px] text-[15px] leading-[1.45] text-white/85">
            {line}
          </span>
        )}
        <span className="relative mt-2 bg-white px-4 py-2 text-[13px] text-(--k-ink)">
          {cta}
        </span>
      </a>
    </div>
  );
}
