import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { ENGINEERING_CHAPTERS } from '../data/gt3rsData';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

export function ScrollytellingEngineering() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const chapters = root.querySelectorAll<HTMLElement>('[data-chapter]');

      chapters.forEach((chapter) => {
        const textBlock = chapter.querySelector('[data-chapter-text]');
        const mediaBlock = chapter.querySelector('[data-chapter-media]');
        const imgInner = chapter.querySelector('[data-chapter-img]');

        if (textBlock) {
          gsap.fromTo(
            textBlock,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (mediaBlock) {
          gsap.fromTo(
            mediaBlock,
            { opacity: 0.55, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 80%',
                end: 'bottom 40%',
                scrub: 0.6,
              },
            }
          );
        }

        if (imgInner) {
          gsap.fromTo(
            imgInner,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: chapter,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="engenharia"
      ref={sectionRef}
      className="border-t border-white/10 bg-[#0A0A0C] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-medium tracking-wider text-[#F2C94C] uppercase">
            03. Engenharia & Dinâmica de Pista
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase text-balance">
            Transferência direta do automobilismo GT para a estrada.
          </h2>
        </div>

        <div className="space-y-20 md:space-y-28">
          {ENGINEERING_CHAPTERS.map((chapter, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <article
                key={chapter.id}
                data-chapter={chapter.id}
                className="grid gap-10 lg:grid-cols-12 items-center"
              >
                {/* Copy & Verified Metrics */}
                <div
                  data-chapter-text
                  className={`lg:col-span-5 space-y-5 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-[#98A1AE]">
                    <span className="font-mono text-[#F2C94C]">{chapter.index}.</span>
                    <span aria-hidden="true">·</span>
                    <span>{chapter.kicker}</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight text-balance">
                    {chapter.title}
                  </h3>

                  <p className="text-base text-[#A8B0BC] leading-relaxed">{chapter.body}</p>

                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-5">
                    {chapter.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xs text-[#8E95A0]">{m.label}</dt>
                        <dd className="mt-1 font-mono text-sm sm:text-base font-medium text-white tabular-nums">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Parallax Media Container */}
                <div
                  data-chapter-media
                  className={`lg:col-span-7 overflow-hidden rounded-lg border border-white/10 bg-[#121317] ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden">
                    <div data-chapter-img className="h-[112%] w-full -mt-[6%]">
                      <ResilientImage
                        src={chapter.image}
                        alt={chapter.imageAlt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
