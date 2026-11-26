import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Move,
  Pause,
  Play,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  HotspotItem,
  SHOWROOM_ANGLES,
  VEHICLE_IDENTITY,
} from '../data/gt3rsData';
import { ResilientImage } from './ResilientImage';

export function MultiAngleShowroom() {
  const [angleIndex, setAngleIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotItem | null>(
    SHOWROOM_ANGLES[0].hotspots[0]
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
    lastStepX: number;
  }>({
    dragging: false,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    lastStepX: 0,
  });

  const currentAngle = SHOWROOM_ANGLES[angleIndex];

  // Auto-cycle angles when toggled on and not zoomed in
  useEffect(() => {
    if (!autoRotate) return;
    const timer = window.setInterval(() => {
      setAngleIndex((prev) => {
        const next = (prev + 1) % SHOWROOM_ANGLES.length;
        setSelectedHotspot(SHOWROOM_ANGLES[next].hotspots[0] ?? null);
        return next;
      });
    }, 3200);
    return () => window.clearInterval(timer);
  }, [autoRotate]);

  // Escape exits fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight') handleAngleSelect((angleIndex + 1) % SHOWROOM_ANGLES.length);
      if (e.key === 'ArrowLeft')
        handleAngleSelect(
          (angleIndex - 1 + SHOWROOM_ANGLES.length) % SHOWROOM_ANGLES.length
        );
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen, angleIndex]);

  const handleAngleSelect = (idx: number) => {
    setAngleIndex(idx);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedHotspot(SHOWROOM_ANGLES[idx].hotspots[0] ?? null);
  };

  const handleResetView = () => {
    setAutoRotate(false);
    setAngleIndex(0);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedHotspot(SHOWROOM_ANGLES[0].hotspots[0] ?? null);
  };

  const handleHotspotClick = (spot: HotspotItem) => {
    setAutoRotate(false);
    setSelectedHotspot(spot);
    // Smoothly zoom and center slightly toward the selected hotspot
    const targetZoom = 1.55;
    const offsetX = Math.max(-22, Math.min(22, (50 - spot.x) * 0.55));
    const offsetY = Math.max(-18, Math.min(18, (50 - spot.y) * 0.55));
    setZoom(targetZoom);
    setPan({ x: offsetX, y: offsetY });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore drags starting on hotspot buttons
    if ((e.target as HTMLElement).closest('button')) return;
    setAutoRotate(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
      lastStepX: e.clientX,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragStateRef.current;
    if (!d.dragging) return;

    if (zoom > 1.05) {
      // Pan inside zoomed frame
      const stage = stageRef.current;
      const w = stage?.clientWidth || 1000;
      const h = stage?.clientHeight || 560;
      const dxPct = ((e.clientX - d.startX) / w) * 100;
      const dyPct = ((e.clientY - d.startY) / h) * 100;
      const maxPan = (zoom - 1) * 35;
      setPan({
        x: Math.max(-maxPan, Math.min(maxPan, d.startPanX + dxPct)),
        y: Math.max(-maxPan, Math.min(maxPan, d.startPanY + dyPct)),
      });
    } else {
      // Scrub horizontally across studio angles when unzoomed
      const deltaStep = e.clientX - d.lastStepX;
      if (Math.abs(deltaStep) >= 85) {
        const dir = deltaStep > 0 ? -1 : 1;
        d.lastStepX = e.clientX;
        setAngleIndex((prev) => {
          const next = (prev + dir + SHOWROOM_ANGLES.length) % SHOWROOM_ANGLES.length;
          setSelectedHotspot(SHOWROOM_ANGLES[next].hotspots[0] ?? null);
          return next;
        });
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.dragging) {
      dragStateRef.current.dragging = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already released
      }
    }
  };

  const handleZoomStep = (delta: number) => {
    setZoom((prev) => {
      const next = Math.max(1, Math.min(2.4, Number((prev + delta).toFixed(2))));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const viewerStage = (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#070709] flex flex-col justify-between p-4 sm:p-6'
          : 'relative'
      }
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-3 text-xs text-[#A8B0BC]">
          <span className="font-medium text-white">{currentAngle.label}</span>
          <span aria-hidden="true">·</span>
          <span>Visualização multiângulo (4 perspectivas em estúdio)</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleZoomStep(-0.3)}
            disabled={zoom <= 1}
            aria-label="Reduzir zoom"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-[#131418] p-2 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px] min-w-[40px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <span className="font-mono text-xs text-[#D0D5DD] w-12 text-center tabular-nums">
            {zoom.toFixed(1)}×
          </span>

          <button
            type="button"
            onClick={() => handleZoomStep(0.3)}
            disabled={zoom >= 2.4}
            aria-label="Ampliar zoom"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-[#131418] p-2 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px] min-w-[40px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
              setAutoRotate((prev) => !prev);
            }}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition-colors min-h-[40px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] ${
              autoRotate
                ? 'border-[#F2C94C] bg-[#F2C94C]/15 text-[#F2C94C]'
                : 'border-white/15 bg-[#131418] text-[#D0D5DD] hover:text-white hover:bg-white/10'
            }`}
          >
            {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>Alternância Automática</span>
          </button>

          <button
            type="button"
            onClick={handleResetView}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-[#131418] px-3 py-2 text-xs font-medium text-[#D0D5DD] hover:text-white hover:bg-white/10 transition-colors min-h-[40px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restaurar</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            aria-label={isFullscreen ? 'Sair da tela cheia' : 'Visualizar em tela cheia'}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-[#131418] px-3 py-2 text-xs font-medium text-[#D0D5DD] hover:text-white hover:bg-white/10 transition-colors min-h-[40px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Fechar</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Tela Cheia</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage + Hotspot Details Panel */}
      <div
        className={`grid gap-6 ${
          isFullscreen ? 'flex-1 min-h-0 lg:grid-cols-[1fr_360px]' : 'lg:grid-cols-[1fr_360px]'
        } items-stretch`}
      >
        {/* Interactive Canvas */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative overflow-hidden rounded-lg border border-white/10 bg-[#0D0E12] select-none ${
            zoom > 1.05 ? 'cursor-grab active:cursor-grabbing' : 'cursor-ew-resize'
          } ${isFullscreen ? 'h-full min-h-[380px]' : 'aspect-[16/9]'}`}
        >
          {/* Transformed layer containing BOTH image and hotspots so coordinates remain locked during zoom/pan */}
          <div
            className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate3d(${pan.x}%, ${pan.y}%, 0) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            <ResilientImage
              src={currentAngle.image}
              alt={currentAngle.alt}
              className="h-full w-full object-cover object-center pointer-events-none"
            />

            {/* Clickable Hotspots pinned directly on vehicle components */}
            {currentAngle.hotspots.map((spot, idx) => {
              const isSelected = selectedHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => handleHotspotClick(spot)}
                  aria-label={`Inspecionar ${spot.name}`}
                  aria-pressed={isSelected}
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    transform: `translate(-50%, -50%) scale(${(1 / zoom).toFixed(3)})`,
                  }}
                  className={`group absolute z-20 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isSelected
                      ? 'border-[#F2C94C] bg-[#F2C94C] text-[#0A0A0C] shadow-[0_0_0_6px_rgba(242,201,76,0.22)]'
                      : 'border-white/70 bg-[#0A0A0C]/80 text-white hover:border-[#F2C94C] hover:bg-[#F2C94C] hover:text-[#0A0A0C]'
                  }`}
                >
                  <span className="font-mono text-xs font-semibold tabular-nums">{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Left/Right Angle Quick Step Overlay */}
          <button
            type="button"
            onClick={() =>
              handleAngleSelect(
                (angleIndex - 1 + SHOWROOM_ANGLES.length) % SHOWROOM_ANGLES.length
              )
            }
            aria-label="Ângulo anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0C]/75 text-white hover:bg-[#0A0A0C] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => handleAngleSelect((angleIndex + 1) % SHOWROOM_ANGLES.length)}
            aria-label="Próximo ângulo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0C]/75 text-white hover:bg-[#0A0A0C] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Subtle drag guidance bottom-left */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-md bg-[#0A0A0C]/80 px-3 py-1.5 text-xs text-[#D0D5DD] backdrop-blur-sm border border-white/10">
            <Move className="h-3.5 w-3.5 text-[#F2C94C]" aria-hidden="true" />
            <span>
              {zoom > 1.05
                ? 'Arraste para mover o recorte ampliado'
                : 'Arraste horizontalmente para alternar ângulos ou clique nos pontos numerados'}
            </span>
          </div>
        </div>

        {/* Component Hotspot Inspector Panel */}
        <aside className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#121317] p-5">
          {selectedHotspot ? (
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-[#9AA3B0]">
                <span>{selectedHotspot.category}</span>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  aria-label="Redefinir enquadramento"
                  className="inline-flex items-center gap-1 text-[#D0D5DD] hover:text-white cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Enquadramento total</span>
                </button>
              </div>

              <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded-md border border-white/10">
                <ResilientImage
                  src={selectedHotspot.detailImage}
                  alt={selectedHotspot.detailAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white leading-snug">
                {selectedHotspot.name}
              </h3>

              <p className="mt-2 text-sm text-[#B2B8C2] leading-relaxed">
                {selectedHotspot.summary}
              </p>

              <p className="mt-4 border-t border-white/10 pt-3 font-mono text-xs text-[#F2C94C]">
                {selectedHotspot.specHighlight}
              </p>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-center text-sm text-[#8E95A0]">
              Selecione qualquer ponto numerado sobre o veículo para inspecionar o componente.
            </div>
          )}

          {/* Color & Finish specification footer */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-[#8E95A0]">Acabamento fotografado</p>
                <p className="text-sm font-medium text-white mt-0.5">
                  {VEHICLE_IDENTITY.colorName} ({VEHICLE_IDENTITY.colorPt})
                </p>
              </div>
              <span
                aria-hidden="true"
                className="h-7 w-7 rounded-full border border-white/30 shrink-0"
                style={{ backgroundColor: VEHICLE_IDENTITY.colorHex }}
              />
            </div>
            <p className="mt-2 text-xs text-[#8E95A0]">
              Unidade configurada com Pacote Weissach em CFRP aparente e rodas Satin Black.
            </p>
          </div>
        </aside>
      </div>

      {/* Angle Selector Strip */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SHOWROOM_ANGLES.map((angle, idx) => {
          const active = idx === angleIndex;
          return (
            <button
              key={angle.id}
              type="button"
              onClick={() => handleAngleSelect(idx)}
              className={`group flex items-center gap-3 rounded-md border p-2.5 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] ${
                active
                  ? 'border-[#F2C94C] bg-[#191B20] text-white'
                  : 'border-white/10 bg-[#121317] text-[#A8B0BC] hover:border-white/25 hover:text-white'
              }`}
            >
              <div className="h-11 w-16 shrink-0 overflow-hidden rounded-sm border border-white/10">
                <ResilientImage
                  src={angle.image}
                  alt={angle.shortLabel}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono text-[#8E95A0] tabular-nums">0{idx + 1}</p>
                <p className="text-xs sm:text-sm font-medium truncate">{angle.shortLabel}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      id="showroom"
      className="border-t border-white/10 bg-[#0A0A0C] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-medium tracking-wider text-[#F2C94C] uppercase">
            01. Showroom Multiângulo & Inspeção
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase text-balance">
            Cada superfície esculpida pelo fluxo de ar.
          </h2>
          <p className="mt-3 text-base text-[#A8B0BC] leading-relaxed">
            {currentAngle.description} Navegue pelas quatro perspectivas de estúdio, amplie os
            detalhes e clique nos pontos numerados sobre a carroceria.
          </p>
        </div>

        {viewerStage}
      </div>
    </section>
  );
}
