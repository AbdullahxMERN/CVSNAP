'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, updateProject, removeProject } from '@/store/cvSlice';
import { Plus, Trash2, ChevronDown, ChevronUp, FolderOpen, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';

export default function ProjectsSection() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.cv.projects) || [];
  const [openIds, setOpenIds] = useState(() => (projects[0] ? [projects[0].id] : []));

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTechChange = (id, str) => {
    const arr = str.split(',').map((s) => s.trim()).filter(Boolean);
    dispatch(updateProject({ id, field: 'technologies', value: arr }));
  };

  return (
    <div className="space-y-4 pt-1">
      {projects.length === 0 && (
        <div className="p-4 rounded-xl bg-[#fff4c2] border-2 border-black text-center">
          <p className="font-mono-tech text-xs font-bold text-black uppercase">
            No projects added yet.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((pr, index) => {
          const isOpen = openIds.includes(pr.id);
          const title = pr.name || `Project #${index + 1}`;

          return (
            <div
              key={pr.id}
              className="rounded-xl border-2 border-black bg-white overflow-hidden shadow-[3px_3px_0px_#000] transition-all"
            >
              <div
                onClick={() => toggleOpen(pr.id)}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                  isOpen ? 'bg-[#ff8400] border-b-2 border-black text-white' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden pr-2">
                  <FolderOpen className="w-4 h-4 text-black shrink-0" />
                  <span className="font-bebas text-lg text-black truncate tracking-wide">{title}</span>
                  {pr.role && (
                    <span className="font-mono-tech text-[10px] text-slate-800 font-bold">({pr.role})</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeProject(pr.id));
                    }}
                    className="p-1 rounded bg-white border border-black hover:bg-[#ff0522] hover:text-white transition-colors"
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

              {isOpen && (
                <div className="p-4 space-y-3 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={pr.name || ''}
                        onChange={(e) =>
                          dispatch(updateProject({ id: pr.id, field: 'name', value: e.target.value }))
                        }
                        placeholder="Realtime AI Assistant"
                        className="w-full px-3 py-2 rounded-lg bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase mb-1">
                        Your Role
                      </label>
                      <input
                        type="text"
                        value={pr.role || ''}
                        onChange={(e) =>
                          dispatch(updateProject({ id: pr.id, field: 'role', value: e.target.value }))
                        }
                        placeholder="Lead Architect / Creator"
                        className="w-full px-3 py-2 rounded-lg bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-tech text-xs font-bold text-black uppercase mb-1">
                      Description & Impact
                    </label>
                    <textarea
                      rows={2}
                      value={pr.description || ''}
                      onChange={(e) =>
                        dispatch(updateProject({ id: pr.id, field: 'description', value: e.target.value }))
                      }
                      placeholder="High-performance edge platform delivering sub-50ms inference..."
                      className="w-full px-3 py-2 rounded-lg bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-tech text-xs font-bold text-black uppercase mb-1">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={pr.technologies?.join(', ') || ''}
                      onChange={(e) => handleTechChange(pr.id, e.target.value)}
                      placeholder="React, Next.js, WebSockets, Python, Docker"
                      className="w-full px-3 py-2 rounded-lg bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase mb-1">
                        <Globe className="w-3 h-3 text-slate-700" /> Live URL
                      </label>
                      <input
                        type="text"
                        value={pr.liveUrl || ''}
                        onChange={(e) =>
                          dispatch(updateProject({ id: pr.id, field: 'liveUrl', value: e.target.value }))
                        }
                        placeholder="https://myproject.app"
                        className="w-full px-3 py-2 rounded-lg bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2]"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1 font-mono-tech text-xs font-bold text-black uppercase mb-1">
                        <GithubIcon className="w-3 h-3 text-slate-700" /> GitHub Repo
                      </label>
                      <input
                        type="text"
                        value={pr.githubUrl || ''}
                        onChange={(e) =>
                          dispatch(updateProject({ id: pr.id, field: 'githubUrl', value: e.target.value }))
                        }
                        placeholder="github.com/username/project"
                        className="w-full px-3 py-2 rounded-lg bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => dispatch(addProject())}
        className="w-full nb-btn py-2.5 rounded-xl bg-white text-black text-xs font-black tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#ff8400] hover:text-white"
      >
        <Plus className="w-4 h-4" /> ADD PROJECT ENTRY
      </button>
    </div>
  );
}
