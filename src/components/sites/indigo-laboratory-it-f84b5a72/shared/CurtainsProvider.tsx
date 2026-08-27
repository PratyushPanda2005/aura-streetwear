"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { ReactNode, RefObject } from "react";
import { Curtains, Plane, Vec2 } from "curtainsjs";
import type { Uniform } from "curtainsjs";
import {
  mouseRippleFs,
  mouseRippleVs,
  planeDeformationFs,
  planeDeformationVs,
  transitionRippleFs,
  transitionRippleVs,
} from "./shaders";
import type { IndigoShaderProgram } from "@/types/indigo";

/**
 * One fixed, full-viewport curtains.js canvas shared by every WebGL plane on the
 * page — matching the live site, which mounts a single `#curtains-canvas` at
 * z-index 1 with `pointer-events: none`.
 *
 * Live-site constructor options (read from the bundle):
 *   pixelRatio: Math.min(1.5, devicePixelRatio), watchScroll: false, autoRender: true
 *
 * `watchScroll: false` means plane positions must be refreshed from scroll
 * ourselves — we do that from the shared rAF loop below.
 */

interface CurtainsContextValue {
  register: (el: HTMLElement, program: IndigoShaderProgram) => () => void;
}

const CurtainsContext = createContext<CurtainsContextValue | null>(null);

/** Segment counts per program, as configured on the live site. */
const SEGMENTS: Record<IndigoShaderProgram, number> = {
  "plane-deformation": 10,
  "mouse-ripple": 20,
  "transition-ripple": 10,
};

function shadersFor(program: IndigoShaderProgram) {
  switch (program) {
    case "mouse-ripple":
      return { vertexShader: mouseRippleVs, fragmentShader: mouseRippleFs };
    case "transition-ripple":
      return { vertexShader: transitionRippleVs, fragmentShader: transitionRippleFs };
    default:
      return { vertexShader: planeDeformationVs, fragmentShader: planeDeformationFs };
  }
}

function uniformsFor(
  program: IndigoShaderProgram,
  width: number,
  height: number,
): Record<string, Uniform> {
  switch (program) {
    case "mouse-ripple":
      return {
        resolution: { name: "uResolution", type: "2f" as const, value: [width, height] },
        time: { name: "uTime", type: "1f" as const, value: 0 },
        mousePosition: { name: "uMousePosition", type: "2f" as const, value: [0, 0] },
        mouseMoveStrength: { name: "uMouseMoveStrength", type: "1f" as const, value: 0 },
      };
    case "transition-ripple":
      return {
        time: { name: "uTime", type: "1f" as const, value: 0 },
        fullscreenTransition: { name: "uTransition", type: "1f" as const, value: 0 },
        mousePosition: { name: "uMousePosition", type: "2f" as const, value: [0, 0] },
        opacity: { name: "uOpacity", type: "1f" as const, value: 1 },
      };
    default:
      return {
        planeDeformation: { name: "uPlaneDeformation", type: "1f" as const, value: 0 },
        opacity: { name: "uOpacity", type: "1f" as const, value: 0 },
      };
  }
}

