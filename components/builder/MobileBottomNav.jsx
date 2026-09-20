'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMobileTab, setBuilderMode } from '@/store/uiSlice';
import { exportToPDF } from '@/lib/pdfExport';
import { useAuth } from '@/context/AuthContext';
import { Eye, Edit3, Palette, Download } from 'lucide-react';

export default function MobileBottomNav() {
  const dispatch = useDispatch();
  const mobileTab = useSelector((state) => state.ui.mobileTab) || 'edit';
  const builderMode = useSelector((state) => state.ui.builderMode) || 'edit';
  const cv = useSelector((state) => state.cv);
  const [isExporting, setIsExporting] = useState(false);
  const { triggerProtectedAction } = useAuth();

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
    <div className="no-print md:hidden fixed bottom-0 left-0 right-0 z-50 select-none">
      {/* ─── Thin accent stripe at top ─── */}
      <div className="h-[3px] bg-black" />

      <div className="bg-[#fff4c2] px-3 py-2.5 flex items-center gap-2">
        {mobileTab === 'edit' ? (
          /* ─── Edit / Customize mode → show full-width PREVIEW RESUME CTA ─── */
          <button
            type="button"
            onClick={() => dispatch(setMobileTab('preview'))}
            className="
              w-full py-3.5 rounded-2xl border-2 border-black
              bg-[#ffd905] text-black
              font-bebas text-lg tracking-widest
              flex items-center justify-center gap-2
              shadow-[3px_3px_0px_#000]
              active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000]
              transition-all cursor-pointer
            "
          >
            <Eye className="w-5 h-5" />
            PREVIEW RESUME
          </button>
        ) : (
          /* ─── Preview mode → show Edit / Customize / Download ─── */
          <>
            <button
              type="button"
              onClick={() => {
                dispatch(setBuilderMode('edit'));
                dispatch(setMobileTab('edit'));
              }}
              className="
                flex-1 py-3 rounded-2xl border-2 border-black
                bg-white text-black
                font-bebas text-sm tracking-widest
                flex items-center justify-center gap-1.5
                shadow-[2px_2px_0px_#000]
                active:translate-x-[1px] active:translate-y-[1px] active:shadow-none
                transition-all
              "
            >
              <Edit3 className="w-3.5 h-3.5 text-[#ff64d5]" />
              EDIT
            </button>

            <button
              type="button"
              onClick={() => {
                dispatch(setBuilderMode('customize'));
                dispatch(setMobileTab('edit'));
              }}
              className="
                flex-1 py-3 rounded-2xl border-2 border-black
                bg-[#48A4FF] text-white
                font-bebas text-sm tracking-widest
                flex items-center justify-center gap-1.5
                shadow-[2px_2px_0px_#000]
                active:translate-x-[1px] active:translate-y-[1px] active:shadow-none
                transition-all
              "
            >
              <Palette className="w-3.5 h-3.5" />
              STYLE
            </button>

            <button
              type="button"
              onClick={handleExportPDF}
              disabled={isExporting}
              className="
                flex-1 py-3 rounded-2xl border-2 border-black
                bg-[#ffd905] text-black
                font-bebas text-sm tracking-widest
                flex items-center justify-center gap-1.5
                shadow-[2px_2px_0px_#000]
                active:translate-x-[1px] active:translate-y-[1px] active:shadow-none
                disabled:opacity-50
                transition-all
              "
            >
              <Download className="w-3.5 h-3.5" />
              {isExporting ? 'WAIT...' : 'DOWNLOAD'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
