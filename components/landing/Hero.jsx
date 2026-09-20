'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Star, Zap } from 'lucide-react';
import TemplateThumbnail from '@/components/templates/TemplateThumbnail';
import { demoCVData } from '@/lib/cvData';

const TYPEWRITER_PHRASES = [
  'NO FORMATTING NIGHTMARES',
  'NO HIDDEN SUBSCRIPTIONS',
  '100% ATS-APPROVED TEMPLATES',
  'LAND 3X MORE INTERVIEWS',
];

function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];

    if (!deleting && displayed.length < currentPhrase.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentPhrase.slice(0, displayed.length + 1));
      }, 60);
    } else if (!deleting && displayed.length === currentPhrase.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentPhrase.slice(0, displayed.length - 1));
      }, 28);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, phraseIndex]);

  return (
    <span className="font-mono-tech text-xs sm:text-sm text-black font-black uppercase tracking-widest">
      {displayed}
      <span className="animate-blink ml-0.5">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center">

      {/* ── Animated Gradient Background Layers ── */}
      <div className="hero-bg" />
      <div className="hero-bg hero-bg2" />
      <div className="hero-bg hero-bg3" />

      {/* Floating sticker decorations */}
      <div className="absolute top-28 left-4 sm:left-12 rotate-[-12deg] z-10 animate-sway hidden sm:block">
        <div className="px-3.5 py-1.5 rounded-full bg-[#ff64d5] border-2 border-black shadow-[4px_4px_0px_#000] text-white font-bebas text-sm sm:text-base tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-[#ffd905] fill-current" />
          <span>PASSES ALL ATS ROBOTS</span>
        </div>
      </div>

      <div className="absolute top-36 right-4 sm:right-14 rotate-[10deg] z-10 animate-float hidden sm:block">
        <div className="px-4 py-2 rounded-2xl bg-[#ffd905] border-2 border-black shadow-[4px_4px_0px_#000] text-black font-bebas text-sm sm:text-base tracking-wider flex items-center gap-1.5">
          <Star className="w-4 h-4 text-black fill-current" />
          <span>15 ATS-APPROVED EDITIONS</span>
        </div>
      </div>

      <div className="absolute bottom-28 left-8 rotate-[6deg] z-10 animate-sway hidden md:block" style={{ animationDelay: '1.2s' }}>
        <span className="font-rock text-xs sm:text-sm text-black bg-white px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000] rounded-lg">
          ⚡ &quot;Downloaded in 30 seconds!&quot;
        </span>
      </div>

      <div className="absolute top-24 left-1/2 -translate-x-1/2 rotate-[-3deg] z-10 animate-float hidden lg:block" style={{ animationDelay: '0.5s' }}>
        <div className="px-3 py-1 rounded-lg bg-[#1eac1a] border-2 border-black shadow-[3px_3px_0px_#000] text-white font-mono-tech text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Zap className="w-3 h-3 fill-current" />
          <span>ONE-TIME $5 DOWNLOAD</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative text-center max-w-4xl mx-auto z-20 space-y-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-black shadow-[3px_3px_0px_#000] mb-1 animate-slide-up">
          <Zap className="w-4 h-4 text-[#ff64d5] fill-current" />
          <TypewriterText />
        </div>

        {/* Main headline (H1) */}
        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.92] text-black select-none animate-slide-up-delay-1 drop-shadow-[4px_4px_0px_#fff]">
          Don’t let an <span className="text-[#ff64d5] text-stroke-black-thick drop-shadow-[5px_5px_0px_#000]">ugly resume</span> cost you the interview.
        </h1>

        {/* Sub-headline */}
        <p className="font-sans text-base sm:text-xl font-bold text-black/90 max-w-2xl mx-auto pt-2 leading-relaxed animate-slide-up-delay-2">
          Stand out with 15 premium, ATS-approved templates. Build your perfect CV in minutes. No formatting nightmares. No hidden subscriptions.
        </p>

        {/* Primary CTA & Note */}
        <div className="flex flex-col items-center justify-center gap-3 pt-2 animate-slide-up-delay-3">
          <Link
            href="/builder"
            className="nb-btn shine-effect px-9 py-4 sm:px-10 sm:py-5 rounded-full bg-[#ff64d5] text-white font-bebas text-2xl sm:text-3xl tracking-wider shadow-[6px_6px_0px_#000] hover:bg-[#ffd905] hover:text-black flex items-center gap-3 transition-transform"
          >
            <span>Start Building Now</span>
            <ArrowRight className="w-7 h-7 stroke-[3px]" />
          </Link>

          {/* Small text under button */}
          <p className="font-mono-tech text-xs sm:text-sm font-bold text-black/80 max-w-md mx-auto pt-1">
            Try free in full editor preview. Sign in with 1-click Google when ready to download your ATS resume.
          </p>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6 animate-slide-up-delay-3">
          {[
            { val: '15', label: 'Templates' },
            { val: '100%', label: 'ATS Parsable' },
            { val: '$5', label: 'One-Time' },
            { val: '0', label: 'Subscriptions' },
          ].map(({ val, label }) => (
            <div key={val} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-black shadow-[2.5px_2.5px_0px_#000]">
              <span className="font-bebas text-xl text-[#ff64d5] leading-none">{val}</span>
              <span className="font-mono-tech text-[11px] font-bold text-black uppercase">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Minimalist Template Preview (Full HD) ── */}
      <div className="relative w-full max-w-2xl mt-12 z-20 group animate-slide-up-delay-3 mx-auto">
        <div className="nb-box rounded-2xl bg-white p-0 relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_#000]">
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '794 / 1123' }}>
            <TemplateThumbnail
              templateId="minimal"
              data={demoCVData}
              scale="fit"
              primaryColor="#1f2937"
            />
            {/* Subtle gradient fade at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)' }}
            />
            {/* Hover CTA overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 group-hover:backdrop-blur-[2px] transition-all duration-300 rounded-2xl flex items-center justify-center z-20">
              <Link
                href="/builder"
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 nb-btn px-8 py-3.5 rounded-full bg-[#ff64d5] text-white font-bebas text-xl tracking-wider shadow-[4px_4px_0px_#000] hover:bg-[#ffd905] hover:text-black flex items-center gap-2"
              >
                <span>BUILD YOUR RESUME</span>
                <ArrowRight className="w-5 h-5 stroke-[3px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}


