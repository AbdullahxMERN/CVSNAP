'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  addCertification,
  updateCertification,
  removeCertification,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addAward,
  updateAward,
  removeAward,
  addInterest,
  removeInterest,
} from '@/store/cvSlice';
import { Plus, Trash2, Award, Globe, Trophy, Star, X } from 'lucide-react';
import { useState } from 'react';

// Certifications Component
export function CertificationsEditor() {
  const dispatch = useDispatch();
  const certs = useSelector((state) => state.cv.certifications) || [];

  return (
    <div className="space-y-3 pt-1">
      {certs.map((c) => (
        <div key={c.id} className="p-3 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_#000] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bebas text-base text-black flex items-center gap-1.5 tracking-wide">
              <Award className="w-4 h-4 text-[#ff0522]" />
              {c.name || 'Certificate'}
            </span>
            <button
              onClick={() => dispatch(removeCertification(c.id))}
              className="p-1 rounded hover:bg-[#ff0522] hover:text-white transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={c.name || ''}
              onChange={(e) =>
                dispatch(updateCertification({ id: c.id, field: 'name', value: e.target.value }))
              }
              placeholder="Certificate Title"
              className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
            />
            <input
              type="text"
              value={c.issuer || ''}
              onChange={(e) =>
                dispatch(updateCertification({ id: c.id, field: 'issuer', value: e.target.value }))
              }
              placeholder="Issuing Organization"
              className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => dispatch(addCertification())}
        className="w-full nb-btn py-2 rounded-xl bg-white text-black text-xs font-black tracking-wider flex items-center justify-center gap-1 hover:bg-[#ffd905]"
      >
        <Plus className="w-3.5 h-3.5" /> ADD CERTIFICATION
      </button>
    </div>
  );
}

// Languages Component
export function LanguagesEditor() {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.cv.languages) || [];

  return (
    <div className="space-y-3 pt-1">
      {languages.map((l) => (
        <div key={l.id} className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-black shrink-0" />
          <input
            type="text"
            value={l.language || ''}
            onChange={(e) =>
              dispatch(updateLanguage({ id: l.id, field: 'language', value: e.target.value }))
            }
            placeholder="Language (e.g. French)"
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
          />
          <select
            value={l.proficiency || 'Conversational'}
            onChange={(e) =>
              dispatch(updateLanguage({ id: l.id, field: 'proficiency', value: e.target.value }))
            }
            className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-black text-xs font-bold font-mono-tech"
          >
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Conversational">Conversational</option>
            <option value="Basic">Basic</option>
          </select>
          <button
            onClick={() => dispatch(removeLanguage(l.id))}
            className="p-1.5 rounded border border-black hover:bg-[#ff0522] hover:text-white transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={() => dispatch(addLanguage())}
        className="w-full nb-btn py-2 rounded-xl bg-white text-black text-xs font-black tracking-wider flex items-center justify-center gap-1 hover:bg-[#ffd905]"
      >
        <Plus className="w-3.5 h-3.5" /> ADD LANGUAGE
      </button>
    </div>
  );
}

// Awards Component
export function AwardsEditor() {
  const dispatch = useDispatch();
  const awards = useSelector((state) => state.cv.awards) || [];

  return (
    <div className="space-y-3 pt-1">
      {awards.map((aw) => (
        <div key={aw.id} className="p-3 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_#000] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bebas text-base text-black flex items-center gap-1.5 tracking-wide">
              <Trophy className="w-4 h-4 text-[#ffd905]" />
              {aw.name || 'Award / Honor'}
            </span>
            <button
              onClick={() => dispatch(removeAward(aw.id))}
              className="p-1 rounded hover:bg-[#ff0522] hover:text-white transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={aw.name || ''}
              onChange={(e) =>
                dispatch(updateAward({ id: aw.id, field: 'name', value: e.target.value }))
              }
              placeholder="Award Name"
              className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
            />
            <input
              type="text"
              value={aw.organization || ''}
              onChange={(e) =>
                dispatch(updateAward({ id: aw.id, field: 'organization', value: e.target.value }))
              }
              placeholder="Organization"
              className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => dispatch(addAward())}
        className="w-full nb-btn py-2 rounded-xl bg-white text-black text-xs font-black tracking-wider flex items-center justify-center gap-1 hover:bg-[#ffd905]"
      >
        <Plus className="w-3.5 h-3.5" /> ADD AWARD
      </button>
    </div>
  );
}

// Interests Component
export function InterestsEditor() {
  const dispatch = useDispatch();
  const interests = useSelector((state) => state.cv.interests) || [];
  const [interestInput, setInterestInput] = useState('');

  const handleAdd = () => {
    const trimmed = interestInput.trim();
    if (!trimmed) return;
    dispatch(addInterest(trimmed));
    setInterestInput('');
  };

  return (
    <div className="space-y-3 pt-1">
      <div className="flex gap-2">
        <input
          type="text"
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Add an interest (e.g. Photography, Running)..."
          className="flex-1 px-3 py-1.5 rounded-lg bg-white border-2 border-black text-black text-xs font-medium focus:outline-none focus:bg-[#fff4c2]"
        />
        <button
          onClick={handleAdd}
          className="nb-btn px-4 py-1.5 rounded-lg bg-[#ffd905] text-black text-xs font-black"
        >
          ADD
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {interests.map((it) => (
          <span
            key={it.id}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#fff4c2] border-2 border-black text-black font-mono-tech text-xs font-bold shadow-[2px_2px_0px_#000]"
          >
            <Star className="w-3 h-3 text-[#ff8400]" />
            {it.name}
            <button
              onClick={() => dispatch(removeInterest(it.id))}
              className="p-0.5 rounded hover:bg-black hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
