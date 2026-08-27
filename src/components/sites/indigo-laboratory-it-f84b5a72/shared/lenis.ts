import type Lenis from "lenis";

/**
 * The Lenis package augments `Window.lenis` with its own debug-info shape, so
 * the instance the site exposes has to be read through a cast rather than by
 * re-declaring the global.
 */
export function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { lenis?: Lenis }).lenis;
}

export function setLenis(instance: Lenis | undefined) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { lenis?: Lenis };
  if (instance) w.lenis = instance;
  else delete w.lenis;
}

/** Smooth-scroll to an absolute offset, falling back to native scrolling. */
export function scrollToY(y: number) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** Smooth-scroll to an element by id (the chapter anchors use this). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
