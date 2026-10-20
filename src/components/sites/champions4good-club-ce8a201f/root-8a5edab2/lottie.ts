import type { AnimationItem } from "lottie-web";

export const ASSET_BASE = "/sites/champions4good-club-ce8a201f/root-8a5edab2";

// Webflow's Lottie plugin seeks with this (untyped) AnimationItem method.
export type ScrubbableAnimation = AnimationItem & {
  setCurrentRawFrameValue(value: number): void;
};

interface LoadOptions {
  loop: boolean;
  autoplay: boolean;
  preserveAspectRatio?: string;
}

// Mirrors Webflow's lottie instance config: svg renderer, progressive load,
// hideOnTransparent. lottie-web touches `document` at import, so load lazily.
export async function loadLottie(
  container: HTMLElement,
  path: string,
  { loop, autoplay, preserveAspectRatio = "xMidYMid meet" }: LoadOptions,
): Promise<ScrubbableAnimation> {
  const { default: lottie } = await import("lottie-web");
  return lottie.loadAnimation({
    container,
    path,
    loop,
    autoplay,
    renderer: "svg",
    rendererSettings: {
      preserveAspectRatio,
      progressiveLoad: true,
      hideOnTransparent: true,
    },
  }) as ScrubbableAnimation;
}

// Webflow IX2 PLUGIN_LOTTIE: value 0–100 maps to a raw (sub)frame.
export function seekPercent(anim: ScrubbableAnimation | null, value: number) {
  if (!anim || !anim.totalFrames) return;
  anim.setCurrentRawFrameValue(anim.totalFrames * (value / 100));
}
