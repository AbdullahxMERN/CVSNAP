'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentStep,
  nextStep,
  prevStep,
  setBuilderMode,
} from '@/store/uiSlice';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Zap,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Palette,
} from 'lucide-react';
import PersonalDetailsSection from './PersonalDetailsSection';
import SummarySection from './SummarySection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import CustomSectionsStep from './CustomSectionsStep';
import { calculateResumeScore } from '@/lib/suggestionsData';

const STEPS = [
  { id: 'personal', title: 'Personal Details', shortTitle: 'Personal', icon: User, Component: PersonalDetailsSection, nextLabel: 'Next: Professional Summary' },
  { id: 'summary', title: 'Professional Summary', shortTitle: 'Summary', icon: FileText, Component: SummarySection, nextLabel: 'Next: Employment History' },
  { id: 'experience', title: 'Employment History', shortTitle: 'Experience', icon: Briefcase, Component: ExperienceSection, nextLabel: 'Next: Education' },
  { id: 'education', title: 'Education', shortTitle: 'Education', icon: GraduationCap, Component: EducationSection, nextLabel: 'Next: Skills' },
  { id: 'skills', title: 'Skills & Proficiencies', shortTitle: 'Skills', icon: Zap, Component: SkillsSection, nextLabel: 'Next: Custom & Extra Sections' },
  { id: 'additional', title: 'Custom & Additional Sections', shortTitle: 'Custom', icon: Layers, Component: CustomSectionsStep, nextLabel: 'Finish & Customize' },
];

export default function EditorPanel() {
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.cv);
  const currentStep = useSelector((state) => state.ui.currentStep) || 0;

  const { score, nextAction, isComplete } = calculateResumeScore(cv);
  const currentStepObj = STEPS[currentStep] || STEPS[0];
  const StepComponent = currentStepObj.Component;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      dispatch(nextStep());
    } else {
      // Finished all edit steps -> switch to customize
      dispatch(setBuilderMode('customize'));
    }
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleQuickAction = () => {
    if (nextAction && typeof nextAction.step === 'number') {
      dispatch(setCurrentStep(nextAction.step));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fff4c2] overflow-hidden">
      {/* Top Resume.io Style Score Progress Bar */}
      <div className="p-3.5 pb-2 shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`font-bebas text-sm px-2 py-0.5 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_#000] ${
                score >= 80 ? 'bg-[#1eac1a] text-white' : 'bg-[#ffd905] text-black'
              }`}
            >
              {score}%
            </span>
            <span className="font-mono-tech text-xs font-bold text-black uppercase tracking-wide">
              Your resume score
            </span>
          </div>

          {/* Dynamic Clickable Quick-Action Hint */}
          {nextAction && score < 100 && (
            <button
              type="button"
              onClick={handleQuickAction}
              className="text-[11px] font-mono-tech font-bold px-2.5 py-1 rounded-full bg-white border border-black shadow-[1px_1px_0px_#000] text-black hover:bg-[#ff64d5] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3 h-3 text-[#ffd905] fill-current" />
              <span>{nextAction.label}</span>
            </button>
          )}
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2 rounded-full bg-white border border-black overflow-hidden p-0.5 shadow-[1px_1px_0px_#000]">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              score >= 80 ? 'bg-[#1eac1a]' : 'bg-[#ff64d5]'
            }`}
            style={{ width: `${Math.max(score, 6)}%` }}
          />
        </div>

        {/* Step Tabs Strip */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pt-1 pb-0.5 no-scrollbar">
          {STEPS.map((step, idx) => {
            const isActive = currentStep === idx;
            const isPassed = currentStep > idx;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => dispatch(setCurrentStep(idx))}
                className={`px-2.5 py-1 rounded-lg font-mono-tech text-[11px] font-bold border transition-all flex items-center gap-1.5 shrink-0 select-none ${
                  isActive
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_#000]'
                    : isPassed
                    ? 'bg-white text-black border-black/40 hover:bg-[#ffd905]'
                    : 'bg-white/60 text-slate-600 border-black/20 hover:bg-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{step.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Step Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-5 py-2 builder-sidebar">
        <div className="space-y-3 pb-6">
          {/* Step Header */}
          <div className="flex items-center justify-between pb-1 border-b-2 border-black/20">
            <h2 className="font-bebas text-2xl text-black tracking-wide">
              {currentStepObj.title}
            </h2>
            <span className="font-mono-tech text-xs text-slate-600 font-bold">
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>

          {/* Active Step Component */}
          <StepComponent />
        </div>
      </div>

      {/* Bottom Sticky Navigation Bar */}
      <div className="shrink-0 p-3 md:p-4 bg-[#fff4c2] border-t-2 border-black flex items-center justify-between gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {/* Back Button */}
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="nb-btn px-4 py-2.5 rounded-xl bg-white text-black text-xs font-black tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_#000] hover:bg-[#ffd905]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>
        ) : (
          <div className="w-16" />
        )}

        {/* Step Dot Indicators */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              onClick={() => dispatch(setCurrentStep(idx))}
              className={`w-2.5 h-2.5 rounded-full border border-black transition-all ${
                currentStep === idx
                  ? 'bg-black scale-125'
                  : currentStep > idx
                  ? 'bg-[#1eac1a]'
                  : 'bg-white'
              }`}
              title={step.title}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="nb-btn px-5 py-2.5 rounded-xl bg-[#48A4FF] text-white text-xs sm:text-sm font-black tracking-wider flex items-center gap-1.5 shadow-[3px_3px_0px_#000] hover:bg-[#ffd905] hover:text-black transition-all"
        >
          <span>{currentStepObj.nextLabel}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
