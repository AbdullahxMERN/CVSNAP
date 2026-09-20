'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Folder, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

const FOLDERS = [
  {
    id: 'executive',
    tab: 'FOLDER 01 // EXECUTIVE',
    title: 'THE LEADERSHIP BLUEPRINT',
    color: '#ff64d5',
    tabColor: 'bg-[#ff64d5]',
    quote: '“For VP, C-Suite, and Senior Director candidates where strategic gravity and P&L authority must radiate instantly.”',
    checklist: [
      'Top 1/3 focuses on total enterprise impact ($ revenue generated, headcount led)',
      'High-authority serif typography (Playfair Display) conveys stature',
      'Curated board memberships, publications, and keynotes prominently placed',
      'Distilled achievements instead of granular daily tasks',
    ],
    recommendedTemplate: 'executive',
  },
  {
    id: 'developer',
    tab: 'FOLDER 02 // ENGINEERING',
    title: 'THE TECH ARCHITECT BLUEPRINT',
    color: '#48A4FF',
    tabColor: 'bg-[#48A4FF]',
    quote: '“For Principal Engineers, Systems Architects, and Tech Leads who speak in throughput, latency, and scale.”',
    checklist: [
      'Monospaced typography (JetBrains Mono) for tech specs & architecture tags',
      'Prominent GitHub, system designs, and production incident recovery metrics',
      'Infrastructure stack chips (Kubernetes, Rust, React, AWS, Docker)',
      'Sub-millimeter ATS readability for tech screening algorithms',
    ],
    recommendedTemplate: 'developer',
  },
  {
    id: 'creative',
    tab: 'FOLDER 03 // CREATIVE',
    title: 'THE DESIGN DIRECTOR BLUEPRINT',
    color: '#1eac1a',
    tabColor: 'bg-[#1eac1a]',
    quote: '“For Product Designers, Creative Directors, and Brand Strategists where typography IS the qualification.”',
    checklist: [
      'Harmonious dual-tone visual sidebar with prominent portfolio link',
      'Case study outcome metrics (% retention jump, awards won)',
      'Visual breathing room with generous whitespace geometry',
      'Custom color palette customization to match your personal design identity',
    ],
    recommendedTemplate: 'creative',
  },
  {
    id: 'startup',
    tab: 'FOLDER 04 // FOUNDER',
    title: 'THE VENTURE & STARTUP BLUEPRINT',
    color: '#ff8400',
    tabColor: 'bg-[#ff8400]',
    quote: '“For Early Employees, Growth Leads, and Venture-Backed Operators who ship at breakneck speed.”',
    checklist: [
      'Card-based milestone boxes that showcase 0-to-1 build velocity',
      'Prominent product launches, ARR milestones, and fundraising highlights',
      'Vibrant modern accents that showcase dynamic energy and hustle',
      'Dense information packing without visual clutter',
    ],
    recommendedTemplate: 'startup',
  },
];

export default function Folders() {
  const [activeFolderId, setActiveFolderId] = useState('executive');
  const activeFolder = FOLDERS.find((f) => f.id === activeFolderId) || FOLDERS[0];

  return (
    <section id="folders" className="py-28 px-4 sm:px-8 bg-[#ffd905] border-b-[3px] border-black bg-retro-dots">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-black shadow-[3px_3px_0px_#fff]">
            <Zap className="w-3.5 h-3.5 text-[#ffd905] fill-current" />
            <span>INTERACTIVE CAREER DOSSIERS</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none">
            <span className="text-[#ff64d5] text-stroke-black-thick drop-shadow-[5px_5px_0px_#000]">
              THE FOLDERS
            </span>
          </h2>

          <p className="font-rock text-xs sm:text-sm text-black max-w-lg mx-auto">
            Click any folder tab to inspect industry-proven blueprint strategies.
          </p>
        </div>

        {/* Folder Tabs Header */}
        <div className="flex flex-wrap items-end gap-2 sm:gap-3 border-b-4 border-black pt-4">
          {FOLDERS.map((f) => {
            const isActive = activeFolderId === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFolderId(f.id)}
                className={`font-bebas text-base sm:text-lg tracking-wider px-4 sm:px-6 py-2.5 rounded-t-xl border-t-4 border-x-4 border-black transition-all flex items-center gap-2 ${
                  isActive
                    ? `${f.tabColor} text-black font-black translate-y-[4px] shadow-[4px_-2px_0px_#000]`
                    : 'bg-white/80 text-black hover:bg-white'
                }`}
              >
                <Folder className="w-4 h-4 fill-current" />
                <span>{f.tab}</span>
              </button>
            );
          })}
        </div>

        {/* Folder Paper Content */}
        <div className="nb-box-lg rounded-2xl bg-white p-6 sm:p-10 relative overflow-hidden transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-8 justify-between">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]"
                  style={{ backgroundColor: activeFolder.color }}
                />
                <span className="font-mono-tech text-xs font-bold uppercase tracking-wider text-black bg-[#ffd905] px-2 py-0.5 rounded border border-black">
                  CONFIDENTIAL DOSSIER // APPROVED
                </span>
              </div>

              <h3 className="font-bebas text-4xl sm:text-5xl text-black tracking-wide leading-tight">
                {activeFolder.title}
              </h3>

              <p className="font-rock text-xs sm:text-sm text-slate-800 leading-relaxed bg-[#fff4c2] p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                {activeFolder.quote}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-bebas text-xl text-black tracking-wider">
                  BLUEPRINT STRATEGY CHECKLIST:
                </h4>
                <div className="space-y-2.5">
                  {activeFolder.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-900 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#1eac1a] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action Card */}
            <div className="lg:w-80 p-6 rounded-2xl bg-[#fff4c2] border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between space-y-6 shrink-0">
              <div className="space-y-3">
                <span className="font-bebas text-sm text-black tracking-wider bg-[#ffd905] px-2 py-1 rounded border border-black inline-block">
                  RECOMMENDED ENGINE
                </span>
                <h4 className="font-bebas text-3xl text-black uppercase">
                  {activeFolder.recommendedTemplate} TEMPLATE
                </h4>
                <p className="text-xs text-slate-700 font-medium">
                  Pre-configured with matching margins, fonts, and hierarchy for this exact role.
                </p>
              </div>

              <Link
                href="/builder"
                className="nb-btn w-full py-3 rounded-xl bg-[#ff64d5] text-white text-base tracking-wider shadow-[3px_3px_0px_#000] hover:bg-[#ffd905] hover:text-black flex items-center justify-center gap-2"
              >
                <span>OPEN IN BUILDER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
