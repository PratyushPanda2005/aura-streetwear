import { FOOTER, FOOTER_COLUMNS } from "./data";

/**
 * Site footer — a white card inset from all four sides so the page's dark
 * ground frames it, in three bands: brand, links on a grey panel, and an
 * oversized wordmark clipped by the card's bottom edge.
 */

/** Simple outline social glyphs — Lucide v1 no longer ships brand marks. */
function SocialIcons() {
  const items = [
    {
      label: "Instagram",
      path: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
        </>
      ),
    },
    {
      label: "LinkedIn",
      path: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4" />
        </>
      ),
    },
    {
      label: "YouTube",
      path: (
        <>
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="M10 9.5l5 2.5-5 2.5z" />
        </>
      ),
    },
    {
      label: "Dribbble",
      path: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M5 8c5 1 10 1 14 4M8.5 3.5c3 3 5.5 7 6.5 16M4 15c5-3 10-3 14 1" />
        </>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {items.map((item) => (
        <a
          key={item.label}
          href="#"
          aria-label={item.label}
          className="text-[#71717a] transition-colors duration-200 hover:text-[#111111]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            {item.path}
          </svg>
        </a>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] p-3 sm:p-4 lg:p-5">
      <div className="overflow-hidden rounded-[28px] bg-white">
        {/* Brand band */}
        <div className="px-7 pt-12 pb-10 sm:px-10 lg:px-14 lg:pt-16 lg:pb-12">
          <p className="text-[28px] leading-none font-bold tracking-[-0.02em] text-[#111111] lg:text-[30px]">
            {FOOTER.wordmark}
            <span className="text-[#ef4444]">.</span>
          </p>
          <p className="mt-4 text-[16px] leading-[1.5] text-[#3f3f46]">
            {FOOTER.tagline}
          </p>
        </div>

        {/* Links band */}
        <div className="bg-[#f5f5f5] px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-[16px] leading-none text-[#18181b]">
                  {column.heading}
                </h2>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[16px] leading-[1.4] text-[#52525b] transition-colors duration-200 hover:text-[#111111]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h2 className="text-[16px] leading-none text-[#18181b]">
                {FOOTER.newsletterHeading}
              </h2>
              <div className="mt-6">
                <SocialIcons />
              </div>

              <p className="mt-9 text-[16px] leading-none text-[#18181b]">
                {FOOTER.newsletterLabel}
              </p>
              <div className="mt-4 flex max-w-[420px] items-stretch rounded-md border border-[#111111] bg-white">
                <input
                  type="email"
                  aria-label={FOOTER.newsletterLabel}
                  placeholder={FOOTER.placeholder}
                  className="min-w-0 flex-1 rounded-l-md bg-transparent px-4 py-3.5 text-[15px] text-[#111111] outline-none placeholder:text-[#a1a1aa]"
                />
                <button
                  type="button"
                  className="shrink-0 rounded-r-md bg-[#111111] px-5 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-black"
                >
                  {FOOTER.cta}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized wordmark: `textLength` pins it edge to edge at any width,
            and the short viewBox clips its lower fifth on the card's edge. */}
        <div aria-hidden="true" className="overflow-hidden bg-white px-5 lg:px-8">
          <svg
            viewBox="0 0 1000 175"
            className="block w-full"
            role="presentation"
            focusable="false"
          >
            <text
              x="0"
              y="216"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fontSize="300"
              className="font-bold"
              fill="#b3b3b3"
            >
              {FOOTER.wordmark}
              <tspan fill="#f2b8b8">.</tspan>
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
