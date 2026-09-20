'use client';

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const MESSAGES = [
  'Brewing coffee for your career...',
  'Polishing your story...',
  'Calibrating the printing press...',
  'Loading premium templates...',
  'Almost there...',
];

export default function Loader() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 12) + 6, 100);
      });
    }, 40);

    const msgTimer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[#ffd905] transition-all duration-500 select-none ${percent >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '18px 18px' }}
    >
      <div className="flex flex-col items-center gap-7">
        {/* Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-[#ff64d5] border-[4px] border-black shadow-[6px_6px_0px_#000] flex items-center justify-center animate-bounce">
            <Zap className="w-12 h-12 text-white fill-current" />
          </div>
          <span className="absolute -top-3 -right-4 px-2 py-0.5 rounded-full bg-[#48A4FF] border-2 border-black text-[11px] font-black text-white shadow-[2px_2px_0px_#000] rotate-12 animate-spin-slow">
            ⚡
          </span>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="font-bebas text-5xl sm:text-7xl text-[#ff64d5] text-stroke-black tracking-wider leading-none drop-shadow-[3px_3px_0px_#000]">
            CVSNAP
          </h1>
          <p className="font-mono-tech text-xs font-bold tracking-[0.3em] text-black uppercase mt-1">
            CV STUDIO
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 sm:w-96 space-y-2">
          <div className="w-full h-6 rounded-full bg-white border-[2.5px] border-black shadow-[4px_4px_0px_#000] p-0.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#ff64d5] transition-all duration-100 relative overflow-hidden"
              style={{ width: `${percent}%` }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 shine-effect" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-xs font-bold text-black transition-all duration-300 min-h-[18px]">
              {MESSAGES[msgIdx]}
            </span>
            <span className="font-bebas text-2xl text-black">{Math.min(percent, 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
