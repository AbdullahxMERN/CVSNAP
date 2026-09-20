'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function BoldTemplate(props) {
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

  const skillList = Array.isArray(skills)
    ? skills.map((s) => (typeof s === 'string' ? s : s.name))
    : [];

  const fullLocation = [p.address, p.city, p.postalCode, p.country, p.location].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(', ');

  return (
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white text-[#1A1A1A] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-normal selection:bg-gray-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-modern { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      {/* Sleek Left Vertical Accent Strip */}
      <div className="absolute top-12 left-0 w-1.5 h-36 bg-black pointer-events-none" />

      <div className="p-10 sm:p-12 min-h-[297mm] flex flex-col justify-between">
        
        {/* HEADER */}
        <header className="grid grid-cols-12 gap-6 items-start pb-6 border-b border-gray-200/80">
          <div className="col-span-7 pt-1">
            <div className="font-modern text-2xl sm:text-3xl font-light uppercase tracking-[0.18em] text-[#262626] leading-none">
              {firstName || (fullName ? '' : 'YOUR')}
            </div>
            <h1 className="font-modern text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-black leading-tight mt-1.5">
              {lastName || (fullName ? '' : 'NAME')}
            </h1>
            {jobTitle && (
              <div className="font-modern text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#555] mt-3">
                {jobTitle.split('').join(' ')}
              </div>
            )}
          </div>

          <div className="col-span-5 flex flex-col justify-center space-y-1.5 text-xs font-body">
            {p.phone && (
              <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                <span className="font-bold font-modern text-xs text-black w-6">M</span>
                <a href={`tel:${p.phone}`} className="text-gray-800 hover:text-black font-medium tracking-tight">
                  {p.phone}
                </a>
              </div>
            )}
            {p.email && (
              <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                <span className="font-bold font-modern text-xs text-black w-6">@</span>
                <a href={`mailto:${p.email}`} className="text-gray-800 hover:text-black font-medium tracking-tight truncate max-w-[190px]">
                  {p.email}
                </a>
              </div>
            )}
            {p.website && (
              <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                <span className="font-bold font-modern text-xs text-black w-6">W</span>
                <a href={`https://${p.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black font-medium tracking-tight truncate max-w-[190px]">
                  {p.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {p.linkedin && (
              <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                <span className="font-bold font-modern text-xs text-black w-6">in</span>
                <a href={`https://${p.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black font-medium tracking-tight truncate max-w-[190px]">
                  {p.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {p.github && (
              <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                <span className="font-bold font-modern text-xs text-black w-6">gh</span>
                <a href={`https://${p.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black font-medium tracking-tight truncate max-w-[190px]">
                  {p.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {fullLocation && (
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-black w-6">📍</span>
                <span className="text-gray-700 font-medium tracking-tight text-right truncate max-w-[190px]">
                  {fullLocation}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* SUMMARY & PHOTO */}
        {(p.summary || photoUrl) && (
          <section className="grid grid-cols-12 gap-8 my-6 items-center break-inside-avoid">
            {p.summary && (
              <div className={photoUrl ? 'col-span-8' : 'col-span-12'}>
                <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black mb-2.5">
                  SUMMARY
                </h2>
                <div className="border-l-2 border-black/80 pl-3.5">
                  <p className="font-body text-xs text-gray-700 leading-relaxed text-justify">
                    {p.summary}
                  </p>
                </div>
              </div>
            )}
            {photoUrl && (
              <div className={p.summary ? 'col-span-4 flex justify-end' : 'col-span-12'}>
                <div className="w-32 h-36 sm:w-36 sm:h-40 rounded-lg overflow-hidden border border-gray-300 shadow-sm bg-gray-100">
                  <img src={photoUrl} alt={fullName} className="w-full h-full object-cover grayscale contrast-105" />
                </div>
              </div>
            )}
          </section>
        )}

        {/* 2-COLUMN MAIN BODY */}
        <div className="grid grid-cols-12 gap-8 items-start flex-grow">
          
          {/* LEFT: WORK EXPERIENCE & PROJECTS */}
          <div className="col-span-8 space-y-6">
            {experience.length > 0 && (
              <section className="break-inside-avoid">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black">
                    WORK EXPERIENCE
                  </h2>
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>

                <div className="space-y-4 font-body">
                  {experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="text-xs break-inside-avoid">
                      <h3 className="font-bold text-[12.5px] uppercase tracking-wide text-black font-modern">
                        {exp.title || exp.jobTitle}
                      </h3>
                      <p className="text-[11.5px] font-semibold text-gray-700 mt-0.5">
                        {exp.company} <span className="font-normal text-gray-500">| {exp.startDate} – {exp.endDate || 'Present'}</span>
                      </p>
                      {exp.description && (
                        <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      {exp.achievements?.length > 0 && (
                        <ul className="mt-1 space-y-0.5 pl-3 list-disc text-gray-600 text-[10.5px]">
                          {exp.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <section className="break-inside-avoid">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black">
                    PROJECTS
                  </h2>
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>

                <div className="space-y-2 font-body text-xs">
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="text-[11px] text-gray-700">
                      <span className="font-bold text-black font-modern">{proj.name}: </span>
                      <span>{proj.description} </span>
                      {proj.liveUrl && (
                        <a href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-black font-semibold underline hover:text-gray-600">
                          [link]
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CUSTOM SECTIONS */}
            {customSections?.length > 0 && (
              <section className="break-inside-avoid font-body">
                {customSections.map((sec, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black">{sec.title}</h2>
                      <div className="flex-1 h-[1px] bg-black/20" />
                    </div>
                    {sec.content && <p className="text-xs text-gray-700">{sec.content}</p>}
                    {sec.items?.map((item, j) => (
                      <div key={j} className="text-xs text-gray-700 mb-1">
                        <span className="font-bold text-black">{item.title}: </span>
                        <span>{item.description}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* RIGHT: EDUCATION & SKILLS & EXTRAS */}
          <div className="col-span-4 space-y-6">
            {education.length > 0 && (
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black">
                    EDUCATION
                  </h2>
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>

                <div className="space-y-3 font-body text-xs">
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="break-inside-avoid">
                      <h3 className="font-bold text-[11.5px] text-black font-modern">
                        {edu.degree}
                      </h3>
                      <p className="text-[11px] text-gray-700 mt-0.5">
                        {edu.school || edu.institution}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skillList.length > 0 && (
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black">
                    SKILLS
                  </h2>
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>

                <div className="space-y-2 font-body text-xs">
                  <ul className="space-y-1 pl-3 list-disc text-gray-700 text-[11px]">
                    {skillList.map((sk, i) => <li key={i}>{sk}</li>)}
                  </ul>
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black">CERTIFICATIONS</h2>
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>
                <ul className="space-y-1 pl-3 list-disc text-gray-700 text-[10.5px]">
                  {certifications.map((c, i) => (
                    <li key={i}>{typeof c === 'string' ? c : `${c.name} (${c.issuer || ''})`}</li>
                  ))}
                </ul>
              </section>
            )}

            {languages.length > 0 && (
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black">LANGUAGES</h2>
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>
                <ul className="space-y-1 pl-3 list-disc text-gray-700 text-[10.5px]">
                  {languages.map((l, i) => (
                    <li key={i}>{l.language}: {l.proficiency}</li>
                  ))}
                </ul>
              </section>
            )}

            {awards.length > 0 && (
              <section className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-modern font-bold text-xs uppercase tracking-widest text-black">AWARDS</h2>
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>
                <ul className="space-y-1 pl-3 list-disc text-gray-700 text-[10.5px]">
                  {awards.map((a, i) => (
                    <li key={i}>{a.title}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}