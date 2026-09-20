'use client';

import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import {
  setBuilderMode,
  setMobileTab,
} from '@/store/uiSlice';
import { setCVName } from '@/store/settingsSlice';
import { resetCV, loadCV } from '@/store/cvSlice';
import { demoCVData } from '@/lib/cvData';
import { calculateResumeScore } from '@/lib/suggestionsData';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { exportToPDF } from '@/lib/pdfExport';
import {
  Edit3,
  Palette,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Zap,
  Download,
  UserCheck,
} from 'lucide-react';

export default function BuilderHeader() {
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.cv);
  const settings = useSelector((state) => state.settings);
  const builderMode = useSelector((state) => state.ui.builderMode) || 'edit';
  const mobileTab = useSelector((state) => state.ui.mobileTab) || 'edit';
  const [isExporting, setIsExporting] = useState(false);
  const { user, triggerProtectedAction, openAuthModal } = useAuth();

  const { score } = calculateResumeScore(cv);

  const performPDFExport = async () => {
    try {
      setIsExporting(true);
      const filename = `${cv.personal?.firstName || 'My'}_${cv.personal?.lastName || 'CV'}_Resume.pdf`;
      await exportToPDF('cv-preview-pdf', filename);
    } catch (err) {
      console.error(err);
      alert('Could not export PDF. Try Ctrl+P / print to PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = () => {
    triggerProtectedAction(
      performPDFExport,
      'Log in or sign up to download your high-resolution ATS resume.'
    );
  };

  return (
    <header className="no-print h-14 sm:h-16 border-b-[3px] border-black bg-[#fff4c2] px-2.5 sm:px-6 flex items-center justify-between shrink-0 builder-header z-30 select-none">
      {/* Left branding & CV title */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] font-bebas text-xs sm:text-sm tracking-wider text-black hover:bg-[#ffd905] transition-colors group"
          title="Back to Studio Home"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">STUDIO</span>
        </Link>

        {/* Editable CV Name */}
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={settings.cvName || 'My Resume'}
            onChange={(e) => dispatch(setCVName(e.target.value))}
            className="text-[11px] sm:text-xs font-black font-mono-tech uppercase text-black bg-white px-2 py-1 rounded-lg sm:rounded-xl border-2 border-black shadow-[1.5px_1.5px_0px_#000] focus:outline-none focus:bg-[#ffd905] transition-colors w-20 sm:w-36 truncate"
          />

          {/* Strength Badge */}
          <div
            className={`hidden lg:flex items-center gap-1 text-[11px] font-black font-mono-tech px-2.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] ${
              score >= 80 ? 'bg-[#1eac1a] text-white' : 'bg-[#ffd905] text-black'
            }`}
            title="Resume Score based on completeness"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>{score}% SCORE</span>
          </div>
        </div>
      </div>

      {/* Top Segmented Switcher: [ EDIT | CUSTOMIZE ] */}
      <div className="flex items-center bg-white p-0.5 sm:p-1 rounded-xl sm:rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000]">
        <button
          type="button"
          onClick={() => {
            dispatch(setBuilderMode('edit'));
            dispatch(setMobileTab('edit'));
          }}
          className={`px-2.5 sm:px-6 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-black font-bebas tracking-wider transition-all flex items-center gap-1 sm:gap-1.5 ${
            builderMode === 'edit'
              ? 'bg-[#ff64d5] text-white shadow-[1.5px_1.5px_0px_#000] scale-102'
              : 'text-black hover:bg-[#ffd905]'
          }`}
        >
          <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>EDIT</span>
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(setBuilderMode('customize'));
            dispatch(setMobileTab('edit'));
          }}
          className={`px-2.5 sm:px-6 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-black font-bebas tracking-wider transition-all flex items-center gap-1 sm:gap-1.5 ${
            builderMode === 'customize'
              ? 'bg-[#48A4FF] text-white shadow-[1.5px_1.5px_0px_#000] scale-102'
              : 'text-black hover:bg-[#ffd905]'
          }`}
        >
          <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>CUSTOMIZE</span>
        </button>
      </div>

      {/* Right Action Controls — DOWNLOAD PDF & Sample / Reset (Desktop/Tablet only) */}
      <div className="hidden md:flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleExportPDF}
          disabled={isExporting}
          className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border-2 border-black bg-[#ffd905] text-black font-bebas text-xs sm:text-base tracking-widest flex items-center justify-center gap-1.5 shadow-[2.5px_2.5px_0px_#000] hover:scale-105 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50 transition-all cursor-pointer"
          title="Download Vector PDF"
        >
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          <span>{isExporting ? 'EXPORTING...' : 'DOWNLOAD PDF'}</span>
        </button>

        {user ? (
          <button
            type="button"
            onClick={() => openAuthModal('Account Settings')}
            className="px-2.5 py-1.5 rounded-xl sm:rounded-2xl border-2 border-black bg-white text-black font-bebas text-xs sm:text-sm tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#000] hover:bg-[#2dd4bf] transition-all"
            title={`Logged in as ${user.displayName || user.email}`}
          >
            <UserCheck className="w-4 h-4 text-teal-600" />
            <span className="max-w-[90px] truncate">{user.displayName || user.email?.split('@')[0]}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => openAuthModal()}
            className="px-3 py-1.5 rounded-xl sm:rounded-2xl border-2 border-black bg-white text-black font-bebas text-xs sm:text-sm tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_#000] hover:bg-[#ff64d5] hover:text-white transition-all"
          >
            <span>LOG IN</span>
          </button>
        )}

        <div className="hidden xl:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => dispatch(loadCV(demoCVData))}
            className="p-1.5 rounded-xl bg-white border-2 border-black text-black hover:bg-[#ffd905] shadow-[2px_2px_0px_#000] transition-colors"
            title="Load Sample Demo Data"
          >
            <Zap className="w-3.5 h-3.5 text-[#ff64d5] fill-current" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Clear all CV details to start blank?')) {
                dispatch(resetCV());
              }
            }}
            className="p-1.5 rounded-xl bg-white border-2 border-black text-black hover:bg-[#ff0522] hover:text-white shadow-[2px_2px_0px_#000] transition-colors"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
