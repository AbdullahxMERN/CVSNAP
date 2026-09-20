'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProject,
  updateProject,
  removeProject,
  addCustomSection,
  updateCustomSection,
  removeCustomSection,
} from '@/store/cvSlice';
import {
  FolderOpen,
  Award,
  Globe,
  Trophy,
  Star,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  CertificationsEditor,
  LanguagesEditor,
  AwardsEditor,
  InterestsEditor,
} from './AdditionalSections';
import ProjectsSection from './ProjectsSection';

const SUB_SECTIONS = [
  { id: 'projects', label: 'Notable Projects', icon: FolderOpen, color: '#ff8400' },
  { id: 'certifications', label: 'Certifications', icon: Award, color: '#ff0522' },
  { id: 'languages', label: 'Languages', icon: Globe, color: '#ffd905' },
  { id: 'awards', label: 'Awards & Honors', icon: Trophy, color: '#ff64d5' },
  { id: 'interests', label: 'Interests & Hobbies', icon: Star, color: '#48A4FF' },
  { id: 'custom', label: 'Custom Section', icon: Layers, color: '#1eac1a' },
];

export default function CustomSectionsStep() {
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.cv);
  const [activeSub, setActiveSub] = useState('projects');
  const [customTitle, setCustomTitle] = useState('');

  const handleAddCustomSection = () => {
    const title = customTitle.trim() || 'Additional Section';
    dispatch(
      addCustomSection({
        id: `custom-${Date.now()}`,
        title,
        items: [{ id: `item-${Date.now()}`, title: '', subtitle: '', description: '' }],
      })
    );
    setCustomTitle('');
  };

  return (
    <div className="space-y-4 text-black">
      {/* Recruiter Tip Banner */}
      <div className="p-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-start gap-2.5">
        <div className="p-1.5 rounded-lg bg-[#ff8400] border border-black shrink-0">
          <Zap className="w-4 h-4 text-white fill-current" />
        </div>
        <div className="text-xs">
          <span className="font-bold font-mono-tech block uppercase text-[11px] text-black">
            Standout Sections
          </span>
          <p className="text-slate-700 leading-snug">
            Add projects, certifications, or custom sections to give your CV a unique edge over other applicants.
          </p>
        </div>
      </div>

      {/* Sub-Section Selector Pills */}
      <div className="flex flex-wrap gap-1.5">
        {SUB_SECTIONS.map(({ id, label, icon: Icon, color }) => {
          const isActive = activeSub === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveSub(id)}
              className={`px-3 py-1.5 rounded-xl font-mono-tech text-xs font-bold border-2 border-black flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_#000] ${
                isActive
                  ? 'bg-black text-white -translate-y-0.5'
                  : 'bg-white text-black hover:bg-[#fff4c2]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: isActive ? '#ffd905' : color }} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-section content */}
      <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] animate-in fade-in duration-150">
        {activeSub === 'projects' && <ProjectsSection />}
        {activeSub === 'certifications' && <CertificationsEditor />}
        {activeSub === 'languages' && <LanguagesEditor />}
        {activeSub === 'awards' && <AwardsEditor />}
        {activeSub === 'interests' && <InterestsEditor />}
        {activeSub === 'custom' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                Create a Custom Section
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Volunteer Work / Publications / Patents / Speaking"
                  className="flex-1 px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSection}
                  className="nb-btn px-4 py-2 rounded-xl bg-[#ffd905] text-black text-xs font-black shadow-[2px_2px_0px_#000]"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> CREATE
                </button>
              </div>
            </div>

            {/* Existing custom sections */}
            <div className="space-y-3 pt-2">
              {(cv.customSections || []).map((cs) => (
                <div
                  key={cs.id}
                  className="p-3.5 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_#000] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cs.title || ''}
                      onChange={(e) =>
                        dispatch(updateCustomSection({ id: cs.id, title: e.target.value }))
                      }
                      placeholder="Section Title"
                      className="font-bebas text-lg text-black bg-transparent border-b border-black focus:outline-none w-48"
                    />
                    <button
                      type="button"
                      onClick={() => dispatch(removeCustomSection(cs.id))}
                      className="p-1 rounded-lg bg-white border border-black hover:bg-[#ff0522] hover:text-white transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={cs.content || ''}
                    onChange={(e) =>
                      dispatch(updateCustomSection({ id: cs.id, content: e.target.value }))
                    }
                    placeholder="Describe your activities, publications, or accomplishments here..."
                    className="w-full p-2.5 rounded-lg bg-white border-2 border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
