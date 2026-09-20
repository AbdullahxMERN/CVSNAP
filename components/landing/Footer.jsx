'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUp, Zap } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t-4 border-black overflow-hidden relative select-none">

      {/* Big Final CTA Section */}
      <div className="py-20 px-4 sm:px-8 bg-[#ff64d5] border-b-4 border-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white text-stroke-black-thick tracking-tight leading-none drop-shadow-[5px_5px_0px_#000]">
            Ready to land your dream job?
          </h2>

          <p className="font-sans text-lg sm:text-xl font-bold text-black max-w-xl mx-auto">
            Build your ATS-approved resume in 3 minutes. Zero sign-up required to test all 15 templates.
          </p>

          <div className="pt-2">
            <Link
              href="/builder"
              className="nb-btn shine-effect inline-flex px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-[#ffd905] text-black font-bebas text-2xl sm:text-3xl tracking-wider shadow-[6px_6px_0px_#000] hover:bg-white transition-transform"
            >
              <span>Create Your Resume</span>
              <ArrowRight className="w-7 h-7 stroke-[3px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">

        {/* Top Header Branding & Scroll to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/20 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffd905] border-2 border-white flex items-center justify-center">
              <Zap className="w-6 h-6 text-black fill-current" />
            </div>
            <div>
              <h3 className="font-bebas text-4xl text-[#ffd905] leading-none tracking-wide">
                CVSNAP
              </h3>
              <p className="font-mono-tech text-xs text-slate-400">
                15 ATS-Approved Resume Templates · One-Time $5 PDF Download
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="nb-btn px-5 py-2.5 rounded-full bg-white text-black font-bebas text-base tracking-wider shadow-[3px_3px_0px_#ff64d5] hover:bg-[#ffd905] flex items-center gap-2 shrink-0"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Legal Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs font-mono-tech text-slate-400 gap-6">
          <p>© {new Date().getFullYear()} CVSnap. Built with artistic attitude &amp; zero compromises.</p>

          {/* Small Links at bottom */}
          <div className="flex items-center gap-6 font-bold text-white uppercase tracking-wider">
            <a href="#" className="hover:text-[#ffd905] transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#ffd905] transition-colors">
              Terms of Service
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#ffd905] transition-colors">
              Contact Support
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
