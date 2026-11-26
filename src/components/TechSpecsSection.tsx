import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { SPEC_CATEGORIES } from '../data/gt3rsData';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT_NUMBERS = [
  { id: 'hp', target: 525, decimals: 0, unit: 'cv', label: 'Potência máxima a 8.500 rpm' },
  { id: 'torque', target: 465, decimals: 0, unit: 'Nm', label: 'Torque máximo a 6.300 rpm' },
  { id: 'topspeed', target: 296, decimals: 0, unit: 'km/h', label: 'Velocidade máxima declarada' },
  { id: 'weight', target: 1450, decimals: 0, unit: 'kg', label: 'Peso em ordem de marcha (DIN)' },
];

export function TechSpecsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const counters = root.querySelectorAll<HTMLElement>('[data-counter-target]');
      counters.forEach((el) => {
        const targetVal = Number(el.dataset.counterTarget || 0);
        const state = { val: 0 };

        gsap.to(state, {
          val: targetVal,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(state.val).toLocaleString('pt-BR');
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="ficha-tecnica"
      ref={sectionRef}
      className="border-t border-white/10 bg-[#0E0F13] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#F2C94C] uppercase">
              04. Ficha Técnica Verificada
            </p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase text-balance">
              Especificações oficiais Porsche 911 GT3 RS (992).
            </h2>
          </div>

          <p className="text-xs text-[#8E95A0] max-w-sm">
            Dados homologados segundo normas DIN / EU / WLTP para o modelo ano 2024 com câmbio PDK
            de 7 marchas.
          </p>
        </div>

        {/* Animated Numeric Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {HIGHLIGHT_NUMBERS.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-white/10 bg-[#13151A] p-6"
            >
              <div className="flex items-baseline gap-1.5">
                <span
                  data-counter-target={item.target}
                  className="font-mono text-3xl sm:text-4xl font-medium text-white tabular-nums"
                >
                  {item.target.toLocaleString('pt-BR')}
                </span>
                <span className="font-mono text-sm text-[#F2C94C]">{item.unit}</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#98A1AE]">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Organized 2-column Specification Tables */}
        <div className="grid gap-8 lg:grid-cols-2">
          {SPEC_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border border-white/10 bg-[#121419] p-6 sm:p-7"
            >
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#F2C94C]">{category.index}.</span>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>

              <dl className="divide-y divide-white/[0.07]">
                {category.rows.map((row) => (
                  <div
                    key={row.label}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6"
                  >
                    <dt className="text-sm text-[#98A1AE] shrink-0">{row.label}</dt>
                    <dd className="text-sm font-medium text-white sm:text-right tabular-nums">
                      <span>{row.value}</span>
                      {row.note && (
                        <span className="block text-xs font-normal text-[#8E95A0] mt-0.5">
                          {row.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
