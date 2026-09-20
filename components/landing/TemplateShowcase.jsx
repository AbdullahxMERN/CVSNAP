'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import Link from 'next/link';
import TemplateThumbnail from '@/components/templates/TemplateThumbnail';
import { demoCVData } from '@/lib/cvData';
import { templates as allTemplates } from '@/lib/templatesRegistry';
import {
  ArrowRight,
  Zap,
  Building2,
  Terminal,
  Award,
  BookOpen,
} from 'lucide-react';

/* ─── GSAP + ScrollTrigger ─────────────────────────────────────────────────── */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all', label: 'All Templates', icon: Award },
  { id: 'corporate', label: 'Corporate', icon: Building2 },
  { id: 'tech', label: 'Modern Tech', icon: Terminal },
  { id: 'classic', label: 'Classic', icon: BookOpen },
];

const CATEGORY_MAP = {
  corporate: ['executive', 'minimal', 'professional', 'academic', 'magazine'],
  tech: ['bold', 'startup', 'modern', 'developer', 'sidebar'],
  classic: ['ats', 'nordic', 'compact', 'creative', 'elegant'],
};

const COLOR_SWATCHES = [
  { name: 'Monochrome', hex: '#1f2937' },
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Burgundy', hex: '#9f1239' },
  { name: 'Violet', hex: '#7c3aed' },
];

