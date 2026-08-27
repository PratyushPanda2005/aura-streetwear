"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * The site's single breakpoint is `min-width: 64em` (1024px); `-is-desktop`
 * and `-is-mobile` variants switch there.
 */
export const DESKTOP_QUERY = "(min-width: 64em)";

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    // Server render: assume mobile so desktop-only chrome is never in the SSR HTML.
    () => false,
  );
}

export function useIsDesktop() {
  return useMediaQuery(DESKTOP_QUERY);
}
