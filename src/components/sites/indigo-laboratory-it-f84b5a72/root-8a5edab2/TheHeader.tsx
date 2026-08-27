"use client";

import { useEffect, useState } from "react";
import { Btn } from "../shared/Btn";
import { LogoIcon, SoundIcon } from "../shared/icons";
import { scrollToY } from "../shared/lenis";

/**
 * Fixed site header. `mix-blend-mode: difference` over white text means it
 * inverts against whatever scrolls beneath it, so no per-section colour logic
 * exists anywhere on the page.
 *
 * Measured: fixed; top 20px; padding 0 20px; z-index 10;
 * height 163.719px at scroll 0, collapsing to 20px once scrolled.
 */

/** Logo collapse fires between scrollY 150 and 200 on the live site. */
const COLLAPSE_AT = 175;

export function TheHeader({ soundLabel = "With sound" }: { soundLabel?: string }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > COLLAPSE_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-5 z-10 flex justify-between px-5 text-white mix-blend-difference"
      style={{ height: collapsed ? 20 : 163.719 }}
    >
      <div className="w-[82px] text-left">
        <Btn size="small">The studio</Btn>
      </div>

      <div className="flex w-[440px] flex-col items-center gap-8">
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => scrollToY(0)}
          className="block w-full cursor-pointer overflow-hidden transition-[height,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            height: collapsed ? 0 : 111.719,
            opacity: collapsed ? 0 : 1,
          }}
        >
          <LogoIcon className="block mx-auto h-[111.719px] w-auto" />
        </button>

        <Btn size="big" icon={<SoundIcon className="block h-4 w-4" />}>
          {soundLabel}
        </Btn>
      </div>

      <div className="w-[82px] text-right">
        <Btn size="small">Contact</Btn>
      </div>
    </header>
  );
}
