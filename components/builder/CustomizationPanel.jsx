'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  updateColors,
  updateTypography,
  updateSpacing,
  applyColorPreset,
} from '@/store/settingsSlice';
import { closeCustomization } from '@/store/uiSlice';
import { X, Check, Palette, Type, Sliders, Sparkles } from 'lucide-react';

const PRESETS = [
  { id: 'slate', name: 'Slate Indigo', primary: '#0f172a', accent: '#6366f1' },
  { id: 'ocean', name: 'Ocean Cyan', primary: '#0c4a6e', accent: '#0ea5e9' },
  { id: 'forest', name: 'Forest Emerald', primary: '#14532d', accent: '#22c55e' },
  { id: 'rose', name: 'Ruby Rose', primary: '#881337', accent: '#f43f5e' },
  { id: 'amber', name: 'Warm Amber', primary: '#78350f', accent: '#f59e0b' },
  { id: 'violet', name: 'Royal Violet', primary: '#4c1d95', accent: '#8b5cf6' },
  { id: 'mono', name: 'Pure Mono', primary: '#000000', accent: '#374151' },
];

const FONTS = [
  { id: 'Inter', name: 'Inter (Modern Sans)', style: 'font-sans' },
  { id: 'Playfair Display', name: 'Playfair (Editorial Serif)', style: 'font-serif' },
  { id: 'Cormorant Garamond', name: 'Cormorant (Refined Serif)', style: 'font-serif' },
  { id: 'Space Grotesk', name: 'Space Grotesk (Tech / Bold)', style: 'font-sans' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta (Clean Geometric)', style: 'font-sans' },
  { id: 'JetBrains Mono', name: 'JetBrains Mono (Developer)', style: 'font-mono' },
];

export default function CustomizationPanel() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.customizationOpen);
  const settings = useSelector((state) => state.settings);

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white border-l-[3px] border-black shadow-[0_0_30px_rgba(0,0,0,0.3)] flex flex-col animate-slide-in-right select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black bg-[#ffd905]">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-black" />
          <h2 className="font-bebas text-2xl tracking-wide text-black leading-none">
            DESIGN & STYLES
          </h2>
        </div>
        <button
          onClick={() => dispatch(closeCustomization())}
          className="p-1.5 rounded-lg bg-white border border-black hover:bg-[#ff0522] hover:text-white transition-colors"
          aria-label="Close panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7 bg-[#fff4c2]">
        {/* Color Presets */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-black" />
            <h3 className="font-bebas text-lg tracking-wider text-black">COLOR PALETTES</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((preset) => {
              const isSelected =
                settings.colors?.primary === preset.primary &&
                settings.colors?.accent === preset.accent;
              return (
                <button
                  key={preset.id}
                  onClick={() => dispatch(applyColorPreset(preset.id))}
                  className={`flex items-center justify-between p-2.5 rounded-xl border-2 border-black text-left transition-all ${
                    isSelected
                      ? 'bg-[#ffd905] shadow-[2px_2px_0px_#000] scale-102 font-bold'
                      : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <span
                        className="w-4 h-4 rounded-full border border-black shadow-sm"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black shadow-sm"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <span className="font-mono-tech text-xs text-black font-bold">{preset.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                </button>
              );
            })}
          </div>

          {/* Custom Color Pickers */}
          <div className="mt-4 p-3 rounded-xl bg-white border-2 border-black space-y-3 shadow-[2px_2px_0px_#000]">
            <div className="flex items-center justify-between text-xs font-mono-tech font-bold">
              <span className="text-black">Primary Color</span>
              <div className="flex items-center gap-2">
                <span className="uppercase text-black">{settings.colors?.primary}</span>
                <input
                  type="color"
                  value={settings.colors?.primary || '#0f172a'}
                  onChange={(e) => dispatch(updateColors({ primary: e.target.value }))}
                  className="w-7 h-7 rounded cursor-pointer border-2 border-black"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-mono-tech font-bold">
              <span className="text-black">Accent Color</span>
              <div className="flex items-center gap-2">
                <span className="uppercase text-black">{settings.colors?.accent}</span>
                <input
                  type="color"
                  value={settings.colors?.accent || '#6366f1'}
                  onChange={(e) => dispatch(updateColors({ accent: e.target.value }))}
                  className="w-7 h-7 rounded cursor-pointer border-2 border-black"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-black" />
            <h3 className="font-bebas text-lg tracking-wider text-black">TYPOGRAPHY FAMILIES</h3>
          </div>
          <div className="space-y-1.5">
            {FONTS.map((f) => {
              const active = settings.typography?.fontFamily === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => dispatch(updateTypography({ fontFamily: f.id }))}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border-2 border-black text-left text-xs transition-all ${
                    active
                      ? 'bg-[#ff64d5] text-white shadow-[2px_2px_0px_#000] font-bold'
                      : 'bg-white text-black hover:bg-slate-50'
                  }`}
                  style={{ fontFamily: f.id }}
                >
                  <span className="text-xs font-medium">{f.name}</span>
                  {active && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Page Density */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-black" />
            <h3 className="font-bebas text-lg tracking-wider text-black">PAGE MARGIN DENSITY</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'compact', label: 'Compact' },
              { id: 'normal', label: 'Normal' },
              { id: 'relaxed', label: 'Relaxed' },
            ].map((sp) => {
              const active = settings.spacing?.margins === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => dispatch(updateSpacing({ margins: sp.id, sectionSpacing: sp.id }))}
                  className={`py-2 px-3 rounded-lg border-2 border-black text-center font-bebas text-sm tracking-wider transition-all ${
                    active
                      ? 'bg-[#ffd905] text-black shadow-[2px_2px_0px_#000] scale-105 font-bold'
                      : 'bg-white text-black hover:bg-slate-50'
                  }`}
                >
                  {sp.label}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="p-4 border-t-2 border-black bg-[#ffd905]">
        <button
          onClick={() => dispatch(closeCustomization())}
          className="w-full nb-btn py-2.5 rounded-xl bg-black text-white font-bebas text-lg tracking-wider shadow-[3px_3px_0px_#fff]"
        >
          APPLY CHANGES
        </button>
      </div>
    </aside>
  );
}
