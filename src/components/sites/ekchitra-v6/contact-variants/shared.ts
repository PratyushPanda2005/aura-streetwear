import type { FormEvent } from "react";

import { CTA_SERVICES } from "../cta-variants/shared";
import { DETAILS } from "../contact/data";

export { DETAILS };

/**
 * TEMPORARY PLACEHOLDERS — the pictures and gradient of the three reference
 * contact pages, kept exactly as they are there so each layout can be judged
 * against its source. Replace with EkChitra's own before going live.
 * - orchid-template.framer.website/contact: a glass drop refracting into a
 *   black-and-white flower, over the footer.
 * - leeroy.ca/en/contact: one frame of the blue-on-black silk gradient their
 *   WebGL canvas draws behind the form (captured from the page).
 * - lefruitstudio.fr/en/contact: the studio photograph shown in the circle.
 */
export const REF_PICTURES = {
  orchid: {
    src: "/sites/ekchitra-redesign/placeholders/contact-ref-orchid-glass-flower.png",
    alt: "",
  },
  leeroy: {
    src: "/sites/ekchitra-redesign/placeholders/contact-ref-leeroy-gradient.jpg",
    alt: "",
  },
  lefruit: {
    src: "/sites/ekchitra-redesign/placeholders/contact-ref-lefruit-studio.jpg",
    alt: "A studio with shelves of magazines and a dog sitting among the plants",
  },
};

/**
 * DRAFT answers, from what the site already says (hours, address, WhatsApp
 * and the two services). Have the gallery confirm them before going live.
 */
export const FAQ = [
  {
    question: "When is the gallery open?",
    answer: `${DETAILS.hours.days}, ${DETAILS.hours.time}.`,
  },
  {
    question: "Where are you?",
    answer: DETAILS.address.join(" "),
  },
  {
    question: "How do I ask about a work I’ve seen?",
    answer: `Send its title or a picture of it on WhatsApp (${DETAILS.phone}) or to ${DETAILS.email}, and we’ll come back to you with the details.`,
  },
  {
    question: "Can you find art for a particular space?",
    answer: CTA_SERVICES[0].body,
  },
  {
    question: "Do you advise collectors?",
    answer: CTA_SERVICES[1].body,
  },
];

/** The two lines of the email as the big type sets it: name, then domain. */
export const EMAIL_LINES = [
  `${DETAILS.email.split("@")[0]}@`,
  DETAILS.email.split("@")[1],
];

/**
 * The forms have no server to post to, so sending opens WhatsApp with the
 * filled-in fields as the message — the way the gallery already takes
 * enquiries. Each field's `name` is its label in the message.
 */
export function sendOnWhatsApp(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const lines = [...new FormData(event.currentTarget).entries()]
    .map(([name, value]) => [name, String(value).trim()])
    .filter(([, value]) => value)
    .map(([name, value]) => `${name}: ${value}`);
  window.open(
    `${DETAILS.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
    "_blank",
    "noopener,noreferrer",
  );
}
