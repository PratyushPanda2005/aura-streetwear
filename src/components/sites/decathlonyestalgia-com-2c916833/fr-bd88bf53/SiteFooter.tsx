"use client";

import Image from "next/image";
import { Shape } from "./Shapes";
import { IMG } from "./data";

export function SiteFooter() {
  return (
    <footer className="c-footer relative z-10 flex h-svh min-h-[600px] flex-col items-center justify-center overflow-clip bg-[var(--y-pink-200)]">
      {/* background texture */}
      <Shape name="diagonal-lines" className="absolute inset-0 -z-[1] h-full w-full object-cover opacity-30" />

      {/* decorations */}
      <Shape name="flower-yellow" className="y-spin-slow absolute top-[18%] left-[10%] w-[10vw] max-w-[120px]" />
      <Shape name="tri-grad-lg" className="absolute right-[8%] bottom-[28%] w-[10vw] max-w-[120px]" />
      <Shape name="sparkle" className="y-spin absolute top-[24%] right-[16%] w-[40px]" />

      <div className="relative z-10 grid grow items-center">
        <Image
          src={`${IMG}/yestalgia-footer.jpg`}
          alt="Decathlon Yestalgia"
          width={1172}
          height={584}
          className="mx-auto h-auto w-[90%] lg:w-[35vw]"
        />
      </div>

      <nav className="relative z-10 pb-10 text-center lg:absolute lg:inset-x-0 lg:bottom-12">
        <ul className="flex w-full flex-col justify-center gap-x-6 gap-y-6 text-[14px] leading-none uppercase lg:flex-row">
          <li>
            <a
              href="https://decathlonyestalgia.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="y-title transition-colors hover:text-white"
            >
              Legal notice
            </a>
          </li>
          <li>
            <a
              href="https://index.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="y-title transition-colors hover:text-white"
            >
              Credits
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
