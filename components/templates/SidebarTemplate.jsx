'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function SidebarTemplate(props) {
  const d = props.data || props.cv || {};
  const p = d.personal || {};
  const experience = d.experience || [];
  const education = d.education || [];
  const skills = d.skills || [];
  const projects = d.projects || [];
  const certifications = d.certifications || [];
  const languages = d.languages || [];
  const awards = d.awards || [];
  const volunteer = d.volunteer || [];
  const publications = d.publications || [];
  const interests = d.interests || [];
  const references = d.references;
  const customSections = d.customSections || [];

  const firstName = p.firstName || '';
  const lastName = p.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const jobTitle = p.jobTitle || p.title || '';
  const photoUrl = p.photoUrl || p.photo;

  const fullLocation = [p.address, p.city, p.postalCode, p.country, p.location].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(', ');

  return (
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-[#FAF9F6] text-[#1F1F1F] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-normal selection:bg-[#E9D5FF]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .font-marker { font-family: 'Permanent Marker', cursive, sans-serif; }
        .font-hand { font-family: 'Caveat', cursive; }
        .font-main { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      {/* BACKGROUND DOODLES */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
        <div className="absolute top-6 left-[45%] w-24 h-4">
          <svg viewBox="0 0 100 20" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round">
            <path d="M0 10 Q 12 0, 25 10 T 50 10 T 75 10 T 100 10" />
          </svg>
        </div>
        <div className="absolute top-[480px] left-[320px] w-8 h-8 text-[#222]">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 p-8 sm:p-10 min-h-[297mm] flex flex-col justify-between">
        
        {/* TOP ROW */}
        <header className="grid grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Name & Photo */}
          <div className={`${(p.phone || p.email || p.website || p.linkedin || p.github || fullLocation) ? 'col-span-6' : 'col-span-12'} relative`}>
            <div className="mb-3">
              <h1 className="font-marker text-4xl sm:text-5xl uppercase tracking-wider text-black transform -rotate-2 inline-block">
                {firstName || (fullName ? '' : 'YOUR')}
              </h1>
              <div className="font-marker text-4xl sm:text-5xl uppercase tracking-wider text-[#A855F7] -mt-3 transform -rotate-1 ml-1">
                {lastName || (fullName ? '' : 'NAME')}
              </div>
              
              {jobTitle && (
                <div className="mt-2 inline-block bg-[#18181B] text-white px-3 py-1 rounded-md transform rotate-1 shadow-md">
                  <span className="font-marker text-xs sm:text-sm tracking-wider uppercase">
                    {jobTitle}
                  </span>
                </div>
              )}
            </div>

            {/* Photo if provided */}
            {photoUrl ? (
              <div className="relative mt-3 ml-2 w-56 h-56 sm:w-64 sm:h-64">
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#C084FC]/60 via-[#DDD6FE]/70 to-[#F3E8FF]/90 rounded-[58%_42%_65%_35%/48%_62%_38%_52%] filter blur-[1px] transform -rotate-3 z-0" />
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border-2 border-black/80 shadow-md bg-white">
                  <img src={photoUrl} alt={fullName} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Column: Sticky Note Contact Card */}
          {(p.phone || p.email || p.website || p.linkedin || p.github || fullLocation) && (
            <div className="col-span-6 flex flex-col items-end space-y-3 pl-2">
              
              {/* Sticky Note */}
              <div className="relative w-full max-w-[270px] bg-[#FFFDE7] border border-amber-200/90 rounded-sm p-4 shadow-[3px_4px_12px_rgba(0,0,0,0.12)] transform rotate-1">
                <div className="absolute -top-3.5 left-6 w-5 h-9 z-20 pointer-events-none drop-shadow-sm">
                  <svg viewBox="0 0 24 48" fill="none" stroke="#71717A" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 44 V 12 A 6 6 0 0 1 24 12 V 38 A 4 4 0 0 1 16 38 V 16 A 2 2 0 0 1 20 16 V 34" />
                  </svg>
                </div>

                <h2 className="font-marker text-sm uppercase tracking-wider text-black mb-2.5 border-b-2 border-black/10 pb-1 text-center">
                  CONTACT
                </h2>

                <div className="font-main text-[11px] space-y-2 text-[#27272A]">
                  {p.phone && (
                    <div className="flex items-center gap-2">
                      <span>📞</span>
                      <a href={`tel:${p.phone}`} className="hover:underline font-medium text-black">{p.phone}</a>
                    </div>
                  )}
                  {p.email && (
                    <div className="flex items-center gap-2">
                      <span>✉</span>
                      <a href={`mailto:${p.email}`} className="hover:underline font-medium text-black truncate max-w-[190px]">{p.email}</a>
                    </div>
                  )}
                  {fullLocation && (
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span className="font-medium text-black truncate max-w-[190px]">{fullLocation}</span>
                    </div>
                  )}
                  {p.website && (
                    <div className="flex items-center gap-2">
                      <span>🌐</span>
                      <a href={`https://${p.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-black truncate max-w-[190px]">{p.website}</a>
                    </div>
                  )}
                  {p.linkedin && (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">in</span>
                      <a href={`https://${p.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-black truncate max-w-[190px]">{p.linkedin}</a>
                    </div>
                  )}
                  {p.github && (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">⌨</span>
                      <a href={`https://${p.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-black truncate max-w-[190px]">{p.github}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>

        {/* 2-COLUMN LOWER BODY */}
        <div className="grid grid-cols-12 gap-8 mt-6 items-start flex-grow">
          
          {/* LEFT COLUMN */}
          <div className="col-span-5 space-y-6">
            {p.summary && (
              <section className="break-inside-avoid">
                <div className="inline-block border-b-2 border-black pb-0.5 mb-2">
                  <h2 className="font-marker text-sm uppercase tracking-wide text-black">ABOUT ME</h2>
                </div>
                <p className="font-main text-[11px] text-[#333] leading-relaxed text-justify">{p.summary}</p>
              </section>
            )}

            {skills.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border-b-2 border-black pb-0.5 mb-2">
                  <h2 className="font-marker text-sm uppercase tracking-wide text-black">CORE SKILLS</h2>
                </div>
                <ul className="font-main text-[11.5px] space-y-1.5 text-[#222]">
                  {skills.map((skill, idx) => {
                    const name = typeof skill === 'string' ? skill : skill.name;
                    return (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
                        <span className="font-semibold text-gray-800">{name}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* INTERESTS */}
            {interests.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border-b-2 border-black pb-0.5 mb-2">
                  <h2 className="font-marker text-sm uppercase tracking-wide text-black">INTERESTS</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((it, i) => (
                    <span key={i} className="font-main text-[10.5px] font-bold px-2.5 py-1 bg-white border border-black rounded-lg">
                      {typeof it === 'string' ? it : it.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border-b-2 border-black pb-0.5 mb-2">
                  <h2 className="font-marker text-sm uppercase tracking-wide text-black">LANGUAGES</h2>
                </div>
                <ul className="font-main text-xs space-y-1">
                  {languages.map((l, i) => (
                    <li key={i} className="font-semibold text-gray-800">• {l.language}: <span className="font-normal text-gray-600">{l.proficiency}</span></li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-7 space-y-6">
            {experience.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border-b-2 border-black pb-0.5 mb-3">
                  <h2 className="font-marker text-sm uppercase tracking-wide text-black">EXPERIENCE</h2>
                </div>
                <div className="space-y-4">
                  {experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="grid grid-cols-12 gap-2 text-xs break-inside-avoid">
                      <div className="col-span-3 font-marker text-[10.5px] text-[#A855F7] leading-tight pt-0.5">
                        <div>{exp.startDate}</div>
                        <div className="text-[#9333EA]">{exp.endDate || 'PRESENT'}</div>
                      </div>
                      <div className="col-span-9 font-main">
                        <h3 className="font-marker text-xs uppercase tracking-wide text-black">{exp.title || exp.jobTitle}</h3>
                        <h4 className="font-bold text-[11px] text-[#9333EA] mb-0.5">{exp.company}</h4>
                        {exp.description && <p className="text-[10.5px] text-gray-700 leading-relaxed">{exp.description}</p>}
                        {exp.achievements?.length > 0 && (
                          <ul className="mt-1 space-y-0.5 list-disc pl-3 text-[10.5px] text-gray-700">
                            {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border-b-2 border-black pb-0.5 mb-2">
                  <h2 className="font-marker text-sm uppercase tracking-wide text-black">EDUCATION</h2>
                </div>
                <div className="space-y-3 font-main text-xs">
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="break-inside-avoid">
                      <h3 className="font-bold text-[11.5px] text-black">{edu.degree}</h3>
                      <p className="font-semibold text-[11px] text-[#9333EA]">{edu.school || edu.institution}</p>
                      <p className="text-[10px] text-gray-600">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <section className="break-inside-avoid font-main">
                <div className="inline-block border-b-2 border-black pb-0.5 mb-2">
                  <h2 className="font-marker text-sm uppercase tracking-wide text-black">PROJECTS</h2>
                </div>
                <div className="space-y-2 text-xs">
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="text-[11px]">
                      <span className="font-bold text-black">{proj.name}: </span>
                      <span className="text-gray-700">{proj.description}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CERTIFICATIONS */}
            {certifications.length > 0 && (
              <section className="break-inside-avoid font-main">
                <div className="inline-block border-b-2 border-black pb-0.5 mb-2">
                  <h2 className="font-marker text-sm uppercase tracking-wide text-black">CERTIFICATIONS</h2>
                </div>
                <ul className="space-y-1 text-[11px] text-gray-800">
                  {certifications.map((c, i) => (
                    <li key={i}>• {typeof c === 'string' ? c : `${c.name} (${c.issuer || ''})`}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* CUSTOM SECTIONS */}
            {customSections?.length > 0 && (
              <section className="break-inside-avoid font-main">
                {customSections.map((sec, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="inline-block border-b-2 border-black pb-0.5 mb-1.5">
                      <h2 className="font-marker text-sm uppercase tracking-wide text-black">{sec.title}</h2>
                    </div>
                    {sec.content && <p className="text-xs text-gray-700">{sec.content}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
