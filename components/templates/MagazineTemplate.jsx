'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function MagazineTemplate(props) {
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-[#F7F5F0] text-[#1A1714] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-normal selection:bg-[#E8E0D2]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-laura { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      <div className="p-10 sm:p-12 min-h-[297mm] flex flex-col justify-between font-laura">
        
        {/* TOP HEADER — Name large, spaced uppercase; subtitle; horizontal rule */}
        <header className="pb-5">
          {/* Name row */}
          <div className="flex items-end justify-between gap-4 mb-2">
            <div>
              {fullName && (
                <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-[0.22em] text-[#1A1714] leading-none m-0">
                  {fullName}
                </h1>
              )}
              {jobTitle && (
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#6C6358] mt-3">
                  {jobTitle}
                </p>
              )}
            </div>
            {photoUrl ? (
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#D8D0C4] shadow-sm bg-stone-200">
                <img src={photoUrl} alt={fullName} className="w-full h-full object-cover object-top" />
              </div>
            ) : null}
          </div>
          {/* Horizontal dividers */}
          <div className="h-[2px] bg-[#1A1714] mt-4 mb-1" />
          <div className="h-[0.5px] bg-[#1A1714] mt-1" />
        </header>

        {/* 2-COLUMN BODY */}
        <div className="grid grid-cols-12 gap-8 my-6 items-start flex-grow">
          
          {/* LEFT COLUMN: CONTACT, SKILLS, EDUCATION, LANGUAGES */}
          <div className="col-span-5 space-y-6">
            
            {/* CONTACT BOX — beige background card */}
            {(p.phone || p.email || fullLocation || p.website || p.linkedin || p.github) && (
              <section className="break-inside-avoid">
                <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">
                    CONTACT
                  </h2>
                </div>
                <div className="space-y-2 text-xs text-[#3A3328]">
                  {p.phone && (
                    <div className="flex items-center gap-2">
                      <IconPhone className="w-3.5 h-3.5 text-[#6C6358] flex-shrink-0" />
                      <a href={`tel:${p.phone}`} className="hover:underline font-medium">{p.phone}</a>
                    </div>
                  )}
                  {p.email && (
                    <div className="flex items-center gap-2">
                      <IconEmail className="w-3.5 h-3.5 text-[#6C6358] flex-shrink-0" />
                      <a href={`mailto:${p.email}`} className="hover:underline font-medium truncate max-w-[170px]">{p.email}</a>
                    </div>
                  )}
                  {fullLocation && (
                    <div className="flex items-start gap-2">
                      <IconLocation className="w-3.5 h-3.5 text-[#6C6358] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{fullLocation}</span>
                    </div>
                  )}
                  {p.website && (
                    <div className="flex items-center gap-2">
                      <IconGlobe className="w-3.5 h-3.5 text-[#6C6358] flex-shrink-0" />
                      <a href={ensureHttps(p.website)} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium truncate max-w-[170px]">{cleanUrl(p.website)}</a>
                    </div>
                  )}
                  {p.linkedin && (
                    <div className="flex items-center gap-2">
                      <IconLinkedIn className="w-3.5 h-3.5 text-[#6C6358] flex-shrink-0" />
                      <a href={ensureHttps(p.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium truncate max-w-[170px]">{cleanUrl(p.linkedin)}</a>
                    </div>
                  )}
                  {p.github && (
                    <div className="flex items-center gap-2">
                      <IconGitHub className="w-3.5 h-3.5 text-[#6C6358] flex-shrink-0" />
                      <a href={ensureHttps(p.github)} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium truncate max-w-[170px]">{cleanUrl(p.github)}</a>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="break-inside-avoid">
                <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">
                    SKILLS
                  </h2>
                </div>
                <ul className="space-y-1.5 text-xs text-[#3A3328] pl-1">
                  {skills.map((skill, idx) => {
                    const name = typeof skill === 'string' ? skill : skill.name;
                    return (
                      <li key={idx} className="font-medium">
                        {name}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <section className="break-inside-avoid">
                <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">
                    EDUCATION
                  </h2>
                </div>
                <div className="space-y-3.5 text-xs">
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="break-inside-avoid">
                      <h3 className="font-bold uppercase tracking-wide text-[#1A1714]">
                        {edu.degree}
                      </h3>
                      <p className="text-[11px] text-[#5E5749] mt-0.5 font-medium">
                        {edu.school || edu.institution}
                      </p>
                      <p className="text-[10.5px] text-[#7C7468]">
                        {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
                      </p>
                      {edu.description && (
                        <p className="text-[11px] text-[#5E5749] mt-0.5 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUAGES & CERTIFICATIONS */}
            {(languages.length > 0 || certifications.length > 0) && (
              <section className="break-inside-avoid space-y-4">
                {languages.length > 0 && (
                  <div>
                    <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">LANGUAGES</h2>
                    </div>
                    <ul className="text-xs text-[#3A3328] space-y-1 font-medium">
                      {languages.map((l, i) => (
                        <li key={i}>{l.language}: <span className="text-[#6C6358] font-normal">{l.proficiency}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                {certifications.length > 0 && (
                  <div>
                    <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">CERTIFICATIONS</h2>
                    </div>
                    <ul className="text-xs text-[#3A3328] space-y-1">
                      {certifications.map((c, i) => (
                        <li key={i}>• {typeof c === 'string' ? c : c.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: PROFILE, EXPERIENCE, PROJECTS, AWARDS */}
          <div className="col-span-7 space-y-6">
            
            {/* PROFILE / SUMMARY */}
            {p.summary && (
              <section className="break-inside-avoid">
                <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">
                    PROFILE
                  </h2>
                </div>
                <p className="text-xs text-[#3D372E] leading-relaxed text-justify">
                  {p.summary}
                </p>
              </section>
            )}

            {/* EXPERIENCE */}
            {experience.length > 0 && (
              <section className="break-inside-avoid">
                <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">
                    EXPERIENCE
                  </h2>
                </div>

                <div className="space-y-5">
                  {experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="text-xs break-inside-avoid">
                      <h3 className="font-bold uppercase tracking-wider text-[#1A1714] text-[12px]">
                        {exp.title || exp.jobTitle}
                      </h3>
                      <p className="font-bold text-[11px] text-[#5E5749] mt-0.5 mb-1.5">
                        {exp.company}{exp.location ? ` / ${exp.location}` : ''} / {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ' – Present'}
                      </p>

                      {exp.description && (
                        <p className="text-[11px] text-[#423B31] leading-relaxed mb-1.5">
                          {exp.description}
                        </p>
                      )}

                      {exp.achievements?.length > 0 && (
                        <ul className="space-y-1 list-disc pl-4 text-[11px] text-[#423B31]">
                          {exp.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                          ))}
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
                <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">PROJECTS</h2>
                </div>
                <div className="space-y-2 text-xs">
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx}>
                      <span className="font-bold text-[#1A1714]">{proj.name}: </span>
                      <span className="text-[#423B31]">{proj.description} </span>
                      {proj.liveUrl && (
                        <a href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#7C7468] font-semibold underline">
                          [view]
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* AWARDS */}
            {awards.length > 0 && (
              <section className="break-inside-avoid">
                <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">AWARDS</h2>
                </div>
                <ul className="text-xs text-[#423B31] space-y-1.5">
                  {awards.map((a, i) => (
                    <li key={i}>
                      <span className="font-bold">{a.title}</span>
                      {(a.organization || a.issuer) && <span className="text-[#7C7468]"> — {a.organization || a.issuer}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* VOLUNTEER & PUBLICATIONS */}
            {(volunteer.length > 0 || publications.length > 0) && (
              <section className="break-inside-avoid space-y-4">
                {volunteer.length > 0 && (
                  <div>
                    <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-2">
                      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">VOLUNTEER</h2>
                    </div>
                    <ul className="text-xs text-[#423B31] space-y-1">
                      {volunteer.map((v, i) => (
                        <li key={i}><span className="font-bold">{v.role}</span> — {v.organization}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {publications.length > 0 && (
                  <div>
                    <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-2">
                      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">PUBLICATIONS</h2>
                    </div>
                    <ul className="text-xs text-[#423B31] space-y-1">
                      {publications.map((pub, i) => (
                        <li key={i}><span className="font-bold">{pub.title}</span> — {pub.publisher}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* CUSTOM SECTIONS */}
            {customSections?.length > 0 && (
              <section className="break-inside-avoid space-y-4">
                {customSections.map((sec, idx) => (
                  <div key={idx}>
                    <div className="bg-[#EDE5D8] px-4 py-2 rounded-sm mb-2">
                      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1714]">{sec.title}</h2>
                    </div>
                    {sec.content && <p className="text-xs text-[#423B31] leading-relaxed">{sec.content}</p>}
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