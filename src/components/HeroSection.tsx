import { ArrowDown, ArrowRight, Compass } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { HERO_METRICS, IMAGES, VEHICLE_IDENTITY } from '../data/gt3rsData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExplore: () => void;
  onRequestProposal: () => void;
}

interface MotionState {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  active: boolean;
}

export function HeroSection({ onExplore, onRequestProposal }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const vehicleLayerRef = useRef<HTMLDivElement>(null);
  const lightLayerRef = useRef<HTMLDivElement>(null);
  const copyLayerRef = useRef<HTMLDivElement>(null);

  const motionRef = useRef<MotionState>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    active: false,
  });

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mq.matches);
    updatePreference();
    mq.addEventListener('change', updatePreference);
    return () => mq.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      if (vehicleLayerRef.current) {
        vehicleLayerRef.current.style.transform = 'none';
      }
      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = 'none';
      }
      if (copyLayerRef.current) {
        copyLayerRef.current.style.transform = 'none';
      }
      return;
    }

    let rafId = 0;
    const damping = 0.085;

    const tick = () => {
      const m = motionRef.current;
      m.currentX += (m.targetX - m.currentX) * damping;
      m.currentY += (m.targetY - m.currentY) * damping;

      // Normalized [-1, 1] -> constrained angles & translations
      const rotateY = m.currentX * 10; // up to +-10 deg horizontal
      const rotateX = -m.currentY * 5; // up to +-5 deg vertical
      const vehicleTx = m.currentX * 28; // up to +-28px horizontal
      const vehicleTy = m.currentY * 14; // up to +-14px vertical

      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = `translate3d(${(-m.currentX * 14).toFixed(2)}px, ${(-m.currentY * 8).toFixed(2)}px, 0) scale(1.06)`;
      }

      if (vehicleLayerRef.current) {
        vehicleLayerRef.current.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) translate3d(${vehicleTx.toFixed(2)}px, ${vehicleTy.toFixed(2)}px, 0) scale(1.05)`;
      }

      if (copyLayerRef.current) {
        copyLayerRef.current.style.transform = `translate3d(${(m.currentX * 12).toFixed(2)}px, ${(m.currentY * 7).toFixed(2)}px, 0)`;
      }

      if (lightLayerRef.current) {
        const lx = 50 + m.currentX * 26;
        const ly = 42 + m.currentY * 20;
        lightLayerRef.current.style.background = `radial-gradient(circle 680px at ${lx.toFixed(1)}% ${ly.toFixed(1)}%, rgba(220, 226, 232, 0.16), rgba(242, 201, 76, 0.05) 35%, transparent 72%)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || e.pointerType === 'touch') return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    motionRef.current.targetX = Math.max(-1, Math.min(1, nx));
    motionRef.current.targetY = Math.max(-1, Math.min(1, ny));
    motionRef.current.active = true;
  };

  const handlePointerLeave = () => {
    motionRef.current.targetX = 0;
    motionRef.current.targetY = 0;
    motionRef.current.active = false;
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A0A0C] pt-16 flex flex-col justify-between"
    >
      {/* Background depth stage */}
      <div
        ref={bgLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{ transform: 'scale(1.06)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,226,232,0.09)_0%,_rgba(10,10,12,0.96)_65%)]" />
      </div>

      {/* 3D Vehicle Protagonist Layer */}
      <div
        ref={vehicleLayerRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ transform: 'perspective(1400px) scale(1.05)' }}
      >
        <div className="relative h-full w-full">
          <ResilientImage
            src={IMAGES.hero}
            alt="Porsche 911 GT3 RS 2024 em Ice Grey Metallic no showroom digital"
            className="h-full w-full object-cover object-center"
            priority
          />
          {/* Controlled architectural scrims for >=4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/35 to-[#0A0A0C]/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/85 via-[#0A0A0C]/25 to-transparent" />
        </div>
      </div>

      {/* Dynamic studio illumination following cursor */}
      <div
        ref={lightLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300"
      />

      {/* Top Editorial Identity Line */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-10 md:px-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-wider text-[#B6BDC7] uppercase">
          <span>{VEHICLE_IDENTITY.brand}</span>
          <span aria-hidden="true">·</span>
          <span>Geração {VEHICLE_IDENTITY.generation}</span>
          <span aria-hidden="true">·</span>
          <span>{VEHICLE_IDENTITY.year}</span>
          <span aria-hidden="true">·</span>
          <span>{VEHICLE_IDENTITY.colorName}</span>
        </div>
      </div>

      {/* Main Monumental Headline & Commercial Call to Action */}
      <div
        ref={copyLayerRef}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-8 md:px-10 will-change-transform"
      >
        <div className="max-w-3xl">
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[6.75rem] font-bold tracking-tight leading-[0.9] text-white uppercase text-balance">
            911 GT3 RS
          </h1>

          <p className="mt-4 text-xl sm:text-2xl md:text-[1.75rem] font-medium tracking-tight text-[#DCE2E8] leading-snug text-balance max-w-2xl">
            Nascido no túnel de vento. Homologado para as ruas.
          </p>

          <p className="mt-3 text-sm sm:text-base text-[#A8B0BC] leading-relaxed max-w-xl">
            {VEHICLE_IDENTITY.version} em {VEHICLE_IDENTITY.colorPt}. Motor Boxer 4.0L aspirado de
            525 cv, corte a 9.000 rpm e aerodinâmica ativa com até 860 kg de downforce.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex items-center gap-2.5 rounded-md bg-[#F2C94C] px-6 py-3 text-sm font-semibold text-[#0A0A0C] hover:bg-[#F5D36A] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>Explorar o Veículo</span>
            </button>

            <button
              type="button"
              onClick={onRequestProposal}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/35 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
            >
              <span>Solicitar Proposta</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom verified performance strip + Scroll Indicator */}
        <div className="mt-10 border-t border-white/12 pt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-10">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label}>
                <dt className="text-xs text-[#98A1AE]">{metric.label}</dt>
                <dd className="mt-1 font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums">
                  {metric.decimals > 0
                    ? metric.target.toFixed(metric.decimals).replace('.', ',')
                    : metric.target.toLocaleString('pt-BR')}
                  <span className="text-base text-[#F2C94C] ml-1">{metric.suffix.trim()}</span>
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#showroom"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#B6BDC7] hover:text-white transition-colors whitespace-nowrap shrink-0 self-start lg:self-end py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] rounded-sm"
          >
            <span>Rolar para o showroom</span>
            <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
