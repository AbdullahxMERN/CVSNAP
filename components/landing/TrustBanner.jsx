
import React from 'react';

export default function TechTicker() {
  const companies = [
    'Workday',
    'Greenhouse',
    'Lever',
    'BambooHR',
    'Taleo',
    'Ashby',
    'iCIMS',
  ];

  return (
    <section className="relative w-full overflow-hidden border-y border-white/[0.02] bg-[#050505] py-8">

      {/* Label */}
      <div className="mb-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:text-xs">
          Engineered to pass top Applicant Tracking Systems
        </p>
      </div>

      {/* Left fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050505] to-transparent md:w-40" />

      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050505] to-transparent md:w-40" />

      {/* Ticker */}
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">

          {/* Repeat many times */}
          {[...Array(4)].map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="flex shrink-0 items-center gap-4 md:gap-6"
            >
              {companies.map((company) => (
                <LogoBox
                  key={`${groupIndex}-${company}`}
                  name={company}
                />
              ))}
            </div>
          ))}

        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-25%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>

    </section>
  );
}

function LogoBox({ name }) {
  return (
    <div className="flex h-12 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.01] px-6 md:h-14 md:px-8">
      <span className="whitespace-nowrap text-xs font-bold tracking-wider text-zinc-300 md:text-sm">
        {name}
      </span>
    </div>
  );
}
