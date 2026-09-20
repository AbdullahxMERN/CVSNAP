'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTemplate,
  updateColors,
  updateTypography,
  updateSpacing,
  applyColorPreset,
} from '@/store/settingsSlice';
import {
  setBuilderMode,
  setCustomizeTab,
} from '@/store/uiSlice';
import { templates } from '@/lib/templatesRegistry';
import TemplateThumbnail from '@/components/templates/TemplateThumbnail';
import { selectTemplateWith2SecPreview } from '@/lib/templateUtils';
import {
  Palette,
  Type,
  Layout,
  Check,
  Sliders,
  ChevronRight,
  Eye,
  Zap,
} from 'lucide-react';

const COLOR_SWATCHES = [
  { id: 'black', label: 'Classic Black', primary: '#111827', accent: '#374151' },
  { id: 'navy', label: 'Navy Blue', primary: '#0f172a', accent: '#2563eb' },
  { id: 'royal', label: 'Royal Blue', primary: '#1e3a8a', accent: '#3b82f6' },
  { id: 'emerald', label: 'Emerald Green', primary: '#064e3b', accent: '#10b981' },
  { id: 'ruby', label: 'Ruby Crimson', primary: '#881337', accent: '#e11d48' },
  { id: 'violet', label: 'Deep Violet', primary: '#4c1d95', accent: '#8b5cf6' },
  { id: 'amber', label: 'Warm Amber', primary: '#78350f', accent: '#d97706' },
  { id: 'teal', label: 'Modern Teal', primary: '#134e4a', accent: '#14b8a6' },
];

const CATEGORIES = ['ALL', 'TECH', 'DESIGN', 'LEADERSHIP', 'EDITORIAL', 'CLASSIC', 'CONTEMPORARY', 'ACADEMIC'];

const FONTS = [
  { id: 'Inter', name: 'Inter (Clean & Modern)', category: 'Modern Sans' },
  { id: 'Playfair Display', name: 'Playfair Display (Editorial Serif)', category: 'Luxury Serif' },
  { id: 'Space Grotesk', name: 'Space Grotesk (Tech & Dynamic)', category: 'Tech Sans' },
  { id: 'Share Tech Mono', name: 'Share Tech Mono (Developer Terminal)', category: 'Developer Mono' },
  { id: 'Bebas Neue', name: 'Bebas Neue (Bold & Impactful)', category: 'Display Title' },
];

