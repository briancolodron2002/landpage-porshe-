import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  onRequestProposal: () => void;
}

const NAV_LINKS = [
  { href: '#showroom', label: 'Showroom' },
  { href: '#cabine', label: 'Cabine' },
  { href: '#engenharia', label: 'Engenharia' },
  { href: '#ficha-tecnica', label: 'Ficha Técnica' },
  { href: '#galeria', label: 'Galeria' },
];

export function TopBar({ onRequestProposal }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0A0C]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-3.5 md:px-10">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#hero"
          className="font-display text-xl font-semibold tracking-wide text-white uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] rounded-sm"
        >
          Porsche 911 GT3 RS
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#B2B8C2] hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 border-b border-transparent hover:border-white/50 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestProposal}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#F2C94C] px-4 py-2 text-xs font-semibold tracking-wide text-[#0A0A0C] hover:bg-[#F5D36A] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Solicitar Proposta
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="lg:hidden inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 p-2 text-white hover:bg-white/10 min-h-[44px] min-w-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Navegação móvel"
          className="lg:hidden border-t border-white/10 bg-[#0D0E12] px-6 py-4 space-y-2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-[#D0D5DD] hover:bg-white/5 hover:text-white min-h-[44px]"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onRequestProposal();
            }}
            className="mt-2 w-full rounded-md bg-[#F2C94C] px-4 py-3 text-sm font-semibold text-[#0A0A0C] hover:bg-[#F5D36A] min-h-[44px] cursor-pointer"
          >
            Solicitar Proposta
          </button>
        </nav>
      )}
    </header>
  );
}
