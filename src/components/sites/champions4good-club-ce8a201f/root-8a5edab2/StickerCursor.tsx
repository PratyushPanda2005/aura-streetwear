"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// "CLICK!" badge that trails the pointer and pops in over any [data-sticker]
// wrap inside `.c4g`. Desktop only (hidden ≤991px via CSS).
export function StickerCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const item = itemRef.current;
    if (!cursor || !item) return;

    gsap.set(cursor, { xPercent: 15, yPercent: 15 });
    gsap.set(item, { opacity: 0, scale: 0.5 });
    const toX = gsap.quickTo(cursor, "x", { ease: "power4" });
    const toY = gsap.quickTo(cursor, "y", { ease: "power4" });

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { xPercent: 15, yPercent: 15, duration: 0.8, ease: "power4" });
      toX(e.clientX);
      toY(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    const cleanups = Array.from(document.querySelectorAll<HTMLElement>(".c4g [data-sticker]")).map((wrap) => {
      let pressTween: gsap.core.Tween | undefined;
      let visTween: gsap.core.Tween | undefined;
      const release = () => {
        pressTween?.kill();
        pressTween = gsap.to(item, { scale: 1, duration: 0.95, ease: "elastic.out", overwrite: true });
      };
      const onEnter = () => {
        visTween?.kill();
        visTween = gsap.to(item, { opacity: 1, scale: 1, duration: 0.35, ease: "expo.out", delay: 0.1 });
      };
      const onLeave = (e: MouseEvent) => {
        if (e.buttons === 1) release();
        visTween?.kill();
        visTween = gsap.to(item, { opacity: 0, scale: 0.5, duration: 0.35, ease: "expo.out" });
      };
      const onDown = () => {
        pressTween?.kill();
        pressTween = gsap.to(item, { scale: 0.9, duration: 0.15, ease: "power2.out", overwrite: true });
      };
      wrap.addEventListener("mouseenter", onEnter);
      wrap.addEventListener("mouseleave", onLeave);
      wrap.addEventListener("mousedown", onDown);
      wrap.addEventListener("mouseup", release);
      return () => {
        wrap.removeEventListener("mouseenter", onEnter);
        wrap.removeEventListener("mouseleave", onLeave);
        wrap.removeEventListener("mousedown", onDown);
        wrap.removeEventListener("mouseup", release);
      };
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cleanups.forEach((fn) => fn());
      gsap.killTweensOf([cursor, item]);
    };
  }, []);

  return (
    <div ref={cursorRef} className="c4g-cursor" aria-hidden="true">
      <div ref={itemRef} className="c4g-cursor-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 23" width="100%" className="c4g-cursor-svg">
          <path
            fill="#fff"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.94 0c.537 0 1.065.055 1.569.174h12.82v.027A6.769 6.769 0 0 1 22.012 0h.525c.537 0 1.065.055 1.568.174H39l-.046 2.118c-.014.623-.206 3.738-.394 6.926-.134 2.276-.267 4.61-.343 6.254h.437v7.354H24.027v-.002c-.47.116-.968.176-1.49.176h-.501a7.01 7.01 0 0 1-1.707-.198v.024H7.431v-.002c-.47.116-.969.176-1.49.176h-.502c-1.561 0-3.052-.433-4.114-1.598C.299 20.276 0 18.819 0 17.470V5.405c.016-1.243.313-2.643 1.293-3.75C2.320.495 3.790 0 5.415 0h.526Z"
          />
          <path
            fill="#121212"
            d="M33.59 2.247h3.28c-.026 1.145-.752 12.163-.802 14.875h-1.702c-.05-2.712-.776-13.730-.776-14.875Zm2.979 15.297v3.210h-2.703v-3.210h2.703ZM29.267 20.753h-3.154V2.247h3.154l-.026 6.666 1.052-6.666h3.153L31.920 10.630l1.602 10.123h-3.304l-.977-7.288.026 7.288ZM22.262 18.216c.275 0 .325-.224.325-.522v-5.398h3.104v5.472c0 1.667-.927 3.160-3.154 3.160h-.5c-2.378 0-3.355-1.294-3.355-3.458V5.430c.025-1.940.927-3.358 3.330-3.358h.525c2.202 0 3.154 1.194 3.154 3.010v4.900h-3.104v-4.800c0-.3-.05-.473-.325-.473-.25 0-.326.15-.326.472v12.512c0 .323.075.522.326.522ZM18.244 2.247v18.506h-3.180V2.247h3.180ZM9.516 2.247h3.154l.025 15.571h2.002l-.025 2.935H9.516V2.247ZM5.665 18.216c.275 0 .325-.224.325-.522v-5.398h3.104v5.472c0 1.667-.926 3.160-3.154 3.160h-.5c-2.378 0-3.354-1.294-3.354-3.458V5.430c.025-1.940.926-3.358 3.329-3.358h.525c2.203 0 3.154 1.194 3.154 3.010v4.900H5.990v-4.800c0-.3-.05-.473-.325-.473-.25 0-.325.15-.325.472v12.512c0 .323.075.522.325.522Z"
          />
        </svg>
      </div>
    </div>
  );
}
