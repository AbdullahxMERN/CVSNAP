'use client';

import { Zap } from 'lucide-react';

export default function About() {
  const cards = [
    {
      badge: 'PILLAR 01',
      title: 'VISUAL MAGNETISM',
      color: '#ff64d5',
      textColor: 'text-white',
      desc: 'Recruiters spend 6 seconds on an initial scan. Our layouts leverage high-contrast visual anchors, ensuring your peak achievements command immediate focus.',
      sticker: '🎯 6-SECOND HOOK',
    },
    {
      badge: 'PILLAR 02',
      title: 'TYPOGRAPHIC DIGNITY',
      color: '#ffd905',
      textColor: 'text-black',
      desc: 'Proportional margins, baseline grids, and curated typefaces ensure your document looks like a publication from a premier design studio, not a generic word doc.',
      sticker: '📐 GOLDEN RATIO',
    },
    {
      badge: 'PILLAR 03',
      title: 'ATS-COMPLIANT HIERARCHY',
      color: '#48A4FF',
      textColor: 'text-black',
      desc: 'Behind the electric styling is pure semantic HTML. Workday, Greenhouse, and Lever read every heading, date, and milestone without dropped tokens.',
      sticker: '🤖 100% PARSEABLE',
    },
  ];

  return (
    <section id="about" className="py-28 px-4 sm:px-8 bg-[#fff4c2] border-b-[3px] border-black bg-retro-grid">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff64d5] border-2 border-black text-white text-xs font-black shadow-[3px_3px_0px_#000]">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>THE PHILOSOPHY</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none">
            <span className="text-[#ffd905] text-stroke-black-thick drop-shadow-[4px_4px_0px_#000]">
              ABOUT
            </span>{' '}
            <span className="text-black">THE CRAFT</span>
          </h2>

          <p className="font-rock text-sm sm:text-base text-black max-w-xl mx-auto">
            "Your career history is too impressive to be stuffed into an uninspired monochrome table."
          </p>
        </div>

        {/* 3 Neo-Brutalist Cards — stagger fade-in */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="nb-box rounded-2xl p-7 relative transition-all duration-300 hover:-translate-y-3 hover:shadow-[8px_8px_0px_#000] flex flex-col justify-between group"
              style={{ backgroundColor: card.color }}
            >
              {/* Top shine line */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-black/20" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-xs font-black px-2.5 py-1 bg-black text-white rounded">
                    {card.badge}
                  </span>
                  <span className="font-bebas text-xs px-2.5 py-0.5 bg-white border border-black rounded-full font-bold text-black shadow-[2px_2px_0px_#000] group-hover:rotate-6 transition-transform duration-300">
                    {card.sticker}
                  </span>
                </div>

                <h3 className={`font-bebas text-3xl tracking-wide ${card.textColor} leading-tight group-hover:tracking-widest transition-all duration-300`}>
                  {card.title}
                </h3>

                <p className={`text-xs sm:text-sm font-medium leading-relaxed ${card.textColor === 'text-white' ? 'text-white/90' : 'text-black/85'}`}>
                  {card.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t-2 border-black/20 flex items-center justify-between text-xs font-mono-tech font-bold">
                <span className={card.textColor}>ELEGANCE ENGINE</span>
                <span className={card.textColor}>0{idx + 1} / 03</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
