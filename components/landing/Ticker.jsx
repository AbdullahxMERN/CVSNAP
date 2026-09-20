'use client';

export default function Ticker() {
  const items = [
    '⚡ 15 HANDCRAFTED TEMPLATES',
    '★ ATS-OPTIMIZED HIERARCHY',
    '⚡ SUB-MILLIMETER VECTOR PDF',
    '★ ZERO CLOUD VENDOR LOCK-IN',
    '⚡ REAL-TIME REACTIVE CANVAS',
    '★ 100% PRIVATE IN-BROWSER',
    '⚡ TYPOGRAPHY BY MASTER FOUNDRIES',
  ];

  return (
    <div className="relative py-12 overflow-hidden bg-black select-none">
      {/* Yellow Ticker Strip */}
      <div className="relative z-10 -rotate-1 py-3 bg-[#ffd905] border-y-[3px] border-black shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
        <div className="animate-marquee flex items-center gap-8 font-bebas text-2xl sm:text-3xl tracking-widest text-black">
          {[...items, ...items, ...items].map((text, idx) => (
            <span key={idx} className="whitespace-nowrap font-black">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Pink Ticker Strip */}
      <div className="relative z-0 rotate-1.5 -mt-2 py-3 bg-[#ff64d5] border-y-[3px] border-black shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
        <div className="animate-marquee flex items-center gap-8 font-bebas text-2xl sm:text-3xl tracking-widest text-white">
          {[...items, ...items, ...items].reverse().map((text, idx) => (
            <span key={idx} className="whitespace-nowrap font-black text-stroke-black-sm">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
