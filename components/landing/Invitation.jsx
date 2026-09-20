'use client';

import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export default function Invitation() {
  return (
    <section className="py-28 px-4 sm:px-8 bg-[#ffd905] border-b-[3px] border-black bg-retro-dots">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-black shadow-[3px_3px_0px_#fff]">
          <Mail className="w-3.5 h-3.5 text-[#ffd905]" />
          <span>OFFICIAL INVITATION</span>
        </div>

        {/* 3D Envelope Mockup */}
        <div className="nb-box-lg rounded-3xl bg-white p-8 sm:p-14 relative overflow-hidden transition-transform duration-300 hover:rotate-1">
          {/* Retro Stamp */}
          <div className="absolute top-6 right-6 p-2 rounded-lg bg-[#ff64d5] border-2 border-black rotate-6 shadow-[3px_3px_0px_#000] hidden sm:block">
            <span className="font-bebas text-xs tracking-widest text-white uppercase block">
              AIR MAIL ★ 2026
            </span>
            <span className="font-mono-tech text-[10px] text-black bg-[#ffd905] px-1 rounded block mt-0.5 font-bold">
              PRIORITY CLASS
            </span>
          </div>

          <div className="space-y-6 max-w-xl mx-auto">
            <h2 className="font-bebas text-5xl sm:text-7xl text-black tracking-tight leading-[0.9]">
              YOUR FUTURE SELF <br />
              <span className="text-[#ff64d5] text-stroke-black">WILL THANK YOU</span>
            </h2>

            <p className="font-rock text-xs sm:text-base text-slate-800 leading-relaxed">
              "Great careers are defined by bold decisions. Don't let an ordinary resume stand between you and your next breakthrough."
            </p>

            <div className="pt-4 flex justify-center">
              <Link
                href="/builder"
                className="nb-btn px-10 py-4 rounded-full bg-[#ff64d5] text-white text-lg sm:text-xl tracking-wider shadow-[5px_5px_0px_#000] hover:bg-[#ffd905] hover:text-black flex items-center gap-2"
              >
                <span>ENTER THE CV STUDIO NOW</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="pt-6 border-t-2 border-black flex items-center justify-center gap-6 font-mono-tech text-xs font-bold text-black">
              <span>✓ 100% FREE</span>
              <span>✓ ZERO SIGNUP REQUIRED</span>
              <span>✓ INSTANT A4 DOWNLOAD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
