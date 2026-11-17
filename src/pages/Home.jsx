import { useEffect, useRef, useState } from "react";

function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-900 ease-[cubic-bezier(.19,1,.22,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function LogoSlider({ items, direction = "left" }) {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);
  const lastRef = useRef(0);

  useEffect(() => {
    const speed = 0.5;
    const dir = direction === "left" ? -1 : 1;

    const tick = (t) => {
      const dt = t - lastRef.current;
      lastRef.current = t;
      setOffset((o) => {
        const next = o + dir * speed * (dt / 16);
        const half = items.length * 180;
        if (next <= -half) return 0;
        if (next >= 0) return -half;
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length, direction]);

  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-slate-50 to-transparent" />

      <div
        className="flex gap-4 will-change-transform"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex aspect-3/2 w-40 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-400 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0B3B8C] hover:shadow-lg sm:w-45"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const soluciones = [
    {
      id: "solucion-indumentaria",
      tag: "EPP Médico",
      title: "Indumentaria y Vestuario",
      desc: "Mandiles, botas de seguridad, gorros quirúrgicos y vestuario especializado para industria y salud.",
      img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
    },
    {
      id: "solucion-mascarillas",
      tag: "Bioseguridad",
      title: "Mascarillas y Protección",
      desc: "Quirúrgicas, KN95 y material de protección respiratoria con estándares certificados.",
      img: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80",
    },
    {
      id: "solucion-licitaciones",
      tag: "Sector Público",
      title: "Licitaciones con el Estado",
      desc: "Provisión de insumos médicos y servicios para entidades estatales con cumplimiento normativo.",
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    },
    {
      id: "solucion-marketing",
      tag: "Marketing",
      title: "Consultoría de Marca",
      desc: "Posicionamiento, campañas de difusión y desarrollo de imagen corporativa.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
    {
      id: "solucion-legal",
      tag: "Legal",
      title: "Asesoría Jurídica",
      desc: "Cumplimiento normativo y consultoría legal corporativa especializada.",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    },
    {
      id: "solucion-datos",
      tag: "Datos",
      title: "Análisis e Inteligencia",
      desc: "Procesamiento de bases de datos para soporte en la toma de decisiones.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
  ];

  const metodologia = [
    {
      n: "01",
      t: "Diagnóstico",
      d: "Evaluamos las necesidades de abastecimiento y riesgos operativos de tu organización.",
      offset: "md:translate-y-0",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      ),
    },
    {
      n: "02",
      t: "Implementación",
      d: "Desplegamos suministros y consultoría con SLAs claros y trazabilidad completa.",
      offset: "md:translate-y-12",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      n: "03",
      t: "Mejora continua",
      d: "Monitoreamos indicadores y ajustamos la estrategia para optimizar resultados.",
      offset: "md:translate-y-0",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
  ];

  const equipo = [
    {
      n: "01",
      t: "Expertos en el sector",
      s: "médico y logístico",
      d: "Conocimiento profundo de normativas sanitarias, licitaciones y cadena de suministro.",
      accent: "#0B3B8C",
    },
    {
      n: "02",
      t: "Soluciones",
      s: "tecnológicas prácticas",
      d: "Herramientas de análisis y automatización aplicadas al abastecimiento y la consultoría.",
      accent: "#8B1A3D",
    },
    {
      n: "03",
      t: "Compromiso",
      s: "y experiencia",
      d: "Atención personalizada, cumplimiento de plazos y acompañamiento en cada proyecto.",
      accent: "#0B3B8C",
    },
  ];

  const noticias = [
    {
      d: "12 Feb 2026",
      t: "Nuevas normativas SUNAT para proveedores del sector salud",
      e: "Regulación",
    },
    {
      d: "28 Ene 2026",
      t: "El impacto del EPP certificado en la seguridad hospitalaria",
      e: "Industria",
    },
  ];

  const clientes = [
    "Cliente 01",
    "Cliente 02",
    "Cliente 03",
    "Cliente 04",
    "Cliente 05",
    "Cliente 06",
    "Cliente 07",
    "Cliente 08",
  ];

  const socios = [
    "Partner 01",
    "Partner 02",
    "Partner 03",
    "Partner 04",
    "Partner 05",
    "Partner 06",
    "Partner 07",
    "Partner 08",
  ];

  return (
    <main className="overflow-x-hidden bg-white font-sans text-slate-800 antialiased selection:bg-[#8B1A3D] selection:text-white">
      <section
        id="inicio"
        className="relative overflow-hidden bg-linear-to-br from-[#0B3B8C] via-[#0B3B8C] to-[#082C6B] text-white"
      >
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1.5px, transparent 1.5px), radial-gradient(circle at 80% 70%, white 1.5px, transparent 1.5px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[80%] px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F5B7C4]">
                  Creer · Crear · Innovar
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="mb-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Suministros médicos, EPP y{" "}
                  <span className="text-[#F5B7C4]">
                    consultoría especializada
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mb-10 max-w-2xl text-lg leading-relaxed text-blue-100">
                  Simplificamos el abastecimiento de tu operación: insumos
                  certificados, vestuario industrial, licitaciones con el Estado
                  y consultoría estratégica en marketing, legal y datos.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#soluciones"
                    className="rounded-full bg-[#8B1A3D] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#6E1430] hover:shadow-xl"
                  >
                    Ver soluciones
                  </a>
                  <a
                    href="#contacto"
                    className="rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0B3B8C]"
                  >
                    Solicitar asesoría
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={200}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/30">
                  <img
                    src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&q=80"
                    alt="Suministros médicos y EPP"
                    className="h-95 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#082C6B]/80 via-[#0B3B8C]/10 to-transparent" />

                  <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#F5B7C4]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                      Suministros certificados
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
                    {[
                      "Sector Público y Privado",
                      "Cobertura Nacional",
                      "Insumos Médicos",
                      "Licitaciones",
                    ].map((chip, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="h-2 bg-[#8B1A3D]" />
      </section>

      <section id="soluciones" className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-[85%] px-4 sm:px-6">
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B1A3D]">
                Nuestras Soluciones
              </span>
              <h2 className="mt-3 mb-4 text-3xl font-black tracking-tight text-[#0B3B8C] lg:text-4xl">
                Modelos de gestión y abastecimiento
              </h2>
              <p className="leading-relaxed text-slate-600">
                Un portafolio integral para entidades públicas y empresas
                privadas que requieren insumos médicos, EPP y consultoría
                estratégica.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {soluciones.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <article
                  id={s.id}
                  className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#0B3B8C] hover:shadow-2xl"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0B3B8C]/80 via-[#0B3B8C]/20 to-transparent" />
                    <div className="absolute right-5 top-4 text-4xl font-black leading-none text-white/30 transition-colors group-hover:text-[#F5B7C4]/70">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="absolute bottom-4 left-5 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5B7C4]">
                      {s.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="mb-3 text-lg font-black tracking-tight text-slate-900">
                      {s.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                      {s.desc}
                    </p>
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B3B8C] transition hover:text-[#8B1A3D]"
                    >
                      Saber más
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-slate-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[95%] px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B1A3D]">
                Metodología
              </span>
              <h2 className="mt-3 mb-4 text-3xl font-black tracking-tight text-[#0B3B8C] lg:text-4xl">
                Cómo trabajamos
              </h2>
              <p className="mx-auto max-w-2xl leading-relaxed text-slate-600">
                Combinamos diagnóstico, implementación y mejora continua para
                garantizar abastecimiento confiable y decisiones informadas.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[16.66%] right-[16.66%] top-20 hidden h-0.5 md:block">
              <div className="h-full w-full bg-linear-to-r from-[#0B3B8C] via-[#8B1A3D] to-[#0B3B8C] opacity-30" />
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
              {metodologia.map((m, i) => (
                <Reveal key={i} delay={i * 150}>
                  <div className={`relative ${m.offset}`}>
                    <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-[#0B3B8C]/10 ring-4 ring-white md:mx-auto">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#0B3B8C] to-[#082C6B] text-white">
                        {m.icon}
                      </div>
                      <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#8B1A3D] text-[10px] font-black text-white ring-2 ring-white">
                        {m.n}
                      </span>
                    </div>

                    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#0B3B8C]/30 hover:bg-white hover:shadow-xl">
                      <h3 className="mb-2 text-lg font-black tracking-tight text-[#0B3B8C]">
                        {m.t}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {m.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={500}>
            <div className="mt-20 text-center">
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 rounded-full bg-[#0B3B8C] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#082C6B] hover:shadow-xl"
              >
                Conocer la metodología
                <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="equipo"
        className="relative overflow-hidden bg-slate-50 py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#0B3B8C]/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-[#8B1A3D]/5 blur-3xl" />

        <div className="relative mx-auto max-w-[85%] px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B1A3D]">
                Nuestro equipo
              </span>
              <h2 className="mt-3 mb-4 text-3xl font-black leading-[1.1] tracking-tight text-[#0B3B8C] lg:text-4xl">
                Expertos que combinan conocimiento sectorial e innovación
              </h2>
              <p className="leading-relaxed text-slate-600">
                Profesionales especializados en salud, logística, consultoría y
                tecnología al servicio de tu operación.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="group relative h-full min-h-80 overflow-hidden rounded-3xl bg-linear-to-br from-[#0B3B8C] to-[#082C6B] p-8 shadow-xl">
                <div
                  className="absolute inset-0 opacity-[0.1]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="relative flex h-full flex-col justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#F5B7C4]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5B7C4]">
                      Equipo en acción
                    </span>
                  </div>
                  <div>
                    <p className="font-serif text-2xl italic leading-tight">
                      "Personas reales resolviendo retos reales de
                      abastecimiento."
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs opacity-80">
                      <span className="h-px w-8 bg-[#F5B7C4]" />
                      LIZAR SAC · Perú
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 lg:col-span-7">
              {equipo.map((e, i) => (
                <Reveal key={i} delay={i * 130}>
                  <div className="group relative flex items-stretch gap-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#0B3B8C]/30 hover:shadow-xl">
                    <div
                      className="w-1.5 shrink-0 rounded-full transition-all duration-500 group-hover:w-2.5"
                      style={{ backgroundColor: e.accent }}
                    />

                    <div
                      className="hidden shrink-0 items-start sm:flex"
                      style={{ color: e.accent }}
                    >
                      <span className="text-5xl font-black leading-none tracking-tighter opacity-20 transition-opacity group-hover:opacity-40">
                        {e.n}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-black leading-tight tracking-tight text-slate-900">
                        {e.t} <span style={{ color: e.accent }}>{e.s}</span>
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {e.d}
                      </p>
                    </div>

                    <div className="hidden items-center md:flex">
                      <span className="text-xl text-slate-300 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#8B1A3D]">
                        →
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="aliados"
        className="overflow-hidden border-y border-slate-200 bg-slate-50 py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[95%] px-4 sm:px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B1A3D]">
                Nuestras Alianzas
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B3B8C] lg:text-4xl">
                Confían en nosotros
              </h2>
              <p className="mt-3 text-slate-600">
                Empresas públicas y privadas que ya trabajan con LIZAR SAC.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mb-6">
            <div className="mx-auto mb-4 flex max-w-[95%] items-center gap-3 px-4 sm:px-6">
              <span className="h-0.5 w-8 bg-[#8B1A3D]" />
              <h3 className="font-black tracking-tight text-slate-900">
                Clientes
              </h3>
            </div>
            <LogoSlider direction="left" items={clientes} />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10">
            <div className="mx-auto mb-4 flex max-w-[95%] items-center gap-3 px-4 sm:px-6">
              <span className="h-0.5 w-8 bg-[#0B3B8C]" />
              <h3 className="font-black tracking-tight text-slate-900">
                Socios
              </h3>
            </div>
            <LogoSlider direction="right" items={socios} />
          </div>
        </Reveal>
      </section>

      <section id="noticias" className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-[95%] px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B1A3D]">
                  Noticias
                </span>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B3B8C] lg:text-4xl">
                  ¡Lee, infórmate y crece con LIZAR SAC!
                </h2>
              </div>
              <a
                href="#noticias"
                className="text-sm font-semibold text-[#0B3B8C] transition hover:text-[#8B1A3D]"
              >
                Ver todas →
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {noticias.map((n, i) => (
              <Reveal key={i} delay={i * 150}>
                <article className="group flex overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#0B3B8C] hover:shadow-2xl">
                  <div className="w-1.5 bg-[#8B1A3D] transition-all group-hover:w-2.5" />
                  <div className="flex-1 p-7">
                    <div className="mb-3 flex items-center gap-3 text-xs">
                      <span className="font-bold uppercase tracking-[0.2em] text-[#8B1A3D]">
                        {n.e}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{n.d}</span>
                    </div>
                    <h3 className="mb-4 text-lg font-black leading-snug tracking-tight text-slate-900 transition group-hover:text-[#0B3B8C] lg:text-xl">
                      {n.t}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B3B8C]">
                      Leer más
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="bg-linear-to-br from-[#0B3B8C] via-[#0B3B8C] to-[#082C6B] text-white"
      >
        <div className="mx-auto max-w-[95%] px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F5B7C4]">
                  Contáctanos
                </span>
                <h2 className="mt-4 mb-6 text-3xl font-black leading-tight tracking-tight lg:text-5xl">
                  ¿Solicitas una asesoría personalizada?
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-blue-100">
                  Nuestros expertos pueden desarrollar productos y servicios a
                  medida para tus necesidades específicas. ¡Coméntanos!
                </p>
              </div>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-5">
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:contacto@lizar.pe"
                  className="group flex items-center justify-between rounded-full bg-[#8B1A3D] px-7 py-5 shadow-lg transition hover:-translate-y-0.5 hover:bg-[#6E1430]"
                >
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Escribir correo
                  </span>
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="https://wa.me/51"
                  className="group flex items-center justify-between rounded-full border border-white/40 px-7 py-5 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0B3B8C]"
                >
                  <span className="text-sm font-bold uppercase tracking-widest">
                    WhatsApp
                  </span>
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


    </main>
  );
}