export default function TemplateShowcase() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [templateColors, setTemplateColors] = useState({});

  // Refs for GSAP
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subheadRef = useRef(null);
  const catsRef = useRef(null);
  const gridRef = useRef(null);

  // Filter templates
  const filtered = allTemplates.filter((t) => {
    if (categoryFilter === 'all') return true;
    const catList = CATEGORY_MAP[categoryFilter] || [];
    return catList.includes(t.id);
  });

  const handleColorChange = (templateId, hex) => {
    setTemplateColors((prev) => ({
      ...prev,
      [templateId]: hex,
    }));
  };

  /* ─── GSAP ScrollTrigger Animations ────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // ── 1. Badge pill drops in with bounce ──
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: -60,
        opacity: 0,
        scale: 0.5,
        rotation: -8,
        duration: 0.8,
        ease: 'back.out(2.5)',
      });

      // ── 2. Heading text reveal: slides up with clip-path ──
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        skewY: 3,
        duration: 1,
        ease: 'power4.out',
        delay: 0.15,
      });

      // ── 3. Subheading fades in ──
      gsap.from(subheadRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.35,
      });

      // ── 4. Category pills stagger-in from left ──
      if (catsRef.current) {
        gsap.from(catsRef.current.children, {
          scrollTrigger: {
            trigger: catsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          x: -50,
          opacity: 0,
          scale: 0.85,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.8)',
          delay: 0.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ─── Card entrance animations (re-trigger on filter change) ───────────── */
  useEffect(() => {
    if (typeof window === 'undefined' || !gridRef.current) return;

    // Small delay for DOM to update with new cards
    const rafId = requestAnimationFrame(() => {
      const cards = gridRef.current?.querySelectorAll('.template-card');
      if (!cards || cards.length === 0) return;

      // Kill any existing ScrollTriggers on these cards
      cards.forEach((card) => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === card) st.kill();
        });
      });

      // Set initial state
      gsap.set(cards, {
        opacity: 0,
        y: 100,
        scale: 0.88,
        rotateX: 8,
        transformPerspective: 1200,
      });

      // Staggered reveal with 3D depth
      cards.forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.08,
        });
      });

      // Parallax float effect on cards
      cards.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: -30,
          ease: 'none',
        });
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [categoryFilter, filtered.length]);

  return (
    <section
      ref={sectionRef}
      id="templates"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fff4c2] border-b-[3.5px] border-black relative select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Section Header ── */}
        <div className="text-center space-y-3">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff64d5] border-2 border-black text-white text-xs font-black shadow-[3px_3px_0px_#000]"
          >
            <Zap className="w-4 h-4 fill-current text-[#ffd905]" />
            <span>15 ATS-APPROVED TEMPLATES</span>
          </div>

          <h2
            ref={headingRef}
            className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-black drop-shadow-[2px_2px_0px_#fff]"
          >
            15 TEMPLATES.{' '}
            <span className="text-[#ff64d5] text-stroke-black-thick drop-shadow-[5px_5px_0px_#000]">
              INFINITE POSSIBILITIES.
            </span>
          </h2>

          <p
            ref={subheadRef}
            className="font-sans text-base sm:text-lg font-bold text-black/85 max-w-2xl mx-auto leading-relaxed"
          >
            All templates are 100% ATS-parsable, free to preview & edit, and designed to double your interview callbacks.
          </p>
        </div>

        {/* ── CATEGORIES ── */}
        <div
          ref={catsRef}
          className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-none flex-wrap"
        >
          {CATEGORIES.map(({ id, label, icon: Icon }) => {
            const isActive = categoryFilter === id;
            return (
              <button
                key={id}
                onClick={() => setCategoryFilter(id)}
                className={`nb-btn px-6 py-2.5 rounded-full font-bebas text-lg tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-black ${
                  isActive
                    ? 'bg-[#ff64d5] text-white shadow-[3.5px_3.5px_0px_#000] scale-105'
                    : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#ffd905]'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Full-Width Template Gallery Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-2"
          style={{ perspective: '1200px' }}
        >
          {filtered.map((tmpl) => {
            const activeColor = templateColors[tmpl.id] || '#1f2937';

            return (
              <article
                key={tmpl.id}
                className="template-card nb-box rounded-3xl bg-white border-[3.5px] border-black p-4 relative group flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:-translate-y-2 hover:shadow-[10px_10px_0px_#000] transition-all duration-300 will-change-transform"
              >
                {/* ── FULL-WIDTH PREVIEW CONTAINER ── */}
                <div className="relative w-full h-[470px] sm:h-[510px] rounded-2xl border-2 border-black bg-white overflow-hidden shadow-sm group-hover:border-black transition-colors">
                  
                  {/* High-Resolution Thumbnail */}
                  <div className="w-full h-full">
                    <TemplateThumbnail
                      templateId={tmpl.id}
                      data={demoCVData}
                      scale={0.48}
                      primaryColor={activeColor}
                    />
                  </div>

                  {/* Hover Action Overlay */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4 z-20">
                    <Link
                      href={`/builder?template=${tmpl.id}`}
                      className="nb-btn px-8 py-3.5 rounded-full bg-[#ffd905] text-black font-bebas text-xl tracking-wider shadow-[4px_4px_0px_#000] hover:bg-[#ff64d5] hover:text-white flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <span>Use This Template</span>
                      <ArrowRight className="w-5 h-5 stroke-[3px]" />
                    </Link>
                  </div>
                </div>

                {/* ── Bottom Section: Color Swatches & Details ── */}
                <div className="pt-4 space-y-3">
                  
                  {/* Interactive Color Swatch Dots */}
                  <div className="flex items-center gap-2">
                    {COLOR_SWATCHES.map((swatch) => {
                      const isSelected = activeColor === swatch.hex;
                      return (
                        <button
                          key={swatch.hex}
                          onClick={() => handleColorChange(tmpl.id, swatch.hex)}
                          className={`w-5 h-5 rounded-full border-2 border-black transition-all cursor-pointer ${
                            isSelected ? 'scale-125 ring-2 ring-black shadow-[1px_1px_0px_#000]' : 'hover:scale-110 opacity-90'
                          }`}
                          style={{ backgroundColor: swatch.hex }}
                          title={swatch.name}
                        />
                      );
                    })}
                  </div>

                  {/* Template Title & Action Button */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div>
                      <h3 className="font-bebas text-2xl sm:text-3xl text-black tracking-wide leading-none uppercase">
                        {tmpl.name}
                      </h3>
                      <p className="font-sans text-xs font-bold text-black/70 leading-snug mt-1 truncate max-w-[210px]">
                        {tmpl.description}
                      </p>
                    </div>

                    <Link
                      href={`/builder?template=${tmpl.id}`}
                      className="w-10 h-10 rounded-full bg-[#ff64d5] text-white border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center shrink-0 hover:bg-[#ffd905] hover:text-black transition-colors"
                      title="Build with this template"
                    >
                      <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
                    </Link>
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
