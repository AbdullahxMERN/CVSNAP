'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, removeSkill, updateSkill } from '@/store/cvSlice';
import { Plus, X, Zap, Sparkles, Star } from 'lucide-react';
import { SKILL_CATEGORIES } from '@/lib/suggestionsData';

const LEVELS = ['Beginner', 'Skillful', 'Experienced', 'Expert'];

export default function SkillsSection() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.cv.skills) || [];
  const [inputVal, setInputVal] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Experienced');
  const [activeCategory, setActiveCategory] = useState('Frontend & Web');

  const handleAdd = (name) => {
    const trimmed = (name || inputVal).trim();
    if (!trimmed) return;
    if (!skills.some((s) => s.name?.toLowerCase() === trimmed.toLowerCase())) {
      dispatch(
        addSkill({
          id: `sk-${Date.now()}`,
          name: trimmed,
          level: selectedLevel,
        })
      );
    }
    setInputVal('');
  };

  const handleLevelChange = (skillId, newLevel) => {
    dispatch(updateSkill({ id: skillId, level: newLevel }));
  };

  return (
    <div className="space-y-4 text-black">
      {/* Recruiter Tip Banner */}
      <div className="p-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-start gap-2.5">
        <div className="p-1.5 rounded-lg bg-[#1eac1a] border border-black shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div className="text-xs">
          <span className="font-bold font-mono-tech block uppercase text-[11px] text-black">
            Keyword Optimization Tip
          </span>
          <p className="text-slate-700 leading-snug">
            Add 5–10 of your most relevant skills to pass automated ATS filters and demonstrate your technical depth to recruiters.
          </p>
        </div>
      </div>

      {/* Input Row with Level Selection */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Type skill & press Enter (e.g. Next.js, Figma, AWS)..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[2px_2px_0px_#000]"
          />
          <button
            type="button"
            onClick={() => handleAdd()}
            className="nb-btn px-4 py-2.5 rounded-xl bg-[#ffd905] text-black text-xs font-black shadow-[2px_2px_0px_#000]"
          >
            <Plus className="w-3.5 h-3.5 inline mr-1" /> ADD
          </button>
        </div>

        {/* Level Selector Pills for new skill */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono-tech font-bold text-slate-600 uppercase mr-1">
            Default Level:
          </span>
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tech font-bold border transition-all ${
                selectedLevel === lvl
                  ? 'bg-black text-white border-black shadow-[1px_1px_0px_#000]'
                  : 'bg-white text-slate-700 border-black/40 hover:bg-[#fff4c2]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Current Skill Badges */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono-tech text-xs font-bold text-black uppercase">
            Your Skills ({skills.length})
          </label>
          <span className="font-mono-tech text-[10px] text-slate-600 font-bold">
            {skills.length >= 5 ? '✓ Strong skill profile' : 'Add at least 5 skills'}
          </span>
        </div>

        {skills.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
            No skills added yet. Use the input above or pick recommendations below.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s.id || s.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-black text-black font-mono-tech text-xs font-bold shadow-[2px_2px_0px_#000] hover:bg-[#fff4c2] transition-colors"
              >
                <span>{s.name}</span>
                {s.level && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#ffd905] rounded border border-black text-black font-normal">
                    {s.level}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => dispatch(removeSkill(s.id))}
                  className="p-0.5 rounded-full hover:bg-[#ff0522] hover:text-white transition-colors ml-0.5"
                  title="Remove skill"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Resume.io Style Skill Suggestions by Category */}
      <div className="pt-2 space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase">
            <Zap className="w-3.5 h-3.5 text-[#ff64d5] fill-current" />
            <span>Curated Skill Recommendations</span>
          </label>
          <span className="text-[10px] font-mono-tech text-slate-500">1-click add</span>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1">
          {Object.keys(SKILL_CATEGORIES).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-full font-mono-tech text-[10px] font-bold border transition-all ${
                activeCategory === cat
                  ? 'bg-black text-white border-black shadow-[1px_1px_0px_#000]'
                  : 'bg-white text-slate-700 border-black/30 hover:bg-[#ffd905]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
          {(SKILL_CATEGORIES[activeCategory] || [])
            .filter((sug) => !skills.some((s) => s.name?.toLowerCase() === sug.toLowerCase()))
            .map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleAdd(sug)}
                className="px-2.5 py-1 rounded-lg bg-[#fff4c2] hover:bg-[#ffd905] border border-black text-xs font-mono-tech font-bold text-black shadow-[1px_1px_0px_#000] transition-colors flex items-center gap-1"
              >
                <Plus className="w-2.5 h-2.5" />
                <span>{sug}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
