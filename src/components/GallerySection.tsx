import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/gt3rsData';
import { ResilientImage } from './ResilientImage';

type FilterCategory = 'todas' | 'exterior' | 'interior' | 'detalhes';

const FILTER_OPTIONS: { id: FilterCategory; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'interior', label: 'Interior' },
  { id: 'detalhes', label: 'Detalhes' },
];

export function GallerySection() {
  const [filter, setFilter] = useState<FilterCategory>('todas');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const visibleItems =
    filter === 'todas'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  const activeLightboxIndex = lightboxItem
    ? visibleItems.findIndex((i) => i.id === lightboxItem.id)
    : -1;

  const stepLightbox = (dir: number) => {
    if (visibleItems.length === 0 || activeLightboxIndex < 0) return;
    const nextIdx = (activeLightboxIndex + dir + visibleItems.length) % visibleItems.length;
    setLightboxItem(visibleItems[nextIdx]);
  };

  useEffect(() => {
    if (!lightboxItem) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxItem, activeLightboxIndex, visibleItems]);

  return (
    <section
      id="galeria"
      className="border-t border-white/10 bg-[#0A0A0C] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium tracking-wider text-[#F2C94C] uppercase">
              05. Galeria Fotográfica
            </p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Estúdio em alta resolução.
            </h2>
          </div>

          {/* Interactive Category Segmented Filter */}
          <div
            role="tablist"
            aria-label="Filtrar galeria fotográfica"
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#121317] p-1 self-start md:self-auto"
          >
            {FILTER_OPTIONS.map((opt) => {
              const active = filter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(opt.id)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors min-h-[36px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] ${
                    active
                      ? 'bg-[#F2C94C] text-[#0A0A0C] font-semibold'
                      : 'text-[#A8B0BC] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <figure
              key={item.id}
              className={`group relative overflow-hidden rounded-lg border border-white/10 bg-[#121317] ${
                item.aspect === 'wide' && filter === 'todas' ? 'lg:col-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setLightboxItem(item)}
                aria-label={`Ampliar foto: ${item.title}`}
                className="block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
              >
                <div
                  className={`w-full overflow-hidden ${
                    item.aspect === 'wide' && filter === 'todas'
                      ? 'aspect-[16/9] lg:aspect-[21/10]'
                      : 'aspect-[4/3]'
                  }`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-4 sm:p-5 flex items-end justify-between gap-4 border-t border-white/[0.07]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#8E95A0]">
                      <span>{item.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>Ice Grey Metallic</span>
                    </div>
                    <figcaption className="mt-1 text-base font-semibold text-white">
                      {item.title}
                    </figcaption>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#98A1AE]">{item.caption}</p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/5 text-[#D0D5DD] group-hover:border-[#F2C94C] group-hover:text-[#F2C94C] transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização ampliada: ${lightboxItem.title}`}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#070709]/95 backdrop-blur-md p-4 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#A8B0BC]">
              <span className="font-mono tabular-nums text-[#F2C94C]">
                {String(activeLightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(visibleItems.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-white font-medium">{lightboxItem.title}</span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Fechar ampliação"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/15 min-h-[40px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
            >
              <X className="h-4 w-4" />
              <span>Fechar</span>
            </button>
          </div>

          <div className="relative my-4 flex-1 min-h-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => stepLightbox(-1)}
              aria-label="Foto anterior"
              className="absolute left-2 sm:left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0A0A0C]/80 text-white hover:bg-[#0A0A0C] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="h-full max-h-[78vh] w-full max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-[#0D0E12]">
              <ResilientImage
                src={lightboxItem.image}
                alt={lightboxItem.alt}
                className="h-full w-full object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => stepLightbox(1)}
              aria-label="Próxima foto"
              className="absolute right-2 sm:right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0A0A0C]/80 text-white hover:bg-[#0A0A0C] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="text-center text-sm text-[#B2B8C2]">{lightboxItem.caption}</p>
        </div>
      )}
    </section>
  );
}
