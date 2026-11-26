import { RotateCcw, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import { IMAGES, INTERIOR_HOTSPOTS, InteriorHotspot } from '../data/gt3rsData';
import { ResilientImage } from './ResilientImage';

export function InteriorCabinSection() {
  const [activeSpot, setActiveSpot] = useState<InteriorHotspot>(INTERIOR_HOTSPOTS[0]);
  const [zoomed, setZoomed] = useState(false);

  const handleSelectSpot = (spot: InteriorHotspot, shouldZoom = true) => {
    setActiveSpot(spot);
    setZoomed(shouldZoom);
  };

  const panX = zoomed ? Math.max(-22, Math.min(22, (50 - activeSpot.x) * 0.65)) : 0;
  const panY = zoomed ? Math.max(-20, Math.min(20, (50 - activeSpot.y) * 0.65)) : 0;

  return (
    <section
      id="cabine"
      className="border-t border-white/10 bg-[#0E0F13] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#F2C94C] uppercase">
              02. Interior & Ergonomia de Pista
            </p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase text-balance">
              Cabine em Race-Tex e fibra de carbono orientada ao piloto.
            </h2>
            <p className="mt-3 text-base text-[#A8B0BC] leading-relaxed">
              Sem distrações visuais. Comandos de ajuste dinâmico de suspensão, diferencial e
              aerodinâmica posicionados diretamente no volante para ajustes em plena volta.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setZoomed((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-[#15171C] px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors min-h-[40px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
            >
              {zoomed ? (
                <>
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Visão Panorâmica</span>
                </>
              ) : (
                <>
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>Aproximar Componente</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] items-stretch">
          {/* Interactive Cockpit Stage */}
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[460px] overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0C]">
            <div
              className="relative h-full w-full transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: zoomed
                  ? `translate3d(${panX}%, ${panY}%, 0) scale(1.65)`
                  : 'translate3d(0, 0, 0) scale(1)',
              }}
            >
              <ResilientImage
                src={IMAGES.interior}
                alt="Cabine do Porsche 911 GT3 RS 2024 em Race-Tex preto com detalhes amarelos e fibra de carbono"
                className="h-full w-full object-cover"
              />

              {INTERIOR_HOTSPOTS.map((spot, idx) => {
                const isSelected = activeSpot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleSelectSpot(spot, true)}
                    aria-label={`Inspecionar ${spot.name}`}
                    aria-pressed={isSelected}
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      transform: `translate(-50%, -50%) scale(${zoomed ? 0.65 : 1})`,
                    }}
                    className={`absolute z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isSelected
                        ? 'border-[#F2C94C] bg-[#F2C94C] text-[#0A0A0C] shadow-[0_0_0_6px_rgba(242,201,76,0.22)]'
                        : 'border-white/75 bg-[#0A0A0C]/80 text-white hover:border-[#F2C94C] hover:bg-[#F2C94C] hover:text-[#0A0A0C]'
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold tabular-nums">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Cockpit Component List */}
          <div className="flex flex-col justify-between gap-4 rounded-lg border border-white/10 bg-[#13151A] p-6">
            <div className="space-y-2">
              {INTERIOR_HOTSPOTS.map((spot, idx) => {
                const isSelected = activeSpot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleSelectSpot(spot, true)}
                    className={`w-full rounded-md border p-3.5 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] ${
                      isSelected
                        ? 'border-[#F2C94C]/60 bg-[#1B1E25]'
                        : 'border-white/10 bg-transparent hover:border-white/25 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-white">
                        0{idx + 1}. {spot.name}
                      </span>
                      <span className="text-xs text-[#8E95A0] whitespace-nowrap shrink-0">
                        {spot.area}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="mt-2.5 space-y-2">
                        <p className="text-sm text-[#B2B8C2] leading-relaxed">
                          {spot.description}
                        </p>
                        <p className="font-mono text-xs text-[#F2C94C]">{spot.specNote}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Honest Cargo Architecture Note */}
            <div className="border-t border-white/10 pt-4 text-xs text-[#98A1AE] leading-relaxed">
              <strong className="font-medium text-[#DCE2E8]">Nota de espaço interno:</strong> No
              911 GT3 RS (992), o compartimento dianteiro tradicional é ocupado pelo radiador
              central único; há espaço interno para bagagem atrás dos bancos concha.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
