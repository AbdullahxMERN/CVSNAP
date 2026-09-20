'use client';

import { useSelector } from 'react-redux';
import BuilderHeader from '@/components/builder/BuilderHeader';
import EditorPanel from '@/components/editor/EditorPanel';
import CustomizeView from '@/components/builder/CustomizeView';
import PreviewPanel from '@/components/builder/PreviewPanel';
import TemplateSelectorModal from '@/components/builder/TemplateSelectorModal';
import CustomizationPanel from '@/components/builder/CustomizationPanel';

import MobileBottomNav from '@/components/builder/MobileBottomNav';

export default function BuilderPage() {
  const builderMode = useSelector((state) => state.ui.builderMode) || 'edit';
  const mobileTab = useSelector((state) => state.ui.mobileTab) || 'edit';

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#fff4c2] text-black selection:bg-[#ff64d5] selection:text-white">
      {/* Top Navigation */}
      <BuilderHeader />

      {/* Main Split Body */}
      <div className="flex-1 flex overflow-hidden relative pb-20 md:pb-0">
        {/* Left Side: Editor Form OR Customize Panel (Resume.io Dual Mode) */}
        <div
          className={`w-full md:w-[480px] lg:w-[520px] xl:w-[560px] shrink-0 p-2 sm:p-3 md:p-5 bg-[#fff4c2] overflow-hidden flex flex-col ${
            mobileTab === 'preview' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {builderMode === 'edit' ? <EditorPanel /> : <CustomizeView />}
        </div>

        {/* Right Side: Live A4 Preview with Floating Quick Actions */}
        <div
          className={`flex-1 h-full overflow-hidden ${
            mobileTab === 'edit' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <PreviewPanel />
        </div>
      </div>

      {/* Mobile Floating Bottom Dock (Edit / Customize / Preview Switcher) */}
      <MobileBottomNav />

      {/* Modals & Slide-out Drawers */}
      <TemplateSelectorModal />
      <CustomizationPanel />
    </div>
  );
}
