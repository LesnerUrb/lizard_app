import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="h-2 bg-[#8B1A3D]" />

      <div className="mx-auto max-w-[95%] px-4 py-14 sm:px-6">
        <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0B3B8C]">
                <span className="font-black text-white">L</span>
              </div>
              <span className="font-black tracking-tight text-white">
                LIZAR SAC
              </span>
            </div>
            <p className="mb-6 max-w-md text-sm leading-relaxed">
              Servicios generales, suministros médicos, EPP y consultoría
              especializada para el sector público y privado en el Perú.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0B3B8C]/20 text-[#F5B7C4]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                    Dirección
                  </div>
                  <div className="text-slate-300">
                    Jr. Juan Antonio Ribeyro 149
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#8B1A3D]/20 text-[#F5B7C4]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                    Teléfono
                  </div>
                  <a
                    href="tel:+51987654321"
                    className="text-slate-300 transition hover:text-white"
                  >
                    +51 999  333 444
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0B3B8C]/20 text-[#F5B7C4]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                    Correo
                  </div>
                  <a
                    href="mailto:contacto@lizar.pe"
                    className="text-slate-300 transition hover:text-white"
                  >
                    contacto@lizar.pe
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Soluciones
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="transition hover:text-white">EPP Médico</li>
              <li className="transition hover:text-white">Bioseguridad</li>
              <li className="transition hover:text-white">Licitaciones</li>
              <li className="transition hover:text-white">Consultoría</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Empresa
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="transition hover:text-white">Nosotros</li>
              <li className="transition hover:text-white">Alianzas</li>
              <li className="transition hover:text-white">Noticias</li>
              <li className="transition hover:text-white">Contacto</li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Ubícanos
            </h4>
            <div className="overflow-hidden rounded-2xl border border-slate-800 shadow-lg">
              <iframe
                title="Ubicación LIZAR SAC"
                src="https://www.google.com/maps?q=Jr.%20Juan%20Antonio%20Ribeyro%20149%2C%20Peru&output=embed"
                width="100%"
                height="220"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-slate-800 pt-6 text-xs uppercase tracking-widest">
          <span>© 2026 LIZAR SAC</span>
          <span>Servicios Generales · Perú</span>
        </div>
      </div>
    </footer>
  );
}
