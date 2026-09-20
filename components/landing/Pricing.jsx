'use client';

import Link from 'next/link';
import { Check, X, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-8 bg-[#fff4c2] border-b-[3px] border-black relative">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white text-xs font-black shadow-[3px_3px_0px_#ffd905]">
            <Zap className="w-4 h-4 text-[#ffd905] fill-current" />
            <span>TRANSPARENT ONE-TIME PRICING</span>
          </div>

          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-black">
            The Anti-Subscription <span className="text-[#ff64d5] text-stroke-black drop-shadow-[5px_5px_0px_#000]">Resume Builder.</span>
          </h2>

          <p className="font-sans text-base sm:text-xl font-bold text-black/90 max-w-3xl mx-auto leading-relaxed">
            Other sites trick you into a $30/month subscription just to download your CV. We don&apos;t do that. Pay once, own your PDF.
          </p>
        </div>

        {/* Pricing Card Box */}
        <div className="max-w-xl mx-auto">
          <div className="nb-box rounded-3xl bg-white p-6 sm:p-10 relative overflow-hidden shadow-[8px_8px_0px_#000]">

            {/* Top Badge Banner */}
            <div className="absolute top-0 right-0 bg-[#ffd905] border-b-2 border-l-2 border-black px-4 py-1 rounded-bl-xl font-mono-tech text-xs font-black text-black uppercase tracking-wider">
              ONE-TIME PAYMENT
            </div>

            {/* Title & Price */}
            <div className="space-y-3 pb-6 border-b-2 border-black">
              <h3 className="font-bebas text-3xl sm:text-4xl text-black tracking-wide">
                Premium Download
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="font-bebas text-6xl sm:text-7xl text-[#ff64d5] text-stroke-black-sm leading-none drop-shadow-[3px_3px_0px_#000]">
                  $5.00
                </span>
                <span className="font-mono-tech text-sm font-bold text-black/70 uppercase">
                  / single download (no recurring fee)
                </span>
              </div>
            </div>

            {/* Features List */}
            <ul className="py-6 space-y-4 font-sans text-sm sm:text-base font-bold text-black">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1eac1a] border border-black flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white stroke-[3px]" />
                </div>
                <span>Instant High-Resolution PDF Download</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1eac1a] border border-black flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white stroke-[3px]" />
                </div>
                <span>ATS-Optimized Text formatting</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1eac1a] border border-black flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white stroke-[3px]" />
                </div>
                <span>Clickable Email, Website &amp; LinkedIn links</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1eac1a] border border-black flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white stroke-[3px]" />
                </div>
                <span>Zero watermarks or branding</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1eac1a] border border-black flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white stroke-[3px]" />
                </div>
                <span>Secure account created at checkout to save your data</span>
              </li>

              <li className="flex items-start gap-3 pt-2 text-[#ff0522]">
                <div className="w-6 h-6 rounded-full bg-[#ff0522] border border-black flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-white stroke-[3px]" />
                </div>
                <span>NO Monthly Subscriptions. NO hidden fees.</span>
              </li>
            </ul>

            {/* Big Action Button */}
            <div className="pt-2">
              <Link
                href="/builder"
                className="nb-btn shine-effect w-full py-4 rounded-full bg-[#ffd905] text-black font-bebas text-2xl tracking-wider shadow-[4px_4px_0px_#000] hover:bg-[#ff64d5] hover:text-white flex items-center justify-center gap-2"
              >
                <span>Try the Builder Now</span>
                <ArrowRight className="w-6 h-6 stroke-[3px]" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
