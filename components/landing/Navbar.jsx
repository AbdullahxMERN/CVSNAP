'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Zap, LogIn, UserCheck } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, openAuthModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 transition-all duration-300 ${scrolled
          ? 'bg-[#ff64d5] border-b-[3px] border-black shadow-[0_4px_25px_rgba(92,10,70,0.3)]'
          : 'bg-[#fff4c2]/90 backdrop-blur-md border-b-2 border-black/10'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#ffd905] border-2 border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-black fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-black leading-none">
              CVSNAP
            </span>
            <span className="hidden sm:block font-mono-tech text-[9px] tracking-widest text-black/80 font-bold uppercase -mt-0.5">
              RESUME STUDIO
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000]">
          <a
            href="#templates"
            className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider text-black hover:bg-[#ffd905] transition-colors"
          >
            Templates
          </a>
          <a
            href="#pricing"
            className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider text-black hover:bg-[#ffd905] transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider text-black hover:bg-[#ffd905] transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {user ? (
            <button
              type="button"
              onClick={() => openAuthModal('Account Settings')}
              className="px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000] hover:bg-[#2dd4bf] transition-all flex items-center gap-1 shrink-0"
              title={`Logged in as ${user.displayName || user.email}`}
            >
              <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 shrink-0" />
              <span className="max-w-[60px] sm:max-w-[100px] truncate">{user.displayName || user.email?.split('@')[0]}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000] hover:bg-[#48A4FF] hover:text-white transition-all flex items-center gap-1 shrink-0"
            >
              <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>Log In</span>
            </button>
          )}

          <Link
            href="/builder"
            className="nb-btn px-2.5 py-1 sm:px-5 sm:py-2 rounded-full bg-[#ffd905] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2.5px_2.5px_0px_#000] hover:bg-[#ff64d5] hover:text-white transition-all flex items-center gap-1 shrink-0"
          >
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current shrink-0" />
            <span className="hidden sm:inline">Build Resume — Free</span>
            <span className="sm:hidden">BUILD FREE</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

