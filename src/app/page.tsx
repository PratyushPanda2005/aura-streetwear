import { redirect } from "next/navigation";

// The EkChitra v6 site is the live build; the bare root forwards to it.
export default function Home() {
  redirect("/ekchitra-v6");
}
