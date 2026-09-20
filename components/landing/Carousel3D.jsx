'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import TemplateThumbnail from '@/components/templates/TemplateThumbnail';
import { demoCVData } from '@/lib/cvData';
import { ArrowLeft, ArrowRight, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

export default function Carousel3D({ templates = [] }) {
  const [activeIdx, setActiveIdx] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef(null);

  // Mouse / Touch drag logic for Desktop 3D stage
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0]?.clientX) || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 40;
    if (dragOffset < -threshold && activeIdx < templates.length - 1) {
      setActiveIdx((prev) => Math.min(prev + 1, templates.length - 1));
    } else if (dragOffset > threshold && activeIdx > 0) {
      setActiveIdx((prev) => Math.max(prev - 1, 0));
    }

    setDragOffset(0);
  };

  const currentTemplate = templates[activeIdx] || templates[0];

  return (
    <div className="w-full bg-[#f8f7fa] border-[3.5px] border-black rounded-3xl p-4 sm:p-8 md:p-10 relative overflow-hidden shadow-[8px_8px_0px_#000] select-none space-y-6">

      {/* ── Top Header Section ── */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff64d5] border-2 border-black text-white text-xs font-black shadow-[2px_2px_0px_#000]">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>FEATURED DESIGNS</span>
        </div>

        <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[0.92] text-black drop-shadow-[2px_2px_0px_#fff]">
          AWARD WINNING <br />
          <span className="text-[#ff64d5] text-stroke-black-thick drop-shadow-[4px_4px_0px_#000]">
            RESUME GALLERY
          </span>
        </h2>

        <p className="font-sans text-xs sm:text-base font-bold text-black/80 leading-relaxed max-w-md mx-auto">
          Explore 15 ATS-approved templates designed to impress recruiters and land interviews.
        </p>
      </div>

      {/* ── MOBILE SNAP CAROUSEL (< 768px) ── */}
      <div className="block md:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-2 scrollbar-none">
          {templates.map((tmpl, idx) => (
            <div
              key={tmpl.id}
              className="snap-center shrink-0 w-[82vw] max-w-[300px] nb-box rounded-2xl bg-white p-3.5 relative flex flex-col justify-between shadow-[5px_5px_0px_#000] border-3 border-black"
            >
              {/* Thumbnail Container */}
              <div className="w-full h-72 rounded-xl overflow-hidden border-2 border-black bg-stone-100 relative">
                <TemplateThumbnail templateId={tmpl.id} data={demoCVData} />

                {/* Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 rounded bg-black text-white font-mono-tech text-[10px] font-bold uppercase tracking-wider">
                    {tmpl.category || 'ATS Approved'}
                  </span>
                </div>
              </div>

              {/* Info & Button */}
              <div className="pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bebas text-2xl text-black tracking-wide leading-none uppercase">
                    {tmpl.name}
                  </h3>
                  <span className="font-mono-tech text-[10px] font-bold text-[#ff64d5] uppercase">
                    100% ATS
                  </span>
                </div>

                <Link
                  href={`/builder?template=${tmpl.id}`}
                  className="nb-btn w-full py-2.5 rounded-full bg-[#ffd905] text-black font-bebas text-lg tracking-wider shadow-[3px_3px_0px_#000] hover:bg-[#ff64d5] hover:text-white flex items-center justify-center gap-1.5"
                >
                  <span>Use This Template</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Note */}
        <p className="font-mono-tech text-[11px] font-bold text-black/60 text-center uppercase tracking-widest pt-1">
          ← Swipe to explore templates →
        </p>
      </div>

      {/* ── DESKTOP & LAPTOP 3D CURVED CAROUSEL (≥ 768px) ── */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="relative w-full h-[420px] lg:h-[460px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing py-4"
          style={{ perspective: '1200px' }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {templates.map((tmpl, idx) => {
              const rawOffset = idx - activeIdx - dragOffset / 180;
              const sign = rawOffset === 0 ? 0 : rawOffset > 0 ? 1 : -1;
              const mag = Math.abs(rawOffset);

              // ── Smooth 3D Curved Ring Math ──
              const translateX = sign * Math.pow(mag, 0.9) * 200;
              const rotateY = -rawOffset * 20; // inward rotation towards center
              const translateZ = -mag * 45 + 30; // center card stays upfront
              const scale = Math.max(0.65, 1 - mag * 0.08);
              const opacity = Math.max(0.12, 1 - mag * 0.22);
              const zIndex = 100 - Math.round(mag * 10);

              const isCurrent = idx === activeIdx;

              return (
                <div
                  key={tmpl.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`absolute w-56 lg:w-64 h-[310px] lg:h-[350px] rounded-2xl border-3 transition-all duration-300 ease-out flex flex-col justify-between p-3.5 shadow-xl overflow-hidden ${isCurrent
                      ? 'border-[#ff64d5] bg-white ring-4 ring-black/15 shadow-[0_20px_45px_rgba(255,100,213,0.3)]'
                      : 'border-black/20 bg-white/95 hover:border-black/50'
                    }`}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Preview Inner Container */}
                  <div className="w-full h-full rounded-xl overflow-hidden border-2 border-black/10 bg-white relative">
                    <TemplateThumbnail templateId={tmpl.id} data={demoCVData} />

                    {/* Hover CTA Overlay */}
                    {isCurrent && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-3 z-30">
                        <Link
                          href={`/builder?template=${tmpl.id}`}
                          className="nb-btn px-5 py-2.5 rounded-full bg-[#ffd905] text-black font-bebas text-xl tracking-wider shadow-[3px_3px_0px_#000] hover:bg-[#ff64d5] hover:text-white flex items-center gap-1.5"
                        >
                          <span>Select Template</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Card Title Footer */}
                  <div className="pt-2 flex items-center justify-between px-1">
                    <span className="font-bebas text-xl tracking-wider text-black leading-none uppercase truncate">
                      {tmpl.name}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-[#ffd905] border border-black font-mono-tech text-[9px] font-black text-black">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drag Overlay Hint */}
          <div className="absolute bottom-3 left-4 z-40 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black text-white font-mono-tech text-xs font-bold flex items-center gap-2 border border-black shadow-[2px_2px_0px_#ff64d5]">
              <span>↔ Drag to Explore 3D Gallery</span>
            </span>
          </div>

          {/* Selection detail CTA button bottom right */}
          {currentTemplate && (
            <div className="absolute bottom-3 right-4 z-40 flex items-center gap-3">
              <span className="hidden lg:inline-block font-mono-tech text-xs font-bold text-black bg-white px-3 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-wider">
                {currentTemplate.name} · {currentTemplate.category || 'ATS Approved'}
              </span>
              <Link
                href={`/builder?template=${currentTemplate.id}`}
                className="nb-btn px-5 py-2 rounded-full bg-[#ff64d5] text-white font-bebas text-lg tracking-wider shadow-[3px_3px_0px_#000] hover:bg-[#ffd905] hover:text-black flex items-center gap-1.5"
              >
                <span>Build with this</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Navigation Arrow Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
            disabled={activeIdx === 0}
            className="w-11 h-11 rounded-full bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#ffd905] disabled:opacity-30 flex items-center justify-center transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-black stroke-[3px]" />
          </button>
          <span className="font-bebas text-xl text-black font-bold tracking-wider">
            {activeIdx + 1} / {templates.length}
          </span>
          <button
            onClick={() => setActiveIdx((prev) => Math.min(templates.length - 1, prev + 1))}
            disabled={activeIdx === templates.length - 1}
            className="w-11 h-11 rounded-full bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#ffd905] disabled:opacity-30 flex items-center justify-center transition-all"
          >
            <ArrowRight className="w-5 h-5 text-black stroke-[3px]" />
          </button>
        </div>
      </div>

    </div>
  );
}
