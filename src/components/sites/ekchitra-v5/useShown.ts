import { useEffect, useRef, type RefObject } from "react";

/**
 * Sets `data-shown="true"` on an element when it first scrolls into view, so
 * CSS entry animations play once and the element then stays shown. `prepare`
 * runs just before the entry. Pass `once = false` to remove the flag again
 * when the element has left the screen, so the animation replays on every
 * visit.
 */
export function useShown<T extends HTMLElement>(
  ref: RefObject<T | null>,
  prepare?: (el: T) => void,
  once = true,
) {
  const prepareRef = useRef(prepare);

  useEffect(() => {
    prepareRef.current = prepare;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enter = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || el.dataset.shown === "true") return;
        prepareRef.current?.(el);
        window.requestAnimationFrame(() => {
          el.dataset.shown = "true";
        });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    const leave = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !once) delete el.dataset.shown;
    });

    enter.observe(el);
    leave.observe(el);
    return () => {
      enter.disconnect();
      leave.disconnect();
    };
  }, [ref, once]);
}
