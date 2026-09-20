'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function StartupTemplate(props) {
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-[#FAFBFB] text-[#1C3738] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-normal selection:bg-[#2A9D8F] selection:text-white">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .font-garnier { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      {/* TOP GEOMETRIC ACCENT BANNER */}
      <div className="absolute top-0 left-0 w-80 h-48 bg-gradient-to-br from-[#1C3738] to-[#255C58] transform -skew-y-6 -translate-y-12 -translate-x-12 pointer-events-none z-0" />

      {/* BOTTOM GEOMETRIC MOUNTAIN PEAKS */}
      <div className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-0 overflow-hidden opacity-90">
        <svg viewBox="0 0 1200 240" className="w-full h-full object-cover" preserveAspectRatio="none">
          <polygon points="0,240 180,120 360,240" fill="#E5B299" fillOpacity="0.55" />
          <polygon points="260,240 480,90 700,240" fill="#F4A261" fillOpacity="0.5" />
          <polygon points="620,240 850,70 1080,240" fill="#DF7760" fillOpacity="0.6" />
          <polygon points="900,240 1080,110 1200,240" fill="#255C58" fillOpacity="0.4" />
        </svg>
      </div>

      <div className="relative z-10 p-8 sm:p-10 min-h-[297mm] flex flex-col justify-between font-garnier">
        
        {/* HEADER */}
        <header className="grid grid-cols-12 gap-6 items-center pb-5 border-b border-[#1C3738]/15">
          {/* Photo */}
          {photoUrl ? (
            <div className="col-span-4 relative flex justify-start pl-2">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-stone-200 relative z-10">
                <img src={photoUrl} alt={fullName} className="w-full h-full object-cover object-top" />
              </div>
            </div>
          ) : null}

          {/* Name, Title, Contact Bar & Profile Quote */}
          <div className={`${photoUrl ? 'col-span-8' : 'col-span-12'} flex flex-col justify-center space-y-2`}>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C3738] leading-tight m-0">
                {firstName} <span className="font-black uppercase">{lastName}</span>
              </h1>
              {jobTitle && (
                <p className="text-sm sm:text-base font-bold text-[#234E52] tracking-wide mt-0.5">
                  {jobTitle}
                </p>
              )}
            </div>

            {/* Horizontal Contact Strip */}
            {(p.phone || p.email || fullLocation || p.website || p.linkedin) && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#1C3738] font-medium pt-1">
                {p.phone && (
                  <a href={`tel:${p.phone}`} className="flex items-center gap-1.5 hover:text-[#255C58]">
                    <IconPhone className="w-3.5 h-3.5 text-[#4A5D5E] shrink-0" />{p.phone}
                  </a>
                )}
                {p.email && (
                  <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 hover:text-[#255C58] truncate max-w-[170px]">
                    <IconEmail className="w-3.5 h-3.5 text-[#4A5D5E] shrink-0" />{p.email}
                  </a>
                )}
                {fullLocation && (
                  <span className="flex items-center gap-1.5">
                    <IconLocation className="w-3.5 h-3.5 text-[#4A5D5E] shrink-0" />
                    <span className="truncate max-w-[200px]">{fullLocation}</span>
                  </span>
                )}
                {p.linkedin && (
                  <a href={ensureHttps(p.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#255C58] truncate max-w-[170px] text-[#0A66C2]">
                    <IconLinkedIn className="w-3.5 h-3.5 shrink-0" />{cleanUrl(p.linkedin)}
                  </a>
                )}
                {p.github && (
                  <a href={ensureHttps(p.github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#255C58] truncate max-w-[170px]">
                    <IconGitHub className="w-3.5 h-3.5 shrink-0" />{cleanUrl(p.github)}
                  </a>
                )}
                {p.website && (
                  <a href={ensureHttps(p.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#255C58] truncate max-w-[170px]">
                    <IconGlobe className="w-3.5 h-3.5 text-[#4A5D5E] shrink-0" />{cleanUrl(p.website)}
                  </a>
                )}
              </div>
            )}

            {/* Profile Quote */}
            {p.summary && (
              <p className="text-xs italic text-[#4A5D5E] leading-relaxed pt-1">
                « {p.summary} »
              </p>
            )}
          </div>
        </header>

        {/* INFOGRAPHIC CAREER ROADMAP & EDUCATION JOURNEY */}
        {(experience.length > 0 || education.length > 0) && (
          <section className="my-6 break-inside-avoid relative">
            
            {/* Connecting Zigzag Roadmap Line Overlay */}
            <div className="relative py-4">
              
              {/* Experiences (Upper Tier Nodes with Briefcase 💼) */}
              {experience.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#1C3738] text-white flex items-center justify-center text-xs">💼</span>
                    <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#1C3738]">
                      WORK EXPERIENCE
                    </h2>
                    <span className="flex-1 h-[1px] bg-[#1C3738]/20" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {experience.map((exp, idx) => (
                      <div
                        key={exp.id || idx}
                        className="bg-white/90 p-4 rounded-xl border border-[#1C3738]/15 shadow-sm relative overflow-hidden break-inside-avoid"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] font-bold text-[#234E52]">
                            {exp.startDate} – {exp.endDate || 'Present'}
                          </span>
                          <span className="w-6 h-6 rounded-full bg-[#1C3738] text-white flex items-center justify-center text-[11px]">💼</span>
                        </div>
                        <h3 className="font-bold text-xs text-[#1C3738] leading-snug">
                          {exp.title || exp.jobTitle}
                        </h3>
                        <p className="text-[11px] italic text-[#5E7273] mb-1.5">
                          {exp.company} {exp.location ? `• ${exp.location}` : ''}
                        </p>
                        {exp.description && (
                          <p className="text-[10.5px] text-[#3D4F50] leading-relaxed">{exp.description}</p>
                        )}
                        {exp.achievements?.length > 0 && (
                          <ul className="mt-1 space-y-0.5 list-disc pl-3 text-[10.5px] text-[#3D4F50]">
                            {exp.achievements.map((ach, i) => (
                              <li key={i}>{ach}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education (Lower Tier Nodes with Graduation Cap 🎓) */}
              {education.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#DF7760] text-white flex items-center justify-center text-xs">🎓</span>
                    <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#DF7760]">
                      EDUCATION & DEGREES
                    </h2>
                    <span className="flex-1 h-[1px] bg-[#DF7760]/30" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {education.map((edu, idx) => (
                      <div
                        key={edu.id || idx}
                        className="bg-white/90 p-4 rounded-xl border border-[#DF7760]/25 shadow-sm relative overflow-hidden break-inside-avoid"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] font-bold text-[#DF7760]">
                            {edu.startDate} – {edu.endDate || 'Present'}
                          </span>
                          <span className="w-6 h-6 rounded-full bg-[#DF7760] text-white flex items-center justify-center text-[11px]">🎓</span>
                        </div>
                        <h3 className="font-bold text-xs text-[#1C3738] leading-snug">
                          {edu.degree}
                        </h3>
                        <p className="text-[11px] italic text-[#5E7273]">
                          {edu.school || edu.institution} {edu.location ? `• ${edu.location}` : ''}
                        </p>
                        {edu.description && (
                          <p className="text-[10.5px] text-[#3D4F50] mt-1 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* BOTTOM MATRIX: SKILLS, LANGUAGES, PROJECTS, CERTIFICATIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-2 break-inside-avoid relative z-10">
          
          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C3738] border-b border-[#1C3738]/20 pb-1">
                Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} className="text-[10.5px] font-bold px-2.5 py-0.5 bg-[#255C58]/15 text-[#1C3738] rounded-md">
                    {typeof s === 'string' ? s : s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES & CERTIFICATIONS */}
          {(languages.length > 0 || certifications.length > 0) && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C3738] border-b border-[#1C3738]/20 pb-1">
                Languages & Certifications
              </h3>
              <ul className="text-[11px] text-[#2C3F40] space-y-1 font-medium">
                {languages.map((l, i) => (
                  <li key={i}>🌐 {l.language}: <span className="text-[#5E7273]">{l.proficiency}</span></li>
                ))}
                {certifications.map((c, i) => (
                  <li key={i}>📜 {typeof c === 'string' ? c : c.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* PROJECTS & AWARDS */}
          {(projects.length > 0 || awards.length > 0) && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C3738] border-b border-[#1C3738]/20 pb-1">
                Projects & Awards
              </h3>
              <ul className="text-[11px] text-[#2C3F40] space-y-1">
                {projects.map((proj, i) => (
                  <li key={i}>
                    <span className="font-bold">{proj.name}: </span>
                    <span className="text-[#5E7273]">{proj.description}</span>
                  </li>
                ))}
                {awards.map((a, i) => (
                  <li key={i}>🏆 {a.title}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* CUSTOM SECTIONS */}
        {customSections?.length > 0 && (
          <section className="mt-3 break-inside-avoid space-y-2 relative z-10">
            {customSections.map((sec, idx) => (
              <div key={idx} className="bg-white/90 p-3 rounded-xl border border-gray-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C3738] mb-1">{sec.title}</h3>
                {sec.content && <p className="text-xs text-[#3D4F50]">{sec.content}</p>}
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  );
}