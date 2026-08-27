import { RevealText } from "../shared/RevealText";
import { WebGLImage } from "../shared/WebGLImage";
import type { IndigoTaleOutro } from "@/types/indigo";

const SHOP_URL = "#shop";
const MAIL_URL = "mailto:contact@atelier-aura.com";

/** Filled black pill — the site's `.btn--contained.btn--black`. */
function BlackPill({
  children,
  href,
  big = false,
}: {
  children: React.ReactNode;
  href?: string;
  big?: boolean;
}) {
  const cls =
    "relative inline-flex shrink-0 items-center gap-1 overflow-hidden px-0.5 " +
    "bg-[#030303] text-white cursor-pointer " +
    "transition-[background-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const text = big
    ? "block whitespace-nowrap text-[50px] leading-[44px] tracking-[-3px] uppercase"
    : "block whitespace-nowrap text-[16px] leading-5 tracking-[-0.96px] uppercase";

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        <span className={text}>{children}</span>
      </a>
    );
  }
  return (
    <button type="button" className={cls}>
      <span className={text}>{children}</span>
    </button>
  );
}

/**
 * Chapter outro. The 900px transparent top padding is what re-reveals the
 * chapter's sticky cover; `__inner` is opaque beige so it occludes it again.
 */
export function TaleOutro({ outro }: { outro: IndigoTaleOutro }) {
  return (
    <section className="relative w-full pt-[900px]">
      <div className="mx-auto flex max-w-[1640px] flex-col gap-[30px] overflow-hidden bg-[#f4f3eb] lg:h-[620px] lg:flex-row">
        {/* Copy + maker button */}
        <div className="flex-1 px-5 pt-8 lg:pr-0 lg:pl-5">
          <RevealText
            as="p"
            type="lines"
            className="text-[30px] leading-9 tracking-[-1.8px]"
          >
            {outro.abstract}
          </RevealText>
          <div className="mt-5">
            <BlackPill>The maker</BlackPill>
          </div>
        </div>

        {/* Bottom-right aligned shop links */}
        <div className="flex flex-1 flex-col justify-end px-5 pb-[18px] text-right lg:px-0">
          <div>
            <BlackPill href={SHOP_URL} big>
              Shop online
            </BlackPill>
          </div>
          <div>
            <BlackPill href={MAIL_URL} big>
              Let&apos;s talk
            </BlackPill>
          </div>
        </div>

        {/* Maker portrait + caption */}
        <div className="flex flex-1 flex-col">
          <WebGLImage
            image={outro.image}
            program="plane-deformation"
            className="w-full flex-1"
            sizes="(min-width: 1024px) 460px, 100vw"
          />
          <p className="text-center font-mono text-[14px] leading-[18px] uppercase">
            The maker
          </p>
        </div>
      </div>
    </section>
  );
}
