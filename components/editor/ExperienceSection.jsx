'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExperience,
  updateExperience,
  removeExperience,
  addAchievement,
  updateAchievement,
  removeAchievement,
} from '@/store/cvSlice';
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Sparkles,
  Check,
  ArrowUp,
  ArrowDown,
  Wand2,
} from 'lucide-react';
import { ROLE_BULLET_SUGGESTIONS } from '@/lib/suggestionsData';

export default function ExperienceSection() {
  const dispatch = useDispatch();
  const experienceList = useSelector((state) => state.cv.experience) || [];
  const [openIds, setOpenIds] = useState(() => (experienceList[0] ? [experienceList[0].id] : []));
  const [newAchievementText, setNewAchievementText] = useState({});
  const [suggestionRoleFor, setSuggestionRoleFor] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Software Engineer');

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddAchievement = (expId, textToAdd) => {
    const text = (textToAdd || newAchievementText[expId] || '').trim();
    if (!text) return;
    dispatch(addAchievement({ id: expId, text }));
    if (!textToAdd) {
      setNewAchievementText((prev) => ({ ...prev, [expId]: '' }));
    }
  };

  return (
    <div className="space-y-4 text-black">
      {/* Recruiter Tip Banner */}
      <div className="p-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-start gap-2.5">
        <div className="p-1.5 rounded-lg bg-[#ffd905] border border-black shrink-0">
          <Briefcase className="w-4 h-4 text-black" />
        </div>
        <div className="text-xs">
          <span className="font-bold font-mono-tech block uppercase text-[11px] text-black">
            Recruiter Formula
          </span>
          <p className="text-slate-700 leading-snug">
            Show your relevant experience (last 10 years). Use bullet points to note achievements with numbers/facts (Achieved <strong className="text-black">X</strong>, measured by <strong className="text-black">Y</strong>, by doing <strong className="text-black">Z</strong>).
          </p>
        </div>
      </div>

      {experienceList.length === 0 && (
        <div className="p-4 rounded-xl bg-white border-2 border-black text-center space-y-2 shadow-[2px_2px_0px_#000]">
          <p className="font-mono-tech text-xs font-bold text-black uppercase">
            No employment history added yet.
          </p>
          <p className="text-xs text-slate-700">
            Adding your employment history boosts recruiter trust and unlocks interview invitations!
          </p>
        </div>
      )}

      {/* Experience Cards */}
      <div className="space-y-3">
        {experienceList.map((exp, index) => {
          const isOpen = openIds.includes(exp.id);
          const headerTitle =
            exp.jobTitle || exp.company
              ? `${exp.jobTitle || 'Role'}${exp.company ? ` at ${exp.company}` : ''}`
              : `(Not specified)`;

          const dateDisplay = exp.startDate
            ? `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate || 'Present'}`
            : null;

          return (
            <div
              key={exp.id}
              className="rounded-xl border-2 border-black bg-white overflow-hidden shadow-[3px_3px_0px_#000] transition-all"
            >
              {/* Card Header Accordion */}
              <div
                onClick={() => toggleOpen(exp.id)}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                  isOpen ? 'bg-[#fff4c2] border-b-2 border-black' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                  <span className="font-mono-tech text-xs font-bold text-slate-400">
                    #{index + 1}
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-sm text-black truncate block">
                      {headerTitle}
                    </span>
                    {dateDisplay && (
                      <span className="font-mono-tech text-[10px] text-slate-500 font-bold block">
                        {dateDisplay} {exp.location ? `• ${exp.location}` : ''}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeExperience(exp.id));
                    }}
                    className="p-1 rounded-lg bg-white border border-black hover:bg-[#ff0522] hover:text-white transition-colors"
                    title="Delete Job"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-black" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-black" />
                  )}
                </div>
              </div>

              {/* Expanded Card Form */}
              {isOpen && (
                <div className="p-4 space-y-3.5 bg-white animate-in fade-in duration-150">
                  {/* Row 1: Job Title & Employer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={exp.jobTitle || ''}
                        onChange={(e) =>
                          dispatch(updateExperience({ id: exp.id, field: 'jobTitle', value: e.target.value }))
                        }
                        placeholder="e.g. Senior Frontend Engineer"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        Employer / Company
                      </label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) =>
                          dispatch(updateExperience({ id: exp.id, field: 'company', value: e.target.value }))
                        }
                        placeholder="e.g. Stripe / Google / Acme Inc."
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Start/End Date & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate || ''}
                        onChange={(e) =>
                          dispatch(updateExperience({ id: exp.id, field: 'startDate', value: e.target.value }))
                        }
                        placeholder="MM / YYYY"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-mono-tech text-xs font-bold text-black uppercase">
                          End Date
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer font-mono-tech text-[10px] font-bold text-slate-700">
                          <input
                            type="checkbox"
                            checked={exp.current || false}
                            onChange={(e) =>
                              dispatch(updateExperience({ id: exp.id, field: 'current', value: e.target.checked }))
                            }
                            className="rounded border-black"
                          />
                          Current
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={exp.current}
                        value={exp.current ? 'Present' : exp.endDate || ''}
                        onChange={(e) =>
                          dispatch(updateExperience({ id: exp.id, field: 'endDate', value: e.target.value }))
                        }
                        placeholder="MM / YYYY"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000] disabled:opacity-40"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        City, State
                      </label>
                      <input
                        type="text"
                        value={exp.location || ''}
                        onChange={(e) =>
                          dispatch(updateExperience({ id: exp.id, field: 'location', value: e.target.value }))
                        }
                        placeholder="San Francisco, CA"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                  </div>

                  {/* Bullet points & Pre-written AI suggestions */}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-mono-tech text-xs font-bold text-black uppercase">
                        Key Achievements & Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setSuggestionRoleFor(suggestionRoleFor === exp.id ? null : exp.id)
                        }
                        className="font-bebas text-xs tracking-wider px-2.5 py-1 rounded-lg bg-[#ffd905] border border-black text-black hover:bg-[#ff64d5] hover:text-white transition-colors flex items-center gap-1 shadow-[1px_1px_0px_#000]"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>{suggestionRoleFor === exp.id ? 'CLOSE BULLETS' : '⚡ PRE-WRITTEN BULLETS'}</span>
                      </button>
                    </div>

                    {/* Pre-written bullet suggestions drawer */}
                    {suggestionRoleFor === exp.id && (
                      <div className="p-3.5 rounded-xl bg-[#fff4c2] border-2 border-black space-y-2.5 shadow-[2px_2px_0px_#000] animate-in fade-in duration-200">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-tech text-[10px] font-bold uppercase text-slate-800">
                            Select role to filter high-impact bullets:
                          </span>
                        </div>

                        {/* Role switcher pills */}
                        <div className="flex flex-wrap gap-1">
                          {Object.keys(ROLE_BULLET_SUGGESTIONS).map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setSelectedRole(role)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tech font-bold border transition-all ${
                                selectedRole === role
                                  ? 'bg-black text-white border-black'
                                  : 'bg-white text-slate-800 border-black/40 hover:bg-[#ffd905]'
                              }`}
                            >
                              {role}
                            </button>
                          ))}
                        </div>

                        {/* Bullets list */}
                        <div className="space-y-1.5 pt-1">
                          {(ROLE_BULLET_SUGGESTIONS[selectedRole] || []).map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              onClick={() => handleAddAchievement(exp.id, bullet)}
                              className="p-2.5 rounded-lg bg-white border border-black text-xs text-slate-900 cursor-pointer hover:bg-[#ffd905] transition-colors flex items-start justify-between gap-2 group shadow-[1px_1px_0px_#000]"
                            >
                              <span className="text-[11px] leading-relaxed">{bullet}</span>
                              <span className="shrink-0 px-2 py-0.5 rounded bg-black text-white text-[10px] font-mono-tech font-bold group-hover:bg-white group-hover:text-black">
                                + Add
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Existing Bullets */}
                    <div className="space-y-2">
                      {exp.achievements?.map((ach, achIdx) => (
                        <div key={achIdx} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                          <input
                            type="text"
                            value={ach}
                            onChange={(e) =>
                              dispatch(
                                updateAchievement({
                                  expId: exp.id,
                                  achIdx,
                                  text: e.target.value,
                                })
                              )
                            }
                            className="flex-1 px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                          />
                          <button
                            type="button"
                            onClick={() => dispatch(removeAchievement({ expId: exp.id, achIdx }))}
                            className="p-1.5 rounded-lg bg-white border border-black text-black hover:bg-[#ff0522] hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Bullet input row */}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newAchievementText[exp.id] || ''}
                        onChange={(e) =>
                          setNewAchievementText((prev) => ({ ...prev, [exp.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddAchievement(exp.id);
                          }
                        }}
                        placeholder="e.g. Spearheaded 42% faster deployment pipeline with Docker..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddAchievement(exp.id)}
                        className="nb-btn px-4 py-2 rounded-xl bg-[#ffd905] text-black text-xs font-black shadow-[2px_2px_0px_#000]"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Employment Button */}
      <button
        type="button"
        onClick={() => dispatch(addExperience())}
        className="w-full nb-btn py-3 rounded-xl bg-white text-black text-xs font-black tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#ffd905] shadow-[2px_2px_0px_#000]"
      >
        <Plus className="w-4 h-4" /> ADD EMPLOYMENT
      </button>
    </div>
  );
}
