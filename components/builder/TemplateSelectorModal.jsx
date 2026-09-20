'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { templates } from '@/lib/templatesRegistry';
import TemplateThumbnail from '@/components/templates/TemplateThumbnail';
import { setTemplate, updateColors, updateTypography } from '@/store/settingsSlice';
import { closeTemplateSelector } from '@/store/uiSlice';
import { selectTemplateWith2SecPreview } from '@/lib/templateUtils';
import { X, Check, Layout, Zap, Eye } from 'lucide-react';

const CATEGORIES = ['ALL', 'TECH', 'DESIGN', 'LEADERSHIP', 'EDITORIAL', 'CLASSIC', 'CONTEMPORARY', 'ACADEMIC'];

/** Single template card with hover flip animation */
function TemplateCard({ tmpl, isCurrent, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="perspective-1000 h-[240px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(tmpl)}
    >
      <div
        className={`flip-card w-full h-full ${hovered ? 'flipped' : ''} ${isCurrent ? 'animate-pulse-border' : ''}`}
        style={isCurrent ? { borderRadius: '16px' } : {}}
      >
        {/* ── FRONT ── */}
        <div
          className={`flip-card-front rounded-2xl flex flex-col overflow-hidden transition-all ${
            isCurrent
              ? 'border-[3px] border-[#1eac1a] shadow-[4px_4px_0px_#1eac1a]'
              : 'nb-box'
          } bg-white`}
        >
          {/* Preview */}
          <div className="flex-1 relative overflow-hidden rounded-t-xl bg-white border-b border-black">
            <TemplateThumbnail templateId={tmpl.id} isSelected={isCurrent} />
            {/* Active badge */}
            {isCurrent && (
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1eac1a] text-white border border-white text-[9px] font-black font-mono-tech shadow">
                <Check className="w-3 h-3" /> ACTIVE
              </div>
            )}
            <div className="absolute top-2 left-2">
              <span className="font-mono-tech text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#ffd905] border border-black text-black uppercase">
                {tmpl.category}
              </span>
            </div>
          </div>

          {/* Info footer */}
          <div className="p-2.5 border-t-2 border-black">
            <div className="flex items-center justify-between">
              <h3 className="font-bebas text-lg text-black tracking-wide leading-none">{tmpl.name}</h3>
              <Eye className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-[9.5px] text-slate-600 line-clamp-1 mt-0.5">{tmpl.description}</p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-card-back rounded-2xl nb-box flex flex-col items-center justify-center p-4 text-center gap-3"
          style={{
            background: `linear-gradient(145deg, ${tmpl.colors?.primary || '#1e293b'} 0%, #111 100%)`,
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20"
            style={{ background: tmpl.colors?.accent || '#6366f1' }}
          >
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h3 className="font-bebas text-2xl text-white tracking-wider leading-none">{tmpl.name}</h3>
            <p className="font-mono-tech text-[9px] text-white/50 uppercase tracking-widest mt-0.5">{tmpl.category}</p>
          </div>
          <p className="text-white/75 text-[10px] leading-relaxed">{tmpl.description}</p>
          <button
            onClick={() => onSelect(tmpl)}
            className="w-full py-2 rounded-xl bg-[#ffd905] text-black font-bebas text-base tracking-wider border border-white/20 hover:bg-[#ff64d5] hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            {isCurrent ? (
              <>
                <Check className="w-3.5 h-3.5" /> SELECTED
              </>
            ) : (
              'APPLY TEMPLATE'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TemplateSelectorModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.templateSelectorOpen);
  const currentTemplateId = useSelector((state) => state.settings.templateId);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [gridKey, setGridKey] = useState(0);

  // Re-trigger stagger animation on category change
  useEffect(() => { setGridKey((k) => k + 1); }, [selectedCategory]);

  if (!isOpen) return null;

  const filteredTemplates =
    selectedCategory === 'ALL'
      ? templates
      : templates.filter((t) => t.category.toUpperCase() === selectedCategory);

  const handleSelect = (tmpl) => {
    selectTemplateWith2SecPreview(tmpl.id, dispatch, tmpl.colors, tmpl.font);
    dispatch(closeTemplateSelector());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fade-in-scale select-none template-selector-modal">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white border-[3px] border-black rounded-3xl shadow-[12px_12px_0px_#000] flex flex-col overflow-hidden animate-slide-up">

        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black bg-[#ffd905] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
              <Layout className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-bebas text-3xl text-black tracking-wide leading-none">
                CHOOSE A CV TEMPLATE
              </h2>
              <p className="font-mono-tech text-xs font-bold text-slate-800">
                15 handcrafted designs · Hover to preview · Zero data loss on switch
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeTemplateSelector())}
            className="p-2 rounded-xl bg-white border-2 border-black text-black hover:bg-[#ff0522] hover:text-white shadow-[2px_2px_0px_#000] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Category Filters ── */}
        <div className="px-6 py-3 border-b-2 border-black flex items-center gap-2 overflow-x-auto bg-[#fff4c2] shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1 rounded-full font-bebas text-sm tracking-wider border-2 border-black transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#ff64d5] text-white shadow-[2px_2px_0px_#000] scale-105'
                  : 'bg-white text-black hover:bg-[#ffd905]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Template Grid ── */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#fff4c2] bg-retro-dots">
          <div
            key={gridKey}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 stagger-children"
          >
            {filteredTemplates.map((tmpl) => (
              <TemplateCard
                key={tmpl.id}
                tmpl={tmpl}
                isCurrent={currentTemplateId === tmpl.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-3 border-t-2 border-black bg-white flex items-center justify-between shrink-0">
          <p className="font-mono-tech text-xs font-bold text-slate-600">
            Currently active: <span className="text-[#ff64d5]">{currentTemplateId?.toUpperCase()}</span>
          </p>
          <button
            onClick={() => dispatch(closeTemplateSelector())}
            className="nb-btn px-5 py-1.5 rounded-full bg-[#ff64d5] text-white font-bebas text-base tracking-wider hover:bg-[#ffd905] hover:text-black"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
