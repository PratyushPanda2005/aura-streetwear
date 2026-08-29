import Image from "next/image";
import { RippleReveal } from "./RippleReveal";

const LOGO_SRC =
  "/sites/bleibtgleich-dev-e2516dcc/root-8a5edab2/images/port-logo.png";

const FONT_STACK = '"Helvetica Neue", "Akzidenz Grotesk Pro", Arial, sans-serif';

/** Per-character vertical letter-roll on hover — replica of the site's GSAP SplitText labels. */
function LetterRoll({ text }: { text: string }) {
  return (
    <span className="group inline-flex cursor-pointer align-baseline">
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="relative inline-block overflow-hidden"
          style={{ height: "1em", lineHeight: 1 }}
        >
          <span
            className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2"
            style={{ transitionDelay: `${i * 22}ms` }}
          >
            <span style={{ height: "1em", lineHeight: "1em" }}>
              {ch === " " ? " " : ch}
            </span>
            <span aria-hidden style={{ height: "1em", lineHeight: "1em" }}>
              {ch === " " ? " " : ch}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-white text-black select-none"
      style={{ fontFamily: FONT_STACK }}
    >
      {/* WebGL water-splash reveal — white at rest, project imagery revealed under the cursor */}
      <RippleReveal className="absolute inset-0 z-0 h-full w-full" />

      {/* Foreground UI */}
      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-between p-4 md:p-6">
        {/* Top bar */}
        <header className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            {/* Portrait silhouette logo */}
            <Image
              src={LOGO_SRC}
              alt="Pixel Panda logo"
              width={52}
              height={52}
              priority
              className="h-[42px] w-[42px] object-contain md:h-[52px] md:w-[52px]"
            />
            <div className="border-l border-black/20 pl-6 text-[13px] font-medium leading-[1.15] tracking-tight">
              <p>Based in India</p>
              <p className="flex gap-1">
                <span>Open for</span>
                <a href="#contact" className="pointer-events-auto">
                  <LetterRoll text="work" />
                </a>
              </p>
            </div>
          </div>

          <button
            type="button"
            className="pointer-events-auto rounded-full bg-black px-4 py-1.5 text-[13px] font-medium text-white"
          >
            <LetterRoll text="Menu" />
          </button>
        </header>

        {/* Centre headline */}
        <div className="mx-auto -mt-8 w-full max-w-[900px] text-center">
          <h1
            className="font-medium leading-[0.88] tracking-[-0.045em]"
            style={{ fontSize: "clamp(48px, 8.5vw, 118px)" }}
          >
            <span className="block">Panda.</span>
          </h1>
          <p className="mt-6 text-[13px] font-medium uppercase tracking-tight text-black/70">
            Pratyush Panda 🐼 Creative Developer
          </p>
        </div>

        {/* Bottom row */}
        <footer className="flex items-end justify-between">
          <span className="text-2xl font-medium tracking-tight text-black/10 md:text-4xl">
            pixel
          </span>
          <span className="text-[12px] font-medium uppercase tracking-tight text-black/40">
            (move your cursor)
          </span>
          <span className="text-2xl font-medium tracking-tight text-black/10 md:text-4xl">
            panda
          </span>
        </footer>
      </div>
    </section>
  );
}