export function CurtainsProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainsRef = useRef<Curtains | null>(null);
  // Elements that asked for a plane before the WebGL context existed.
  const pending = useRef(new Map<HTMLElement, IndigoShaderProgram>());

  // Shared per-frame state driven by pointer + scroll.
  const mouse = useRef(new Vec2(0, 0));
  const lastMouse = useRef(new Vec2(0, 0));
  const strength = useRef(0);
  const deformation = useRef(0);
  const lastScroll = useRef(0);
  const planes = useRef(
    new Map<HTMLElement, { plane: Plane; program: IndigoShaderProgram }>(),
  );

  const createPlane = useCallback((el: HTMLElement, program: IndigoShaderProgram) => {
    const curtains = curtainsRef.current;
    if (!curtains || planes.current.has(el)) return;

    const segments = SEGMENTS[program];
    const plane = new Plane(curtains, el, {
      widthSegments: segments,
      heightSegments: segments,
      ...shadersFor(program),
      uniforms: uniformsFor(program, el.clientWidth || 1, el.clientHeight || 1),
    });

    plane.onReady(() => {
      el.classList.add("-curtains-ready");
      if (program === "plane-deformation") plane.uniforms.opacity.value = 1;
    });

    planes.current.set(el, { plane, program });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    let disposed = false;
    // Goes false the moment the GL context fails, so the scroll handler stops
    // calling into a curtains instance whose renderer never came up.
    let active = true;

    const curtains = new Curtains({
      container: containerRef.current,
      pixelRatio: Math.min(1.5, window.devicePixelRatio),
      watchScroll: false,
      autoRender: true,
    });

    curtains.onError(() => {
      // WebGL unavailable — planes stay unregistered and the DOM images remain
      // visible. Mark the context inactive so onScroll doesn't touch the dead
      // renderer (which would throw on every scroll).
      active = false;
      containerRef.current?.classList.add("-curtains-error");
    });

    curtains.onRender(() => {
      for (const { plane, program } of planes.current.values()) {
        if (program === "plane-deformation") {
          plane.uniforms.planeDeformation.value = deformation.current;
        } else if (program === "mouse-ripple") {
          plane.uniforms.time.value += 1;
          plane.uniforms.mouseMoveStrength.value = strength.current;
          plane.uniforms.mousePosition.value = plane.mouseToPlaneCoords(mouse.current);
        } else {
          plane.uniforms.time.value += 1;
          plane.uniforms.mousePosition.value = plane.mouseToPlaneCoords(mouse.current);
        }
      }
      // Ease the transient drivers back toward rest.
      strength.current += (0 - strength.current) * 0.05;
      deformation.current += (0 - deformation.current) * 0.05;
    });

    curtainsRef.current = curtains;

    // Flush anything that mounted before the context was live.
    if (!disposed) {
      for (const [el, program] of pending.current) createPlane(el, program);
      pending.current.clear();
    }

    const onMove = (e: PointerEvent) => {
      lastMouse.current.copy(mouse.current);
      mouse.current.set(e.clientX, e.clientY);
      const delta = Math.hypot(
        mouse.current.x - lastMouse.current.x,
        mouse.current.y - lastMouse.current.y,
      );
      strength.current = Math.min(strength.current + delta * 0.05, 8);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const velocity = y - lastScroll.current;
      lastScroll.current = y;
      // Feed scroll velocity into the plane-deformation bend.
      deformation.current = Math.max(-60, Math.min(60, velocity * 1.5));
      // Skip the GL sync when the context failed — its renderer is undefined.
      if (active) curtains.updateScrollValues(0, y);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const registered = planes.current;
    return () => {
      disposed = true;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      registered.clear();
      curtains.dispose();
      curtainsRef.current = null;
    };
  }, [createPlane]);

  const register = useCallback(
    (el: HTMLElement, program: IndigoShaderProgram) => {
      if (curtainsRef.current) createPlane(el, program);
      else pending.current.set(el, program);

      return () => {
        pending.current.delete(el);
        const entry = planes.current.get(el);
        if (entry) {
          planes.current.delete(el);
          el.classList.remove("-curtains-ready");
          entry.plane.remove();
        }
      };
    },
    [createPlane],
  );

  const value = useMemo(() => ({ register }), [register]);

  return (
    <CurtainsContext.Provider value={value}>
      <div id="curtains-canvas" ref={containerRef} aria-hidden="true" />
      {children}
    </CurtainsContext.Provider>
  );
}

/**
 * Binds a DOM element to a curtains.js plane using one of the site's three
 * shader programs. The element keeps rendering its normal `<img>`; once the
 * plane is live the global `.-curtains-ready img { visibility: hidden }` rule
 * hides the DOM copy so only the GL plane is visible. That means the component
 * degrades to a plain image if WebGL is unavailable.
 */
export function useCurtainsPlane(
  ref: RefObject<HTMLElement | null>,
  program: IndigoShaderProgram = "plane-deformation",
) {
  const ctx = useContext(CurtainsContext);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ctx) return;
    return ctx.register(el, program);
  }, [ctx, program, ref]);
}
