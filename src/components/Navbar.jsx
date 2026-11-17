import { useState } from "react";

import logoLizar from "../img/logo_lizar.jpeg";

export default function Navbar({ customLogo }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);

  const navLinks = [
    { title: "Inicio", href: "#inicio" },
    { title: "Soluciones", href: "#soluciones" },
    {
      title: "Servicios",
      href: "#servicios",
      subOptions: [
        { label: "Indumentaria y Vestuario", href: "#solucion-indumentaria" },
        { label: "Mascarillas y Bioseguridad", href: "#solucion-mascarillas" },
        { label: "Licitaciones con el Estado", href: "#solucion-licitaciones" },
        { label: "Consultoría de Marca", href: "#solucion-marketing" },
        { label: "Asesoría Jurídica", href: "#solucion-legal" },
        { label: "Análisis e Inteligencia", href: "#solucion-datos" },
      ],
    },
    { title: "Nosotros", href: "#equipo" },
    { title: "Aliados", href: "#aliados" },
    { title: "Noticias", href: "#noticias" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileOpenIndex(null);
  };

  const toggleMobileSubmenu = (index) => {
    setMobileOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileMenu}
      />

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 font-sans shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[95%] items-center justify-between px-2 sm:px-4 xl:max-w-[92%]">
          <a
            href="#inicio"
            className="group flex items-center space-x-3"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <img
                src={customLogo || logoLizar}
                alt="LIZAR SAC Servicios Generales"
                className="h-12 w-12 rounded-2xl object-cover ring-2 ring-[#0B3B8C]/10 transition-all duration-300 group-hover:scale-105 group-hover:ring-[#0B3B8C]/30"
              />
            </div>

            <div>
              <span className="block text-xl font-extrabold leading-none tracking-tight text-[#0B3B8C]">
                LIZAR SG
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                SAC Servicios Generales
              </span>
            </div>
          </a>

          <nav className="hidden items-center space-x-8 text-[15px] font-semibold text-slate-900 lg:flex">
            {navLinks.map((link, index) => (
              <div
                key={link.title}
                className="group relative py-2"
                onMouseEnter={() => link.subOptions && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-2 py-1 font-semibold text-slate-800 transition-colors hover:text-[#0B3B8C]"
                >
                  {link.title}

                  {link.subOptions && (
                    <svg
                      className="h-4 w-4 text-slate-600 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#0B3B8C]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </a>

                {link.subOptions && activeDropdown === index && (
                  <div className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                      <div className="h-1 bg-linear-to-r from-[#0B3B8C] via-[#8B1A3D] to-[#0B3B8C]" />

                      <div className="p-2">
                        {link.subOptions.map((subOption, i) => (
                          <a
                            key={subOption.label}
                            href={subOption.href}
                            className="group/item flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-[#0B3B8C]"
                          >
                            <span className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-[#8B1A3D]/60 tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {subOption.label}
                            </span>
                            <svg
                              className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover/item:translate-x-1 group-hover/item:opacity-100"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <a
              href="#contacto"
              className="rounded-full bg-[#8B1A3D] px-6 py-2.5 font-semibold text-white shadow-md shadow-[#8B1A3D]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6E1430] hover:shadow-lg"
            >
              Contacto
            </a>
          </nav>

          <button
            type="button"
            className="relative z-50 rounded-2xl p-2.5 text-slate-800 transition-colors hover:bg-slate-100 lg:hidden"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        <div className="h-1 bg-linear-to-r from-[#0B3B8C] via-[#8B1A3D] to-[#0B3B8C]" />

        <div
          className={`relative z-50 overflow-hidden border-b border-slate-200 bg-white shadow-2xl transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
            isMobileMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ willChange: "max-height, opacity" }}
        >
          <div className="max-h-[85vh] overflow-y-auto px-5 pb-8 pt-4">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Navegación
              </span>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#8B1A3D]"
                aria-label="Cerrar menú"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link, index) => (
                <div key={link.title} className="rounded-2xl">
                  {link.subOptions ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(index)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base font-bold transition-colors duration-200 ${
                          mobileOpenIndex === index
                            ? "bg-linear-to-r from-[#0B3B8C]/5 to-[#8B1A3D]/5 text-[#0B3B8C]"
                            : "text-slate-900 hover:bg-slate-50"
                        }`}
                        aria-expanded={mobileOpenIndex === index}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                              mobileOpenIndex === index
                                ? "w-6 bg-[#8B1A3D]"
                                : "w-1.5 bg-slate-300"
                            }`}
                          />
                          {link.title}
                        </span>

                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ease-out ${
                            mobileOpenIndex === index
                              ? "rotate-180 bg-[#8B1A3D] text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                          mobileOpenIndex === index
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                        style={{ willChange: "grid-template-rows, opacity" }}
                      >
                        <div className="overflow-hidden">
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#8B1A3D]/30 pb-2 pl-4">
                            {link.subOptions.map((subOption, i) => (
                              <a
                                key={subOption.label}
                                href={subOption.href}
                                onClick={closeMobileMenu}
                                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:translate-x-1 hover:bg-slate-50 hover:text-[#0B3B8C]"
                              >
                                <span className="text-[10px] font-black text-[#8B1A3D]/60 tabular-nums">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                {subOption.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <a
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-bold text-slate-900 transition-all duration-200 hover:bg-slate-50 hover:text-[#0B3B8C]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      {link.title}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            <a
              href="#contacto"
              onClick={closeMobileMenu}
              className="group mt-6 flex w-full items-center justify-between rounded-2xl bg-[#8B1A3D] px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-[#8B1A3D]/25 transition-all duration-300 hover:bg-[#6E1430] active:scale-[0.98]"
            >
              <span>Contacto</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </a>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
              <a
                href="mailto:contacto@lizar.pe"
                className="flex flex-col gap-1 rounded-2xl bg-slate-50 px-4 py-3 transition-colors hover:bg-[#0B3B8C]/5"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Correo
                </span>
                <span className="text-xs font-bold text-[#0B3B8C]">
                  Escríbenos
                </span>
              </a>
              <a
                href="https://wa.me/51"
                className="flex flex-col gap-1 rounded-2xl bg-slate-50 px-4 py-3 transition-colors hover:bg-[#8B1A3D]/5"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  WhatsApp
                </span>
                <span className="text-xs font-bold text-[#8B1A3D]">
                  Conversemos
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