export default function CustomizeView() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const activeTab = useSelector((state) => state.ui.customizeTab) || 'templates';
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredTemplates = templates.filter((tpl) => {
    if (selectedCategory === 'ALL') return true;
    return tpl.category.toUpperCase() === selectedCategory;
  });

  return (
    <div className="flex flex-col h-full bg-[#fff4c2] overflow-hidden">
      {/* Customize Subtabs Header */}
      <div className="p-3.5 pb-2 shrink-0 border-b-2 border-black/20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#ffd905] border border-black shadow-[1.5px_1.5px_0px_#000]">
              <Palette className="w-4 h-4 text-black" />
            </div>
            <div>
              <h2 className="font-bebas text-xl text-black leading-none tracking-wide">
                CUSTOMIZE DESIGN
              </h2>
              <span className="font-mono-tech text-[10px] text-slate-600 font-bold block">
                Live updates to your CV layout & colors
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => dispatch(setBuilderMode('edit'))}
            className="nb-btn px-3 py-1 rounded-lg bg-white text-black text-xs font-black shadow-[1.5px_1.5px_0px_#000] hover:bg-[#ffd905]"
          >
            ← BACK TO EDIT
          </button>
        </div>

        {/* 3 Subtabs: Template & Colors | Text | Layout */}
        <div className="flex items-center bg-white p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
          {[
            { id: 'templates', label: 'Template & Colors', icon: Palette },
            { id: 'text', label: 'Text & Fonts', icon: Type },
            { id: 'layout', label: 'Layout & Spacing', icon: Layout },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => dispatch(setCustomizeTab(tab.id))}
                className={`flex-1 py-1.5 px-2 rounded-lg font-mono-tech text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-[1px_1px_0px_#000]'
                    : 'text-black hover:bg-[#fff4c2]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-5 py-3 builder-sidebar space-y-5">
        {/* SUBTAB 1: TEMPLATE & COLORS */}
        {activeTab === 'templates' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Main Color Swatches Row */}
            <div className="p-3.5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs font-bold text-black uppercase">
                  Main Accent Color
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono-tech text-[10px] text-slate-500 uppercase font-bold">
                    Custom:
                  </span>
                  <input
                    type="color"
                    value={settings.colors?.primary || '#111827'}
                    onChange={(e) => dispatch(updateColors({ primary: e.target.value }))}
                    className="w-6 h-6 rounded cursor-pointer border border-black"
                  />
                </div>
              </div>

              {/* Color circles with active checkmark */}
              <div className="flex flex-wrap items-center gap-2">
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = settings.colors?.primary?.toLowerCase() === swatch.primary.toLowerCase();
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() =>
                        dispatch(
                          updateColors({
                            primary: swatch.primary,
                            accent: swatch.accent,
                          })
                        )
                      }
                      className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center transition-all shadow-[1.5px_1.5px_0px_#000] ${
                        isSelected ? 'scale-110 ring-2 ring-black' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.primary }}
                      title={swatch.label}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Category Filters */}
            <div className="space-y-2">
              <span className="font-mono-tech text-xs font-bold text-black uppercase block">
                Choose Template ({templates.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-tech font-bold border transition-all ${
                      selectedCategory === cat
                        ? 'bg-black text-white border-black shadow-[1px_1px_0px_#000]'
                        : 'bg-white text-slate-800 border-black/30 hover:bg-[#ffd905]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-2 gap-3 pb-6">
              {filteredTemplates.map((tpl) => {
                const isSelected = settings.templateId === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => selectTemplateWith2SecPreview(tpl.id, dispatch, tpl.colors, tpl.font)}
                    className={`p-2.5 rounded-2xl bg-white border-2 border-black cursor-pointer transition-all shadow-[3px_3px_0px_#000] group flex flex-col justify-between hover:-translate-y-1 hover:shadow-[5px_5px_0px_#000] ${
                      isSelected
                        ? 'bg-[#ffd905] ring-2 ring-black -translate-y-0.5 shadow-[4px_4px_0px_#000]'
                        : 'hover:bg-amber-50/50'
                    }`}
                  >
                    {/* Mini Layout Mockup Preview */}
                    <div className="h-44 rounded-xl bg-white border-2 border-black overflow-hidden relative mb-2 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] group-hover:scale-[1.02] transition-transform">
                      <TemplateThumbnail templateId={tpl.id} isSelected={isSelected} />

                      {/* Active indicator */}
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-[#1eac1a] text-white text-[9px] font-mono-tech font-black z-10 shadow border border-white flex items-center gap-0.5">
                          ✓ ACTIVE
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bebas text-base text-black tracking-wide leading-tight">
                          {tpl.name}
                        </span>
                        <span className="text-[8.5px] font-mono-tech font-bold uppercase text-slate-700 px-1 py-0.2 bg-slate-100 rounded border border-black/20">
                          {tpl.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 line-clamp-1 leading-snug mt-0.5 font-medium">
                        {tpl.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBTAB 2: TEXT & FONTS */}
        {activeTab === 'text' && (
          <div className="space-y-5 animate-in fade-in duration-150 pb-6">
            {/* Font Family Selection */}
            <div className="p-3.5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-3">
              <span className="font-mono-tech text-xs font-bold text-black uppercase block">
                Typography Families
              </span>
              <div className="space-y-2">
                {FONTS.map((font) => {
                  const isSelected = settings.typography?.fontFamily === font.id;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => dispatch(updateTypography({ fontFamily: font.id }))}
                      className={`w-full p-3 rounded-xl border-2 border-black text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#ffd905] shadow-[2px_2px_0px_#000] font-bold'
                          : 'bg-white hover:bg-slate-50'
                      }`}
                      style={{ fontFamily: font.id }}
                    >
                      <div>
                        <span className="text-sm text-black block">{font.name}</span>
                        <span className="text-[10px] font-mono-tech text-slate-600">
                          {font.category}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-black" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Scale Size */}
            <div className="p-3.5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2.5">
              <span className="font-mono-tech text-xs font-bold text-black uppercase block">
                Font Size Scale
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'small', label: 'Compact (9pt)' },
                  { id: 'normal', label: 'Standard (10pt)' },
                  { id: 'large', label: 'Spacious (11pt)' },
                ].map((sz) => {
                  const active = settings.typography?.fontSize === sz.id;
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => dispatch(updateTypography({ fontSize: sz.id }))}
                      className={`py-2 px-2 rounded-xl border-2 border-black font-mono-tech text-xs font-bold text-center transition-all ${
                        active
                          ? 'bg-black text-white shadow-[2px_2px_0px_#000]'
                          : 'bg-white text-black hover:bg-[#fff4c2]'
                      }`}
                    >
                      {sz.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: LAYOUT & SPACING */}
        {activeTab === 'layout' && (
          <div className="space-y-5 animate-in fade-in duration-150 pb-6">
            {/* Margin Density */}
            <div className="p-3.5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2.5">
              <span className="font-mono-tech text-xs font-bold text-black uppercase block">
                Page Margins & Density
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'compact', label: 'Compact', desc: 'Fit more info' },
                  { id: 'normal', label: 'Standard', desc: 'Balanced' },
                  { id: 'relaxed', label: 'Relaxed', desc: 'Airy & clean' },
                ].map((sp) => {
                  const active = settings.spacing?.margins === sp.id;
                  return (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => dispatch(updateSpacing({ margins: sp.id, sectionSpacing: sp.id }))}
                      className={`p-2.5 rounded-xl border-2 border-black text-center transition-all ${
                        active
                          ? 'bg-[#ffd905] shadow-[2px_2px_0px_#000] font-bold'
                          : 'bg-white text-black hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bebas text-base text-black block">{sp.label}</span>
                      <span className="font-mono-tech text-[9px] text-slate-600 block">{sp.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-3.5 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
              <span className="font-mono-tech text-xs font-bold text-black uppercase block">
                Reset Customizations
              </span>
              <button
                type="button"
                onClick={() => {
                  dispatch(applyColorPreset('slate'));
                  dispatch(updateTypography({ fontFamily: 'Inter', fontSize: 'normal' }));
                  dispatch(updateSpacing({ margins: 'normal', sectionSpacing: 'normal' }));
                }}
                className="w-full nb-btn py-2.5 rounded-xl bg-white border-2 border-black text-black text-xs font-black hover:bg-[#ffd905]"
              >
                RESTORE DEFAULT STYLES
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
