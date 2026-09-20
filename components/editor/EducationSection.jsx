'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, updateEducation, removeEducation } from '@/store/cvSlice';
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

export default function EducationSection() {
  const dispatch = useDispatch();
  const educationList = useSelector((state) => state.cv.education) || [];
  const [openIds, setOpenIds] = useState(() => (educationList[0] ? [educationList[0].id] : []));

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 text-black">
      {/* Recruiter Tip Banner */}
      <div className="p-3 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-start gap-2.5">
        <div className="p-1.5 rounded-lg bg-[#48A4FF] border border-black shrink-0">
          <GraduationCap className="w-4 h-4 text-black" />
        </div>
        <div className="text-xs">
          <span className="font-bold font-mono-tech block uppercase text-[11px] text-black">
            Recruiter Insight
          </span>
          <p className="text-slate-700 leading-snug">
            A varied education on your resume sums up the value that your academic background, degrees, and extracurriculars bring to the table.
          </p>
        </div>
      </div>

      {educationList.length === 0 && (
        <div className="p-4 rounded-xl bg-white border-2 border-black text-center space-y-2 shadow-[2px_2px_0px_#000]">
          <p className="font-mono-tech text-xs font-bold text-black uppercase">
            No education entries yet.
          </p>
          <p className="text-xs text-slate-700">
            Click below to add your college, university, high school, or bootcamp background.
          </p>
        </div>
      )}

      {/* Education Cards */}
      <div className="space-y-3">
        {educationList.map((edu, index) => {
          const isOpen = openIds.includes(edu.id);
          const headerTitle =
            edu.degree || edu.institution
              ? `${edu.degree || 'Degree'}${edu.institution ? ` at ${edu.institution}` : ''}`
              : `(Not specified)`;

          const dateDisplay = edu.startDate
            ? `${edu.startDate} – ${edu.endDate || 'Present'}`
            : null;

          return (
            <div
              key={edu.id}
              className="rounded-xl border-2 border-black bg-white overflow-hidden shadow-[3px_3px_0px_#000] transition-all"
            >
              {/* Header */}
              <div
                onClick={() => toggleOpen(edu.id)}
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
                        {dateDisplay} {edu.location ? `• ${edu.location}` : ''}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeEducation(edu.id));
                    }}
                    className="p-1 rounded-lg bg-white border border-black hover:bg-[#ff0522] hover:text-white transition-colors"
                    title="Delete Entry"
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

              {/* Body */}
              {isOpen && (
                <div className="p-4 space-y-3 bg-white animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        Degree / Qualification
                      </label>
                      <input
                        type="text"
                        value={edu.degree || ''}
                        onChange={(e) =>
                          dispatch(updateEducation({ id: edu.id, field: 'degree', value: e.target.value }))
                        }
                        placeholder="e.g. B.S. Human-Computer Interaction"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        School / University
                      </label>
                      <input
                        type="text"
                        value={edu.institution || ''}
                        onChange={(e) =>
                          dispatch(updateEducation({ id: edu.id, field: 'institution', value: e.target.value }))
                        }
                        placeholder="e.g. Carnegie Mellon University"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={edu.startDate || ''}
                        onChange={(e) =>
                          dispatch(updateEducation({ id: edu.id, field: 'startDate', value: e.target.value }))
                        }
                        placeholder="MM / YYYY"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={edu.endDate || ''}
                        onChange={(e) =>
                          dispatch(updateEducation({ id: edu.id, field: 'endDate', value: e.target.value }))
                        }
                        placeholder="MM / YYYY"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        City, Country
                      </label>
                      <input
                        type="text"
                        value={edu.location || ''}
                        onChange={(e) =>
                          dispatch(updateEducation({ id: edu.id, field: 'location', value: e.target.value }))
                        }
                        placeholder="Pittsburgh, PA"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        Grade / GPA (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.grade || ''}
                        onChange={(e) =>
                          dispatch(updateEducation({ id: edu.id, field: 'grade', value: e.target.value }))
                        }
                        placeholder="3.9 GPA / Summa Cum Laude"
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block font-mono-tech text-xs font-bold text-black uppercase">
                        Honors / Activities / Minors
                      </label>
                      <input
                        type="text"
                        value={edu.description || ''}
                        onChange={(e) =>
                          dispatch(updateEducation({ id: edu.id, field: 'description', value: e.target.value }))
                        }
                        placeholder="Minor in CS. Dean's list all 4 years."
                        className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-black text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-[#fff4c2] shadow-[1px_1px_0px_#000]"
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
        onClick={() => dispatch(addEducation())}
        className="w-full nb-btn py-3 rounded-xl bg-white text-black text-xs font-black tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#48A4FF] shadow-[2px_2px_0px_#000]"
      >
        <Plus className="w-4 h-4" /> ADD EDUCATION
      </button>
    </div>
  );
}
