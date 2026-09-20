'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

const FAQS = [
  {
    question: 'Can I preview my CV and all templates for free?',
    answer:
      'Yes! You can customize, edit, and live-preview your resume across all 15 ATS-approved templates 100% free without any commitment. You only sign in with 1-click Google when you are ready to download your high-resolution vector PDF.',
  },
  {
    question: 'Will this pass ATS (HR Software)?',
    answer:
      'Yes! Unlike other builders that export your CV as an unreadable image, our PDFs are perfectly text-encoded. Robots can easily read your skills, and humans will love the design.',
  },
  {
    question: 'Are the links in the PDF actually clickable?',
    answer:
      'Yes. Your email, portfolio, and LinkedIn URLs will be fully clickable in the downloaded PDF, making it seamless for recruiters to click and contact you.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-8 bg-[#fff4c2] border-b-[3px] border-black relative">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48A4FF] border-2 border-black text-white text-xs font-black shadow-[3px_3px_0px_#000]">
            <HelpCircle className="w-4 h-4" />
            <span>NO HIDDEN TRAPS</span>
          </div>

          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-black">
            Frequently Asked <span className="text-[#ff64d5] text-stroke-black drop-shadow-[4px_4px_0px_#000]">Questions</span>
          </h2>

          <p className="font-sans text-base sm:text-lg font-bold text-black/80 max-w-xl mx-auto">
            Everything you need to know about CVSnap before creating your resume.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="nb-box rounded-2xl bg-white overflow-hidden transition-all shadow-[5px_5px_0px_#000]"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-bebas text-2xl sm:text-3xl text-black hover:bg-[#ffd905] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#ff64d5] text-white' : ''}`}>
                    <ChevronDown className="w-5 h-5 stroke-[3px]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t-2 border-black/10 font-sans text-sm sm:text-base font-bold text-black/85 leading-relaxed bg-amber-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
