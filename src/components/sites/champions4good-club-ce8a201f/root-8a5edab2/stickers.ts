import { gsap } from "gsap";

interface StickerState {
  visible: boolean;
  hideTween: gsap.core.Tween | null;
}

// Port of the source's sticker routine: while the wrap carries
// data-sticker-active, each click drops a random hidden sticker at the pointer
// with a 3D flip-in, and it peels off again after 3s.
export function initStickers(wrap: HTMLElement): () => void {
  const items = Array.from(wrap.querySelectorAll<HTMLElement>("[data-sticker-item]"));
  if (!items.length) return () => {};

  const jitterX = gsap.utils.random(-10, 10, 1, true);
  const jitterY = gsap.utils.random(-10, 10, 1, true);
  const rotation = gsap.utils.random(-40, 40, 1, true);
  const flipY = gsap.utils.random([40, -40], true);
  let zIndex = 1;

  const state = new Map<HTMLElement, StickerState>();
  items.forEach((item) => {
    gsap.set(item, { autoAlpha: 0, transformPerspective: 1000, rotationY: flipY(), scale: 1.35, x: 0, y: 0 });
    state.set(item, { visible: false, hideTween: null });
  });

  const isActive = () =>
    wrap.hasAttribute("data-sticker-active") || wrap.hasAttribute("data-sticker-mobile-active");

  function hide(item: HTMLElement) {
    const s = state.get(item);
    if (!s || !s.visible) return;
    s.visible = false;
    s.hideTween?.kill();
    s.hideTween = null;
    gsap.to(item, {
      autoAlpha: 0,
      rotationY: flipY(),
      scale: 1.35,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "expo.out",
      overwrite: true,
    });
  }

  function syncActive() {
    if (isActive()) return;
    items.forEach(hide);
  }

  function show(item: HTMLElement, event: MouseEvent) {
    const s = state.get(item);
    if (!s || s.visible || !isActive()) return;
    s.visible = true;
    s.hideTween?.kill();
    item.style.zIndex = String(++zIndex);

    const wrapRect = wrap.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const x = event.clientX - wrapRect.left - itemRect.width / 2 + jitterX();
    const y = event.clientY - wrapRect.top - itemRect.height / 2 + jitterY();
    gsap.set(item, { x, y, rotation: rotation() });

    gsap.to(item, {
      keyframes: { "40%": { autoAlpha: 1 }, "90%": { rotationY: 0 }, "100%": { scale: 1 } },
      transformPerspective: 1000,
      duration: 0.4,
      ease: "expo.out",
      overwrite: true,
    });
    s.hideTween = gsap.delayedCall(3, () => hide(item));
  }

  const onClick = (event: MouseEvent) => {
    if (!isActive()) return;
    const hidden = items.filter((item) => !state.get(item)?.visible);
    if (!hidden.length) return;
    show(gsap.utils.random(hidden), event);
  };

  syncActive();
  const observer = new MutationObserver(syncActive);
  observer.observe(wrap, { attributes: true, attributeFilter: ["data-sticker-active"] });
  wrap.addEventListener("click", onClick);

  return () => {
    observer.disconnect();
    wrap.removeEventListener("click", onClick);
    state.forEach((s) => s.hideTween?.kill());
    gsap.killTweensOf(items);
  };
}
