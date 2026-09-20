'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '@/context/AuthContext';
import TemplateEngine from '@/components/templates/TemplateEngine';
import { setZoom, setBuilderMode, setCustomizeTab } from '@/store/uiSlice';
import { resetCV } from '@/store/cvSlice';
import { ChevronLeft, ChevronRight, Palette, Zap } from 'lucide-react';
import { getCvPages } from '@/lib/templateUtils';

// A4 in px at 96 DPI
const A4_W_PX = 794;   // 210mm
const A4_H_PX = 1123;  // 297mm

export default function PreviewPanel() {
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.cv);
  const settings = useSelector((state) => state.settings);
  const mobileTab = useSelector((state) => state.ui.mobileTab) || 'edit';
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(0.8);

  // ─── 2-Second Preview Timer & Blink States ──────────────────────────────────
  const [isViewing, setIsViewing] = useState(false);
  const [demoPreviewActive, setDemoPreviewActive] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const [isBlinking, setIsBlinking] = useState(false);

  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  // 1. Detect if user is actually viewing the preview (mobile Preview tab OR desktop)
  useEffect(() => {
    const checkViewing = () => {
      const visible = mobileTab === 'preview' || (typeof window !== 'undefined' && window.innerWidth >= 768);
      setIsViewing(visible);
    };
    checkViewing();
    window.addEventListener('resize', checkViewing);
    return () => window.removeEventListener('resize', checkViewing);
  }, [mobileTab]);

  // 2. Listen for template selection / preview requests
  useEffect(() => {
    const handleDemoRequest = () => {
      setDemoPreviewActive(true);
      setCountdown(2);
    };
    window.addEventListener('demoPreviewRequested', handleDemoRequest);
    return () => window.removeEventListener('demoPreviewRequested', handleDemoRequest);
  }, []);

  // 3. Countdown timer: starts ONLY when user is ACTUALLY viewing the preview!
  useEffect(() => {
    if (!demoPreviewActive || !isViewing) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Trigger 500ms blink/flash transition & reset demo CV to blank user form
          setIsBlinking(true);
          setTimeout(() => {
            dispatch(resetCV());
            setDemoPreviewActive(false);
            if (typeof window !== 'undefined') window.__demoPreviewActive = false;
          }, 250);

          setTimeout(() => {
            setIsBlinking(false);
          }, 600);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [demoPreviewActive, isViewing, dispatch]);

  // Compute Resume.io-style pages
  const { totalPages, pages } = getCvPages(cv);

  // ─── Auto-scale: fit A4 width into container width ───────────────────────
  const recalcScale = useCallback(() => {
    if (!containerRef.current) return;
    const availW = containerRef.current.clientWidth;
    const padding = availW < 768 ? 24 : 80; // px total horizontal padding
    const fit = (availW - padding) / A4_W_PX;
    const clamped = Math.min(Math.max(fit, 0.3), 1.4);
    setScale(Number(clamped.toFixed(3)));
    dispatch(setZoom(Number(clamped.toFixed(3))));
  }, [dispatch]);

  useEffect(() => {
    recalcScale();
    const ro = new ResizeObserver(recalcScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recalcScale]);

  // ─── Clamp current page if total pages decreases ────────────────────────
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleOpenCustomize = () => {
    dispatch(setBuilderMode('customize'));
    dispatch(setCustomizeTab('templates'));
  };

  const activePageCv = pages[currentPage - 1] || pages[0] || cv;

  return (
    <div className="relative flex-1 h-full flex flex-col bg-[#FAF8F5] border-l-[3px] border-black overflow-hidden">

      {/* ─── Top 2-Second Preview Toast Badge ──────────────────────────── */}
      {demoPreviewActive && isViewing && (
        <div className="no-print absolute top-3 left-1/2 -translate-x-1/2 z-40 bg-black text-[#ffd905] font-mono-tech text-xs font-black px-4 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-2 animate-bounce select-none">
          <Zap className="w-3.5 h-3.5 fill-current text-pink-600" />
          <span>PREVIEW for {countdown}S</span>
        </div>
      )}

      {/* ─── Off-screen PDF Export Node (Contains ALL Pages) ─────────────── */}
      <div
        id="cv-preview-pdf"
        className="fixed top-0 left-[-9999px] z-[-100] w-[794px] pointer-events-none opacity-100 flex flex-col gap-0"
      >
        {pages.map((pageData, idx) => (
          <div key={idx} className="cv-page-export w-[794px] min-h-[1123px]">
            <TemplateEngine cv={pageData} settings={settings} />
          </div>
        ))}
      </div>

      {/* ─── Active Page Sheet (Resume.io Single Page Display) ───────────── */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex justify-center items-start scroll-smooth"
        style={{ padding: '24px 12px 100px' }}
      >
        {/* Scale wrapper */}
        <div
          ref={wrapperRef}
          style={{
            width: A4_W_PX,
            height: A4_H_PX * scale,
            transformOrigin: 'top center',
            transform: `scale(${scale})`,
          }}
        >
          {/* Active A4 Paper Sheet Card */}
          <div
            id="cv-preview-page"
            className={`cv-a4-sheet bg-white shadow-[0_12px_36px_rgba(0,0,0,0.14)] border border-stone-300 rounded-xs relative overflow-hidden transition-all duration-300 ${isBlinking ? 'animate-blink-flash' : ''
              }`}
            style={{
              width: A4_W_PX,
              minHeight: A4_H_PX,
            }}
          >
            {/* Page Watermark Badge */}
            {totalPages > 1 && (
              <div className="no-print absolute top-3 right-4 z-20 pointer-events-none select-none">
                <span className="text-[10px] font-mono font-bold text-stone-400 bg-stone-100/90 px-2.5 py-0.5 rounded border border-stone-200 uppercase tracking-widest shadow-xs">
                  PAGE {currentPage} OF {totalPages}
                </span>
              </div>
            )}

            {/* Template Engine for Active Page */}
            <TemplateEngine cv={activePageCv} settings={settings} />
          </div>
        </div>
      </div>

      {/* ─── Desktop-only floating palette button ────────────────────────── */}
      <div className="no-print absolute top-1/2 right-3 -translate-y-1/2 z-30 hidden lg:block">
        <button
          type="button"
          onClick={handleOpenCustomize}
          className="w-11 h-11 rounded-full bg-[#48A4FF] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-white hover:bg-[#ffd905] hover:text-black hover:scale-110 transition-all group cursor-pointer"
          title="Customize template & colors"
        >
          <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* ─── Resume.io Dark Floating Page Switcher Pill ─────────────────────── */}
      {totalPages > 0 && (
        <div className="no-print absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center bg-[#111827] text-white px-3 py-1.5 rounded-full border border-gray-700/80 shadow-[0_10px_25px_rgba(0,0,0,0.3)] select-none">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-1 rounded-full text-gray-400 hover:text-white disabled:opacity-25 disabled:hover:text-gray-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
          </button>

          <span className="font-mono text-xs font-bold text-white px-3 tracking-wider">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-1 rounded-full text-gray-400 hover:text-white disabled:opacity-25 disabled:hover:text-gray-400 transition-colors cursor-pointer disabled:cursor-not-allowed"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}

    </div>
  );
}
