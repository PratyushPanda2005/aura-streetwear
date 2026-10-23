import type { Metadata } from "next";
import Image from "next/image";
import { Hanken_Grotesk, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { HorizontalScroll } from "@/components/sites/pratik/HorizontalScroll";

export const metadata: Metadata = {
  title: "Pratik Panda — I think first",
  description:
    "Pratik Panda, aka Panda — a designer who loves to play with symbols, obsess over design systems, and occasionally get lost in illustrations.",
};

// Stand-ins for the design's licensed faces: Hanken Grotesk for PP Neue
// Montreal (UI labels) and Inter for TWK Lausanne (display + body copy).
const montreal = Hanken_Grotesk({
  variable: "--font-pratik-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const lausanne = Inter({
  variable: "--font-pratik-text",
  subsets: ["latin"],
  weight: ["300", "400", "900"],
  display: "swap",
});

const label = "font-[family-name:var(--font-pratik-ui)] text-[12px] leading-[16px] tracking-[0.12px] whitespace-nowrap";

const navLinks = [
  { label: "playground", href: "#playground" },
  { label: "story", href: "#story" },
  { label: "coffee?", href: "#coffee" },
];

const footerLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Resume", href: "#" },
  { label: "Email", href: "#" },
];

const workCards = [
  { id: "work-1", width: "w-[762px]" },
  { id: "work-2", width: "w-[250px]" },
  { id: "work-3", width: "w-[762px]" },
];

const highlight = "text-[#e3e3e3] underline decoration-from-font [text-underline-position:from-font]";

export default function PratikPage() {
  return (
    <div
      className={cn(
        montreal.variable,
        lausanne.variable,
        "flex h-dvh w-full flex-col overflow-hidden bg-[#131313] font-[family-name:var(--font-pratik-text)]",
      )}
    >
      <header className="flex h-10 shrink-0 items-center justify-between bg-black px-4 md:px-10">
        <p className={cn(label, "flex min-w-0 items-center gap-1")}>
          <span className="font-medium text-[#f4f4f4]">pratik panda</span>
          <span className="text-[#6f6f6f]" aria-hidden="true">
            →
          </span>
          <span className="hidden truncate text-[#6f6f6f] sm:inline">I think first - as simple as that!</span>
        </p>
        <nav aria-label="Primary" className="flex items-center justify-between gap-4 md:w-[640px] md:pl-10">
          <a href="#works" aria-current="page" className={cn(label, "text-[#f4f4f4]")}>
            works
          </a>
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.label} className="flex">
                <a href={link.href} className={cn(label, "text-[#525252] transition-colors hover:text-[#f4f4f4]")}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <HorizontalScroll id="works" className="min-h-0 flex-1">
        <section className="relative flex w-[min(760px,100vw)] shrink-0 flex-col justify-end gap-6 overflow-clip bg-[#131313] p-6 md:w-[760px] md:p-10">
          <Image
            src="/images/pratik/contemplative-figure.png"
            alt=""
            fill
            priority
            sizes="760px"
            className="pointer-events-none object-cover"
          />
          <div className="relative flex w-full max-w-[440px] flex-col gap-4">
            <h1 className="text-[52px] leading-none font-black tracking-[-1.56px] text-[#f4f4f4]">
              human who loves to think first.
            </h1>
            <p className="max-w-[360px] text-[14px] leading-[1.5] tracking-[-0.14px] text-[#666]">
              Hey, I’m Pratik Panda, aka Panda. A designer who loves to play with{" "}
              <span className={highlight}>symbols,</span> obsess over{" "}
              <span className={highlight}>design systems,</span> and occasionally get lost in{" "}
              <span className={highlight}>illustrations.</span>
            </p>
          </div>
        </section>

        <section
          aria-labelledby="case-study-title"
          className="flex w-[min(440px,100vw)] shrink-0 flex-col justify-between overflow-clip bg-[#1c1c1c] p-6 md:w-[440px] md:p-10"
        >
          <div className="flex w-full max-w-[360px] flex-col gap-6 font-light text-[#8d8d8d]">
            <h2 id="case-study-title" className="text-[12px] leading-[16px] tracking-[-0.12px]">
              Built at Verloop - <span className="text-[#e0e0e0]">Outreach Analytics - Desktop</span>
            </h2>
            <div className="flex flex-col gap-2 text-[14px] leading-[1.5] tracking-[-0.14px]">
              <p>
                <span className="text-[#e0e0e0]">34% better outreach outcomes</span> - A powerful tool designed to
                provide comprehensive insights into your outreach efforts on Verloop.
              </p>
              <p>
                It offers a user-friendly interface with detailed analytics and easy-to-understand widgets, helping you
                track and analyse key performance metrics.
              </p>
              <p>
                The dashboard allows you to monitor every single aspect of your outreach campaigns. Filters helps you
                focus on the data most relevant, ensuring precise analysis.
              </p>
            </div>
          </div>
          <div className="flex w-full items-end justify-between">
            <a
              href="#"
              className={cn(
                label,
                "flex h-[22px] items-center gap-0.5 rounded-[4px] bg-[#393939] py-[5px] pr-1 pl-1.5 leading-[12px] font-medium text-white transition-colors hover:bg-[#474747]",
              )}
            >
              Read full case study
              <Image src="/images/pratik/circle-fill.svg" alt="" width={12} height={12} />
            </a>
            <div className="flex flex-col gap-2" aria-hidden="true">
              {["text-[#a8a8a8]", "text-[#6f6f6f]", "text-[#393939]"].map((color) => (
                <span key={color} className="flex h-[10px] w-4 items-center justify-center">
                  <span className={cn(label, "rotate-90", color)}>→</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Works" className="flex shrink-0 items-center gap-6 overflow-clip bg-[#131313] p-10">
          {workCards.map((card) => (
            <div key={card.id} className={cn("h-[542px] max-h-full shrink-0 rounded-[22px] bg-[#181818]", card.width)} />
          ))}
        </section>
      </HorizontalScroll>

      <footer className="flex h-10 shrink-0 items-center gap-4 bg-black px-4 py-2 md:px-10">
        <ul className="flex flex-1 items-center gap-4">
          {footerLinks.map((link) => (
            <li key={link.label} className="flex">
              <a
                href={link.href}
                className={cn(label, "leading-[20px] text-[#6f6f6f] transition-colors hover:text-[#f4f4f4]")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={cn(label, "hidden flex-1 justify-end leading-[20px] text-[#6f6f6f] sm:flex")}>
          Let’s meet at Bangalore, India
        </p>
      </footer>
    </div>
  );
}
