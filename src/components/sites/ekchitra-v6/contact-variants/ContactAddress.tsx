"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { BUTTON } from "../styles";
import { SOCIAL } from "../data";
import { DETAILS, EMAIL_LINES, REF_PICTURES } from "./shared";

const LINK = "hover:underline hover:underline-offset-4";

/** How far the window moves towards the cursor each frame, 0–1. */
const EASE = 0.12;

/**
 * Layout 03 — after lefruitstudio.fr/en/contact. One screen on white (on
 * desktop exactly; the big type is sized to the width, or on short screens to
 * the height left after the fixed parts, about 430px, so it always fits): the
 * word "Contact" huge at the top left; the address, numbers, hours and the
 * way there low in the left column; the socials small at the right; and the
 * email set enormous and bold across the foot, flush right, its name over
 * its domain.
 *
 * The photograph is laid over the whole screen but seen only through a
 * square window, as the circle on the reference: the window rests in the
 * middle and, with a mouse, trails the cursor (a small dot stands in for
 * the pointer), showing whichever part of the picture is under it, with the
 * type always on top. Over the email it closes and an outline square rings
 * the cursor instead. Phones and touch screens see the square photograph
 * fixed in the middle column.
 */
export function ContactAddress({
  page = false,
}: {
  /**
   * As the contact page itself: under the 44px top bar, so one screen is the
   * height below it, and "Contact" is the page's h1.
   */
  page?: boolean;
}) {
  const Heading = page ? "h1" : "h2";
  const sectionRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lens = lensRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!section || !lens || !dot || !ring) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Where the window is and where it's heading: centre, and open (1) or closed (0).
    const now = { x: 0, y: 0, open: 1 };
    const to = { x: 0, y: 0, open: 1 };
    let frame = 0;

    const centre = () => {
      to.x = section.clientWidth / 2;
      to.y = section.clientHeight / 2;
    };

    const draw = () => {
      const k = still ? 1 : EASE;
      now.x += (to.x - now.x) * k;
      now.y += (to.y - now.y) * k;
      now.open += (to.open - now.open) * k;
      // Half the window's side: 12vw, as the reference's circle is 24vw across.
      const half = window.innerWidth * 0.12 * now.open;
      const w = section.clientWidth;
      const h = section.clientHeight;
      lens.style.clipPath = `inset(${now.y - half}px ${w - now.x - half}px ${h - now.y - half}px ${now.x - half}px)`;
      const settled =
        Math.abs(to.x - now.x) < 0.5 &&
        Math.abs(to.y - now.y) < 0.5 &&
        Math.abs(to.open - now.open) < 0.005;
      frame = settled ? 0 : requestAnimationFrame(draw);
    };
    const go = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const box = section.getBoundingClientRect();
      to.x = event.clientX - box.left;
      to.y = event.clientY - box.top;
      const overEmail = !!(event.target as Element).closest("[data-ring]");
      to.open = overEmail ? 0 : 1;
      dot.style.transform = `translate(${to.x}px, ${to.y}px)`;
      ring.style.transform = `translate(${to.x}px, ${to.y}px)`;
      dot.style.opacity = "1";
      ring.style.opacity = overEmail ? "1" : "0";
      go();
    };
    const onLeave = () => {
      centre();
      to.open = 1;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      go();
    };

    centre();
    now.x = to.x;
    now.y = to.y;
    draw();
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Contact details"
      className={cn(
        "relative isolate flex min-h-(--screen) flex-col overflow-hidden lg:h-(--screen) lg:min-h-[600px] bg-white px-4 py-10 text-(--k-ink) lg:px-5 lg:py-12 lg:pointer-fine:cursor-none lg:pointer-fine:[&_a]:cursor-none",
        // One screen: the whole of it, or what's below the top bar.
        page ? "[--screen:calc(100svh-44px)]" : "[--screen:100svh]",
        SANS,
      )}
    >
      {/* The photograph across the whole screen, seen through the window. */}
      <div
        ref={lensRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden [clip-path:inset(calc(50%-12vw)_calc(50%-12vw))] lg:pointer-fine:block"
      >
        <Image
          src={REF_PICTURES.lefruit.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* The pointer: a dot, and a square ring over the email. */}
      <span
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-30 -mt-[3px] -ml-[3px] hidden size-1.5 bg-(--k-ink) opacity-0 lg:pointer-fine:block"
      />
      <span
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-30 -mt-12 -ml-12 hidden size-24 border border-(--k-ink) opacity-0 transition-opacity duration-300 lg:pointer-fine:block"
      />

      <Heading className="text-[22vw] leading-[0.85] font-normal tracking-[-0.06em] uppercase lg:text-[min(10vw,calc((var(--screen)-430px)/2.65))]">
        Contact
      </Heading>

      <div className="mt-6 grid flex-1 grid-cols-4 gap-x-4 gap-y-6 lg:grid-cols-12 lg:gap-x-5">
        {/* Details, low in the left column. */}
        <div className="col-span-4 space-y-6 self-end text-[18px] leading-[1.4] tracking-[-0.01em] lg:col-span-3 lg:row-start-1 lg:text-[19px]">
          <address className="not-italic">
            {DETAILS.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p>
            T :{" "}
            <a
              href={`tel:${DETAILS.phone.replace(/\s/g, "")}`}
              className={LINK}
            >
              {DETAILS.phone}
            </a>
            <span className="block text-(--k-ink)/65">
              {DETAILS.hours.days}, {DETAILS.hours.time}
            </span>
          </p>
          <a
            href={DETAILS.directions}
            target="_blank"
            rel="noreferrer"
            className={BUTTON}
          >
            Get Directions
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* The photograph, square and centred — where there's no mouse to
            move the window. */}
        <div className="col-span-4 lg:col-span-4 lg:col-start-5 lg:row-start-1 lg:pointer-fine:hidden">
          <div className="relative mx-auto aspect-square w-[70vw] overflow-hidden sm:w-[44vw] lg:w-[24vw]">
            <Image
              src={REF_PICTURES.lefruit.src}
              alt={REF_PICTURES.lefruit.alt}
              fill
              sizes="(min-width: 1024px) 28vw, 70vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Socials, small at the top right. */}
        <ul
          className={cn(
            CAPS,
            "col-span-4 space-y-3 text-[11px] lg:col-span-2 lg:col-start-10 lg:row-start-1",
          )}
        >
          {SOCIAL.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={LINK}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* The email, enormous across the foot. */}
      <div className="mt-6 flex flex-col items-end">
        <p className={cn(CAPS, "mb-3 text-[11px]")}>Write to us</p>
        <a
          data-ring
          href={`mailto:${DETAILS.email}`}
          className="text-right text-[15.5vw] leading-[0.95] font-bold tracking-[-0.05em] lg:text-[min(9.5vw,calc((var(--screen)-430px)/2.8))]"
        >
          {EMAIL_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </a>
      </div>
    </section>
  );
}
