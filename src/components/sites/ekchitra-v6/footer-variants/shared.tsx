import { cn } from "@/lib/utils";

import { FOOTER } from "../../ekchitra-redesign/data";
import { CAPS } from "../../ekchitra-v5/shared";
import { CONTACT, SOCIAL, V6_NAV } from "../data";

export { CONTACT, FOOTER, SOCIAL, V6_NAV };

/** Every footer variation fills one screen. */
export const SCREEN =
  "relative flex h-svh min-h-[640px] flex-col overflow-hidden";

/** Grouped links shared by the variations. */
export const LINK_GROUPS = [
  { title: "Gallery", links: V6_NAV },
  {
    title: "Connect",
    links: SOCIAL.map((link) => ({ ...link, external: true })),
  },
  {
    title: "Visit",
    links: [] as { label: string; href: string }[],
    note: FOOTER.location.note,
  },
];

/** A plain list of links; external ones open in a new tab with an arrow. */
export function LinkList({
  links,
  className,
}: {
  links: { label: string; href: string; external?: boolean }[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-1", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="transition-opacity hover:opacity-60"
          >
            {link.label}
            {link.external && <span aria-hidden="true"> ↗</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Small capitals heading over a group of links. */
export function GroupTitle({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <p className={cn(CAPS, "text-[10px]", className)}>{children}</p>;
}

/**
 * The name set as text the way the logo is drawn — "Ek" extra-bold and
 * "Chitra" extra-light, both set tight — on one line across the full width between
 * the gutters. The letters' ink, not their boxes, meets the margins: the "E"
 * carries 0.069em of side bearing on its left, pulled back by the negative
 * margin, and the ink from "E" to "a" measures 3.342em (the tracking runs
 * past the last letter too), so the size is the width over 3.342.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "-ml-[0.069em] text-[calc((100vw-32px)/3.342)] leading-[0.8] whitespace-nowrap lg:text-[calc((100vw-40px)/3.342)]",
        className,
      )}
    >
      <span className="font-extrabold tracking-[-0.06em]">Ek</span>
      <span className="font-extralight tracking-[-0.045em]">Chitra</span>
    </p>
  );
}
