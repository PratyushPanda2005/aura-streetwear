import type { Metadata } from "next";

import { SANS } from "@/components/sites/ekchitra-v5/shared";
import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";
import { ContactAddress } from "@/components/sites/ekchitra-v6/contact-variants/ContactAddress";
import { FooterCard } from "@/components/sites/ekchitra-v6/footer-variants/FooterCard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact — EkChitra Art Gallery",
  description:
    "Visit, call or write to EkChitra, a contemporary Indian art gallery in HITEC City, Hyderabad.",
};

/**
 * Contact, v6: layout 03 from the contact variations (after
 * lefruitstudio.fr/en/contact) — one screen under the top bar with
 * "Contact" huge, the address and hours, a window onto the photograph that
 * follows the cursor, and the email enormous across the foot — then the
 * shared footer.
 */
export default function EkchitraV6ContactPage() {
  return (
    <main className={cn("min-h-svh bg-white text-(--k-ink)", SANS)}>
      <SmoothScroll />
      <TopBar />
      <ContactAddress page />
      <FooterCard />
    </main>
  );
}
