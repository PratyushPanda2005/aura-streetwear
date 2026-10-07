import {
  CLIENTS,
  CLIENTS_EYEBROW,
  CLIENTS_LABEL,
  CLIENTS_NUMBER,
} from "./data";

/**
 * Geometric SVG client emblems for ultra-crisp architectural presentation.
 */
function ClientEmblem({ index }: { index: number }) {
  const emblems = [
    // VITA Spatial
    <path key="0" d="M12 4L4 20H20L12 4ZM12 8L17 18H7L12 8Z" fill="none" stroke="currentColor" strokeWidth="1.2" />,
    // KRONOS Form
    <g key="1" stroke="currentColor" strokeWidth="1.2" fill="none"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></g>,
    // NORDIK Living
    <path key="2" d="M6 4V20M12 4V20M18 4V20M6 12H18" fill="none" stroke="currentColor" strokeWidth="1.2" />,
    // ARCUS Studio
    <path key="3" d="M4 20V12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V20" fill="none" stroke="currentColor" strokeWidth="1.2" />,
    // LUMEN Light
    <g key="4" stroke="currentColor" strokeWidth="1.2" fill="none"><polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9" /></g>,
    // FORMA Works
    <path key="5" d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3ZM12 3V21M20 7.5L4 16.5M4 7.5L20 16.5" fill="none" stroke="currentColor" strokeWidth="1.2" />,
    // MONO Atelier
    <path key="6" d="M4 18V6L12 14L20 6V18" fill="none" stroke="currentColor" strokeWidth="1.2" />,
    // APEX Arch
    <path key="7" d="M12 3L21 19H3L12 3ZM12 11V16" fill="none" stroke="currentColor" strokeWidth="1.2" />,
  ];

  return (
    <svg viewBox="0 0 24 24" className="size-10 text-[#f2f2f2]">
      {emblems[index % emblems.length]}
    </svg>
  );
}

export function ClientsSection() {
  return (
    <section
      id="clients"
      className="px-[4.1vw] pb-24 lg:px-[5.55vw] lg:pb-[16.6vh]"
    >
      <div className="border-t border-dotted border-[#303030] pt-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-4">
          <div className="flex max-w-[26ch] flex-col gap-6 md:pr-8">
            <div className="flex gap-2.5 font-mono text-[11px] tracking-[0.14em] uppercase">
              <span className="text-[#a9a9a9]">{CLIENTS_NUMBER}</span>
              <span className="text-[#f2f2f2]">{CLIENTS_LABEL}</span>
            </div>
            <h2 className="text-[clamp(2rem,4.17vw,3.75rem)] leading-[1.05] font-light tracking-[-0.03em] text-[#f2f2f2]">
              {CLIENTS_EYEBROW}
            </h2>
          </div>

          <div className="grid w-full grid-cols-2 md:w-[62.5%] md:grid-cols-4">
            {CLIENTS.map((client, i) => (
              <div
                key={client.name}
                className={`flex flex-col items-center justify-center p-6 text-center ${
                  i < 4 ? "md:border-b md:border-dotted md:border-[#303030]" : ""
                } ${
                  i % 2 === 0 ? "border-r border-dotted border-[#303030] md:border-r-0" : ""
                } ${
                  i % 4 !== 3 ? "md:border-r md:border-dotted md:border-[#303030]" : ""
                }`}
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#141414] p-3 transition-transform duration-300 hover:scale-105">
                  <ClientEmblem index={i} />
                </div>
                <span className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#f2f2f2] uppercase">
                  {client.name}
                </span>
                <span className="mt-1 font-mono text-[10px] tracking-[0.02em] text-[#888888]">
                  {client.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
