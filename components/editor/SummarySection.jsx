'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonal } from '@/store/cvSlice';
import { Sparkles, Wand2, Check, RefreshCw, Layers } from 'lucide-react';
import { SUMMARY_CATEGORIES, SUMMARY_TONES } from '@/lib/suggestionsData';

export default function SummarySection() {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.cv.personal) || {};
  const [activeCategory, setActiveCategory] = useState(SUMMARY_CATEGORIES[0].id);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const summaryText = personal.summary || '';

  const handleTextChange = (e) => {
    dispatch(updatePersonal({ summary: e.target.value }));
  };

  const handleInsertSummary = (text, idx) => {
    dispatch(updatePersonal({ summary: text }));
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleAppendTone = (prefix) => {
    if (!summaryText) {
      dispatch(updatePersonal({ summary: prefix }));
    } else {
      dispatch(updatePersonal({ summary: `${prefix} ${summaryText}` }));
    }
  };

  const currentCategoryData = SUMMARY_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="space-y-4 text-black">
      {/* Recruiter Tip Banner */}
      <div className="p-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-start gap-2.5">
        <div className="p-1.5 rounded-lg bg-[#ffd905] border border-black shrink-0">
          <Zap className="w-4 h-4 text-black fill-current" />
        </div>
        <div className="text-xs">
          <span className="font-bold font-mono-tech block uppercase text-[11px] text-black">
            Recruiter Tip
          </span>
          <p className="text-slate-700 leading-snug">
            Write 2–4 sentences highlighting your years of experience, core technical or domain expertise, and a standout measurable achievement.
          </p>
        </div>
      </div>

      {/* Summary Textarea with Toolbar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="font-mono-tech text-xs font-bold text-black uppercase">
            Professional Summary
          </label>
          <span className="font-mono-tech text-[11px] text-slate-500 font-bold">
            {summaryText.length} characters • {summaryText.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>

        <div className="relative">
          <textarea
            rows={5}
            value={summaryText}
            onChange={handleTextChange}
            placeholder="e.g. Results-driven Software Engineer with 5+ years of experience building high-performance web applications and distributed systems. Expert in React, Node.js, and cloud architectures..."
            className="w-full p-3.5 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] transition-colors resize-y leading-relaxed shadow-[2px_2px_0px_#000]"
          />
        </div>
      </div>

      {/* Quick Tone Starters */}
      <div className="space-y-1.5">
        <span className="font-mono-tech text-[11px] font-bold text-slate-700 uppercase block">
          Tone & Opener Starters:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUMMARY_TONES.map((tone) => (
            <button
              key={tone.id}
              type="button"
              onClick={() => handleAppendTone(tone.prefix)}
              className="px-2.5 py-1 rounded-lg bg-white border border-black text-[11px] font-mono-tech font-bold text-black hover:bg-[#ffd905] hover:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1"
            >
              <span>{tone.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pre-written AI/Expert Suggestions Tabs */}
      <div className="pt-2 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono-tech text-xs font-bold text-black uppercase flex items-center gap-1">
            <Wand2 className="w-3.5 h-3.5 text-[#ff64d5]" />
            <span>Pre-Written Verified Summaries</span>
          </span>
          <span className="text-[10px] font-mono-tech text-slate-500">1-click insert</span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1">
          {SUMMARY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold border transition-all ${
                activeCategory === cat.id
                  ? 'bg-black text-white border-black shadow-[1px_1px_0px_#000]'
                  : 'bg-white text-slate-700 border-black/30 hover:bg-[#ffd905]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Suggestion Cards */}
        <div className="space-y-2">
          {currentCategoryData?.summaries.map((sug, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white border-2 border-black hover:bg-[#fff4c2] transition-colors shadow-[2px_2px_0px_#000] flex items-start justify-between gap-3 group cursor-pointer"
              onClick={() => handleInsertSummary(sug, idx)}
            >
              <p className="text-xs text-slate-900 leading-relaxed">{sug}</p>
              <button
                type="button"
                className={`shrink-0 px-2.5 py-1 rounded-lg border border-black text-[10px] font-mono-tech font-bold transition-all ${
                  copiedIndex === idx
                    ? 'bg-[#1eac1a] text-white'
                    : 'bg-[#ffd905] text-black group-hover:bg-[#ff64d5] group-hover:text-white'
                }`}
              >
                {copiedIndex === idx ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" /> Inserted
                  </span>
                ) : (
                  'Use this'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
