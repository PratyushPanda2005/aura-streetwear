import { anton, archivo, BODY_STACK, PINK } from "./shared";

const MARQUEE = "CARRIERESCENE.CA";

// Sized to the track (viewport minus scrollbar) — never 100vw, which would
// include the scrollbar width and push the whole page sideways.
const PANEL = "relative h-full w-full shrink-0 grow-0 basis-full overflow-hidden";

/* ------------------------------------------------------------------ */
/* Panel 1 — Intro poster (VIBRER / SCÈNE)                             */
/* ------------------------------------------------------------------ */
export function IntroPanel() {
  return (
    <div
      className={`${PANEL} flex items-center justify-center bg-[#141414] p-[1.6vmin]`}
      style={{ fontFamily: BODY_STACK }}
    >
      <div className="relative flex h-full w-full max-w-[1640px] flex-col gap-[1.4vmin] overflow-hidden rounded-[26px] bg-[#d4d4d2] p-[1.4vmin] text-black">
        <div className="flex min-h-0 flex-1 gap-[1.4vmin]">
          {/* LEFT — typographic tunnel */}
          <div className="relative flex min-w-0 flex-[1.08] flex-col justify-between overflow-hidden py-[1vmin] pl-[1vmin]">
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "repeating-conic-gradient(from 90deg at 50% 44%, #131313 0deg 4.2deg, transparent 4.2deg 8.6deg)",
                WebkitMaskImage:
                  "radial-gradient(120% 90% at 50% 44%, #000 55%, transparent 100%)",
                maskImage:
                  "radial-gradient(120% 90% at 50% 44%, #000 55%, transparent 100%)",
                filter: "url(#cs-rough)",
              }}
            />
            <div
              className="absolute left-1/2 top-[44%] z-0 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-[#d4d4d2]"
              style={{
                width: "9%",
                aspectRatio: "1",
                boxShadow: "0 0 26px 14px #d4d4d2",
              }}
            />
            <h1
              className={`${anton.className} relative z-10 text-center leading-[0.8]`}
              style={{
                fontSize: "clamp(2.2rem, 13.5vmin, 9rem)",
                letterSpacing: "-0.01em",
                filter: "url(#cs-rough)",
                transform: "scaleY(1.15)",
                transformOrigin: "top",
              }}
            >
              VIBRER
            </h1>
            <h2
              className={`${anton.className} relative z-10 leading-[0.78]`}
              style={{
                fontSize: "clamp(2.2rem, 14vmin, 9.5rem)",
                letterSpacing: "-0.005em",
                filter: "url(#cs-rough)",
              }}
            >
              SCÈNE
            </h2>
          </div>

          {/* RIGHT — marquee + editorial panel */}
          <div className="flex min-h-0 min-w-0 flex-[1] flex-col gap-[1.4vmin]">
            <div
              className="cs-pill relative overflow-hidden rounded-full"
              style={{ background: PINK }}
            >
              <div className="flex whitespace-nowrap py-[1.1vmin]">
                {[0, 1].map((track) => (
                  <div
                    key={track}
                    aria-hidden={track === 1}
                    className={`${anton.className} cs-marquee-track flex shrink-0 items-center`}
                    style={{ fontSize: "clamp(1rem, 1.9vw, 1.9rem)" }}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="flex items-center">
                        <span className="px-[1.2vmin] tracking-tight">
                          {MARQUEE}
                        </span>
                        <span className="opacity-90">◖◗</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] bg-black p-[2.4vmin] text-white">
              <span
                className={`${anton.className} tracking-tight`}
                style={{ fontSize: "clamp(0.7rem, 1.4vmin, 1rem)" }}
              >
                C&apos;EST QUOI?
              </span>
              <h3
                className={`${archivo.className} mt-[3vmin] uppercase`}
                style={{
                  fontSize: "clamp(1rem, 3vmin, 2.3rem)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.01em",
                }}
              >
                Les métiers et formations qui font briller la scène indé
                d&apos;ici.
              </h3>
              <p
                className="mt-auto max-w-[46ch] pt-[2.5vmin] text-white/85"
                style={{ fontSize: "clamp(0.7rem, 1.5vmin, 1rem)", lineHeight: 1.45 }}
              >
                Le milieu de la diffusion indépendante au Québec regorge
                d&apos;opportunités pour celles et ceux qui veulent contribuer à
                faire vibrer la culture vivante et engagée d&apos;ici. Et il
                n&apos;attend que toi! Des salles intimes, des scènes mytiques,
                proches de ses artistes et de son public. Parce que derrière
                chaque rideau levé, il y a des métiers qui comptent.
              </p>
            </div>
          </div>
        </div>

        <div
          className="cs-pill flex items-center rounded-full px-[2.4vmin] py-[1.1vmin]"
          style={{ background: PINK }}
        >
          <span
            className={`${anton.className} tracking-tight`}
            style={{ fontSize: "clamp(0.7rem, 1vw, 1.1rem)" }}
          >
            SCROLLE — LE PERSONNAGE MARCHE →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel 2 — Les métiers (index list)                                 */
/* ------------------------------------------------------------------ */
const METIERS = [
  "Sonorisation",
  "Régie de spectacle",
  "Booking & Diffusion",
  "Direction technique",
  "Éclairage & Vidéo",
  "Gérance d'artistes",
];

export function MetiersPanel() {
  return (
    <div
      className={`${PANEL} flex items-center justify-center bg-[#141414] p-[1.6vmin]`}
      style={{ fontFamily: BODY_STACK }}
    >
      <div className="flex h-full w-full max-w-[1640px] flex-col gap-[1.4vmin] rounded-[26px] bg-black p-[2.6vmin] text-white">
        <div className="flex items-center justify-between">
          <span
            className={`${anton.className} tracking-tight`}
            style={{ fontSize: "clamp(0.7rem, 0.95vw, 1rem)" }}
          >
            01 — LES MÉTIERS
          </span>
          <span
            className="rounded-full px-[1.8vmin] py-[0.8vmin] text-black"
            style={{ background: PINK, fontFamily: anton.style.fontFamily }}
          >
            06 RÔLES
          </span>
        </div>

        <h2
          className={`${archivo.className} uppercase`}
          style={{ fontSize: "clamp(1.4rem, 4.6vmin, 3.4rem)", lineHeight: 0.98 }}
        >
          Derrière chaque
          <br />
          rideau levé.
        </h2>

        <ul className="mt-auto flex min-h-0 flex-col">
          {METIERS.map((m, i) => (
            <li
              key={m}
              className="cs-row group flex items-center justify-between border-t border-white/15 py-[min(1.5vmin,1.2vh)]"
            >
              <div className="flex items-baseline gap-[2.4vmin]">
                <span
                  className="tabular-nums text-white/40"
                  style={{ fontFamily: anton.style.fontFamily, fontSize: "clamp(0.8rem,1vmin,1.1rem)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`${anton.className} tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-[1vw]`}
                  style={{ fontSize: "clamp(1.1rem, 3.4vmin, 2.6rem)" }}
                >
                  {m}
                </span>
              </div>
              <span
                className="text-2xl transition-colors"
                style={{ color: PINK }}
              >
                ↗
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel 3 — Formations (cards)                                       */
/* ------------------------------------------------------------------ */
const FORMATIONS = [
  { code: "DEP", title: "Techniques de scène", dur: "1 800 h" },
  { code: "AEC", title: "Gestion d'événements", dur: "12 mois" },
  { code: "ATELIER", title: "Son & éclairage live", dur: "8 sem." },
  { code: "STAGE", title: "Immersion en salle", dur: "Sur mesure" },
];

export function FormationsPanel() {
  return (
    <div
      className={`${PANEL} flex items-center justify-center bg-[#141414] p-[1.6vmin]`}
      style={{ fontFamily: BODY_STACK }}
    >
      <div className="flex h-full w-full max-w-[1640px] flex-col gap-[2vmin] rounded-[26px] bg-[#d4d4d2] p-[2.6vmin] text-black">
        <div className="flex items-center justify-between">
          <span
            className={`${anton.className} tracking-tight`}
            style={{ fontSize: "clamp(0.7rem, 0.95vw, 1rem)" }}
          >
            02 — FORMATIONS
          </span>
        </div>

        <h2
          className={`${archivo.className} uppercase`}
          style={{ fontSize: "clamp(1.4rem, 5vmin, 3.6rem)", lineHeight: 0.98 }}
        >
          Apprends le métier, sur le plancher.
        </h2>

        <div className="mt-auto grid min-h-0 flex-1 grid-cols-4 gap-[1.4vmin]">
          {FORMATIONS.map((f) => (
            <article
              key={f.code}
              className="group flex flex-col justify-between overflow-hidden rounded-[16px] border border-black/15 bg-black p-[2vmin] text-white transition-transform duration-300 ease-out hover:-translate-y-[0.6vh]"
            >
              <span
                className="w-fit rounded-full px-[1.4vmin] py-[0.5vmin] text-black"
                style={{ background: PINK, fontFamily: anton.style.fontFamily, fontSize: "clamp(0.6rem,0.8vw,0.9rem)" }}
              >
                {f.code}
              </span>
              <div>
                <h3
                  className={`${anton.className} leading-[0.95]`}
                  style={{ fontSize: "clamp(0.95rem, 2.4vmin, 1.9rem)" }}
                >
                  {f.title}
                </h3>
                <p className="mt-[1.2vmin] text-[13px] uppercase tracking-tight text-white/50">
                  Durée · {f.dur}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel 4 — Témoignages + CTA                                        */
/* ------------------------------------------------------------------ */
const QUOTES = [
  {
    q: "J'ai trouvé ma place derrière la console. Chaque soir, la salle vibre grâce à nous.",
    who: "Camille — Sonorisatrice",
  },
  {
    q: "La régie, c'est l'adrénaline du direct. Aucun show ne se ressemble.",
    who: "Théo — Régisseur",
  },
  {
    q: "Booker des artistes d'ici, c'est bâtir la scène de demain.",
    who: "Sarah — Diffusion",
  },
];

export function TemoignagesPanel() {
  return (
    <div
      className={`${PANEL} flex items-center justify-center bg-[#141414] p-[1.6vmin]`}
      style={{ fontFamily: BODY_STACK }}
    >
      <div className="flex h-full w-full max-w-[1640px] flex-col gap-[2vmin] rounded-[26px] bg-black p-[2.6vmin] text-white">
        <div className="flex items-center justify-between">
          <span
            className={`${anton.className} tracking-tight`}
            style={{ fontSize: "clamp(0.7rem, 0.95vw, 1rem)" }}
          >
            03 — TÉMOIGNAGES
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-[1.4vmin]">
          {QUOTES.map((c) => (
            <blockquote
              key={c.who}
              className="flex flex-col justify-between overflow-hidden rounded-[16px] border border-white/15 p-[2.2vmin]"
            >
              <p
                className={`${archivo.className}`}
                style={{ fontSize: "clamp(0.9rem, 2.2vmin, 1.7rem)", lineHeight: 1.12 }}
              >
                “{c.q}”
              </p>
              <footer
                className="mt-[2vmin] uppercase tracking-tight"
                style={{ color: PINK, fontFamily: anton.style.fontFamily, fontSize: "clamp(0.75rem,0.95vw,1.05rem)" }}
              >
                {c.who}
              </footer>
            </blockquote>
          ))}
        </div>

        <a
          href="#"
          className="cs-pill flex shrink-0 items-center justify-between rounded-full px-[2.6vmin] py-[min(1.8vmin,1.6vh)] text-black"
          style={{ background: PINK }}
        >
          <span
            className={`${anton.className} tracking-tight`}
            style={{ fontSize: "clamp(1rem, 3.2vmin, 2.4rem)" }}
          >
            REJOINS LA SCÈNE
          </span>
          <span style={{ fontSize: "clamp(1rem, 3.2vmin, 2.4rem)" }}>→</span>
        </a>
      </div>
    </div>
  );
}
