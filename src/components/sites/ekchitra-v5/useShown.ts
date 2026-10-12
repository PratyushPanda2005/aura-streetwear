import { useEffect, useRef, type RefObject } from "react";

/**
 * Sets `data-shown="true"` on an element each time it scrolls into view and
 * removes it once the element has left the screen completely, so CSS entry
 * animations replay on every visit. `prepare` runs just before each entry.
 */
export function useShown<T extends HTMLElement>(
  ref: RefObject<T | null>,
  prepare?: (el: T) => void,
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
      if (!entry.isIntersecting) delete el.dataset.shown;
    });

    enter.observe(el);
    leave.observe(el);
    return () => {
      enter.disconnect();
      leave.disconnect();
    };
  }, [ref]);
}
