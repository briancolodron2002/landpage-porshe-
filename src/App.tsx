import { useState } from 'react';
import {
  CommercialConversionSection,
  InquiryMode,
} from './components/CommercialConversionSection';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { InteriorCabinSection } from './components/InteriorCabinSection';
import { MultiAngleShowroom } from './components/MultiAngleShowroom';
import { ScrollytellingEngineering } from './components/ScrollytellingEngineering';
import { TechSpecsSection } from './components/TechSpecsSection';
import { TopBar } from './components/TopBar';
import { VEHICLE_IDENTITY } from './data/gt3rsData';

export default function App() {
  const [inquiryMode, setInquiryMode] = useState<InquiryMode>('proposal');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestProposal = () => {
    setInquiryMode('proposal');
    scrollToSection('proposta');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F4F6F8]">
      <TopBar onRequestProposal={handleRequestProposal} />

      <main>
        <HeroSection
          onExplore={() => scrollToSection('showroom')}
          onRequestProposal={handleRequestProposal}
        />

        <MultiAngleShowroom />

        <InteriorCabinSection />

        <ScrollytellingEngineering />

        <TechSpecsSection />

        <GallerySection />

        <CommercialConversionSection
          selectedMode={inquiryMode}
          onModeChange={setInquiryMode}
        />
      </main>

      <footer className="border-t border-white/10 bg-[#0A0A0C] py-10">
        <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 md:px-10 text-xs text-[#8E95A0]">
          <div>
            <p className="font-medium text-[#D0D5DD]">
              {VEHICLE_IDENTITY.brand} {VEHICLE_IDENTITY.model} ({VEHICLE_IDENTITY.generation}) ·{' '}
              {VEHICLE_IDENTITY.version} {VEHICLE_IDENTITY.year}
            </p>
            <p className="mt-1">
              Showroom digital demonstrativo em {VEHICLE_IDENTITY.colorName}. Especificações
              técnicas baseadas em dados oficiais Porsche AG.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#hero" className="hover:text-white transition-colors">
              Início
            </a>
            <a href="#showroom" className="hover:text-white transition-colors">
              Showroom
            </a>
            <a href="#ficha-tecnica" className="hover:text-white transition-colors">
              Ficha Técnica
            </a>
            <a href="#galeria" className="hover:text-white transition-colors">
              Galeria
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
