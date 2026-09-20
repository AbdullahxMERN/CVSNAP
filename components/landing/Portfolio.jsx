'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { templates } from '@/lib/templatesRegistry';
import TemplateThumbnail from '@/components/templates/TemplateThumbnail';
import { ArrowUpRight, Flame, Eye, Zap } from 'lucide-react';

const CATEGORIES = ['ALL', 'TECH', 'DESIGN', 'LEADERSHIP', 'EDITORIAL', 'CLASSIC', 'CONTEMPORARY', 'ACADEMIC'];

function TemplateCard({ tmpl }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 h-[340px] sm:h-[360px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`flip-card w-full h-full ${flipped ? 'flipped' : ''}`}>
        {/* ── FRONT ── */}
        <div className="flip-card-front nb-box rounded-2xl bg-white flex flex-col overflow-hidden">
          {/* Mini preview */}
          <div className="flex-1 relative overflow-hidden rounded-t-xl bg-white border-b-2 border-black">
            <TemplateThumbnail templateId={tmpl.id} />
            {/* Category badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="font-mono-tech text-[9px] font-bold px-2 py-0.5 rounded bg-[#ffd905] border border-black text-black uppercase shadow-[1px_1px_0_#000]">
                {tmpl.category}
              </span>
            </div>
          </div>

          {/* Info footer */}
          <div className="p-3.5 border-t-2 border-black">
            <div className="flex items-center justify-between">
              <h3 className="font-bebas text-xl text-black tracking-wide">{tmpl.name}</h3>
              <Eye className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-[10.5px] text-slate-600 font-medium line-clamp-1 mt-0.5">
              {tmpl.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {tmpl.tags?.slice(0, 2).map((t) => (
                <span key={t} className="text-[9px] font-mono-tech px-1.5 py-0.5 bg-slate-100 border border-black/30 rounded text-black">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-card-back nb-box rounded-2xl flex flex-col items-center justify-center p-6 text-center gap-4"
          style={{
            background: `linear-gradient(145deg, ${tmpl.colors?.primary || '#1e293b'} 0%, #000 100%)`,
          }}
        >
          {/* Accent circle */}
          <div
            className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center mb-1"
            style={{ background: tmpl.colors?.accent || '#6366f1' }}
          >
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>

          <div>
            <h3 className="font-bebas text-3xl text-white tracking-wider leading-none">{tmpl.name}</h3>
            <p className="font-mono-tech text-xs text-white/60 mt-1 uppercase tracking-widest">{tmpl.category} EDITION</p>
          </div>

          <p className="text-white/80 text-xs leading-relaxed font-medium">
            {tmpl.description}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mb-1">
            {tmpl.tags?.map((t) => (
              <span
                key={t}
                className="font-mono-tech text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30 text-white/80"
              >
                #{t}
              </span>
            ))}
          </div>

          <Link
            href="/builder"
            className="w-full py-2.5 rounded-xl bg-[#ffd905] text-black font-bebas text-lg tracking-wider border-2 border-white/30 hover:bg-[#ff64d5] hover:text-white transition-colors flex items-center justify-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <span>EDIT IN STUDIO</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeCat, setActiveCat] = useState('ALL');
  const prevCat = useRef('ALL');

  const filtered =
    activeCat === 'ALL'
      ? templates
      : templates.filter((t) => t.category.toUpperCase() === activeCat);

  const handleCatChange = (cat) => {
    prevCat.current = activeCat;
    setActiveCat(cat);
  };

  return (
    <section id="portfolio" className="py-28 px-4 sm:px-8 bg-[#ffcef2] border-b-[3px] border-black bg-retro-dots">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd905] border-2 border-black text-black text-xs font-black shadow-[3px_3px_0px_#000]">
            <Flame className="w-3.5 h-3.5 text-[#ff0522] fill-current" />
            <span>THE 15 EDITIONS</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none">
            <span className="text-[#ffd905] text-stroke-black-thick drop-shadow-[4px_4px_0px_#000]">
              OUR
            </span>{' '}
            <span className="text-[#ff64d5] text-stroke-black-thick drop-shadow-[4px_4px_0px_#000]">
              PORTFOLIO
            </span>
          </h2>

          <p className="font-rock text-xs sm:text-sm text-black max-w-lg mx-auto">
            15 distinct design directions. Hover any card to reveal details — click to launch.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCatChange(cat)}
                className={`px-4 py-1.5 rounded-full font-bebas text-sm sm:text-base tracking-wider border-2 border-black transition-all duration-200 ${
                  isActive
                    ? 'bg-[#ffd905] text-black shadow-[3px_3px_0px_#000] scale-105'
                    : 'bg-white text-black hover:bg-[#ff64d5] hover:text-white shadow-[2px_2px_0px_#000]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Template Cards Grid — stagger animated on category change */}
        <div
          key={activeCat}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children"
        >
          {filtered.map((tmpl) => (
            <TemplateCard key={tmpl.id} tmpl={tmpl} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/builder"
            className="nb-btn inline-flex px-10 py-4 rounded-full bg-black text-[#ffd905] text-base sm:text-lg tracking-wider shadow-[5px_5px_0px_#ff64d5] hover:bg-[#ff64d5] hover:text-white hover:shadow-[5px_5px_0px_#000] font-bebas gap-2"
          >
            <span>BUILD MY RESUME NOW</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
