'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function DeveloperTemplate(props) {
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-[#F4F4F6] text-[#222222] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-relaxed selection:bg-[#FFD026]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Cabinet+Grotesk:wght@800;900&display=swap');
        .font-cabinet { font-family: 'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      {/* Confetti Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80">
        <span className="absolute top-6 left-12 w-3 h-3 rounded-full bg-[#182672]" />
        <span className="absolute top-16 left-6 w-4 h-4 rounded-full bg-[#182672]" />
        <span className="absolute top-24 left-20 w-2.5 h-2.5 rounded-full bg-[#FFD026]" />
        <span className="absolute top-36 left-4 w-3.5 h-3.5 rounded-full bg-[#182672]" />
        <span className="absolute top-8 right-32 w-3.5 h-3.5 rounded-full bg-[#182672]" />
        <span className="absolute top-5 right-20 w-2.5 h-2.5 rounded-full bg-[#FFD026]" />
        <span className="absolute top-14 right-10 w-4 h-4 rounded-full bg-[#182672]" />
      </div>

      <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-between min-h-[297mm]">
        {/* HEADER */}
        <header className="grid grid-cols-12 gap-6 items-start">
          {photoUrl ? (
            <div className="col-span-4 relative flex justify-center">
              <div className="absolute -top-2 -left-2 w-44 h-60 bg-[#FFD026] rounded-[48%_52%_60%_40%/50%_45%_55%_50%] transform -rotate-6 z-0" />
              <div className="relative z-10 w-40 h-56 rounded-t-[60px] rounded-b-[35px] overflow-hidden border-4 border-white shadow-md bg-white">
                <img src={photoUrl} alt={fullName} className="w-full h-full object-cover object-top" />
              </div>
            </div>
          ) : null}

          <div className={`${photoUrl ? 'col-span-8 pl-2' : 'col-span-12'} flex flex-col justify-between`}>
            <div>
              <h1 className="font-cabinet text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#182672] leading-[0.9] m-0">
                {firstName || (fullName ? '' : 'YOUR')}
              </h1>
              <div className="font-cabinet text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#FFD026] leading-[0.9] mt-1 -ml-0.5">
                {lastName || (fullName ? '' : 'NAME')}
              </div>
              {jobTitle && (
                <div className="font-cabinet font-extrabold text-sm sm:text-base text-[#182672] mt-2 tracking-widest uppercase">
                  {jobTitle}
                </div>
              )}
            </div>

            {p.summary && (
              <section className="mt-4">
                <div className="inline-block relative mb-2">
                  <span className="relative z-10 font-cabinet font-black text-base text-[#182672] px-2.5 py-0.5 uppercase tracking-wide">
                    About Me
                  </span>
                  <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0 shadow-sm" />
                </div>
                <p className="font-jakarta text-xs sm:text-[12.5px] text-[#2c2c2c] leading-relaxed text-justify">
                  {p.summary}
                </p>
              </section>
            )}
          </div>
        </header>

        {/* CONTACT ROW */}
        {(p.email || p.phone || fullLocation || p.website || p.linkedin || p.github || p.nationality || p.dob) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 bg-white/90 rounded-2xl border border-[#182672]/10 font-jakarta text-[11px] font-semibold text-[#182672]">
            {p.email && (
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#EA4335]">✉</span>
                <a href={`mailto:${p.email}`} className="text-gray-800 hover:text-[#182672] truncate">{p.email}</a>
              </div>
            )}
            {p.phone && (
              <div className="flex items-center gap-2 truncate">
                <span className="text-green-600">📞</span>
                <a href={`tel:${p.phone}`} className="text-gray-800 hover:text-[#182672]">{p.phone}</a>
              </div>
            )}
            {fullLocation && (
              <div className="flex items-center gap-2 truncate">
                <span className="text-red-500">📍</span>
                <span className="text-gray-800 truncate">{fullLocation}</span>
              </div>
            )}
            {p.website && (
              <div className="flex items-center gap-2 truncate">
                <span className="text-pink-500">🌐</span>
                <a href={`https://${p.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#182672] truncate">{p.website}</a>
              </div>
            )}
            {p.linkedin && (
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#0A66C2]">in</span>
                <a href={`https://${p.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#182672] truncate">{p.linkedin}</a>
              </div>
            )}
            {p.github && (
              <div className="flex items-center gap-2 truncate">
                <span className="text-black">⌨</span>
                <a href={`https://${p.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#182672] truncate">{p.github}</a>
              </div>
            )}
            {p.dob && <div className="text-gray-700 truncate">🎂 {p.dob}</div>}
            {p.nationality && <div className="text-gray-700 truncate">🌍 {p.nationality}</div>}
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section className="my-3 break-inside-avoid">
            <div className="inline-block relative mb-2">
              <span className="relative z-10 font-cabinet font-black text-base text-[#182672] px-3 py-0.5 uppercase tracking-wide">
                Education
              </span>
              <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0 shadow-sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-jakarta">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} className="bg-white/80 p-3 rounded-xl border border-gray-200">
                  <span className="text-[10.5px] font-bold text-[#182672] bg-[#FFD026]/30 px-2 py-0.5 rounded">
                    {edu.startDate} – {edu.endDate || 'Present'}
                  </span>
                  <h3 className="font-bold text-xs text-[#182672] mt-1">{edu.degree}</h3>
                  <h4 className="text-[11px] font-semibold text-gray-700">{edu.school || edu.institution}</h4>
                  {edu.description && <p className="text-[10.5px] text-gray-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <section className="my-3 break-inside-avoid">
            <div className="inline-block relative mb-2">
              <span className="relative z-10 font-cabinet font-black text-base text-[#182672] px-3 py-0.5 uppercase tracking-wide">
                Skills & Technologies
              </span>
              <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0 shadow-sm" />
            </div>
            <div className="flex flex-wrap gap-2 py-1">
              {skills.map((skill, index) => {
                const name = typeof skill === 'string' ? skill : skill.name;
                return (
                  <div key={index} className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-[#182672]/15 shadow-xs font-jakarta">
                    <span className="w-2 h-2 rounded-full bg-[#FFD026]" />
                    <span className="text-xs font-bold text-gray-800">{name}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <section className="my-3 break-inside-avoid">
            <div className="inline-block relative mb-2">
              <span className="relative z-10 font-cabinet font-black text-base text-[#182672] px-3 py-0.5 uppercase tracking-wide">
                Experience
              </span>
              <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0 shadow-sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-jakarta">
              {experience.map((exp, index) => (
                <div key={exp.id || index} className="bg-white/80 p-3.5 rounded-xl border border-gray-200 shadow-xs break-inside-avoid">
                  <span className="text-[10.5px] font-bold text-[#182672] bg-[#FFD026]/30 px-2 py-0.5 rounded">
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </span>
                  <h3 className="font-bold text-xs text-[#182672] mt-1">{exp.title || exp.jobTitle}</h3>
                  <h4 className="text-[11px] font-semibold text-gray-700 mb-1">{exp.company}</h4>
                  {exp.description && <p className="text-[11px] text-gray-600 leading-relaxed">{exp.description}</p>}
                  {exp.achievements?.length > 0 && (
                    <ul className="mt-1 pl-3.5 list-disc text-[10.5px] text-gray-600 space-y-0.5">
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
          <section className="my-3 break-inside-avoid font-jakarta">
            <div className="inline-block relative mb-2">
              <span className="relative z-10 font-cabinet font-black text-base text-[#182672] px-3 py-0.5 uppercase tracking-wide">
                Projects
              </span>
              <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0 shadow-sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj, i) => (
                <div key={proj.id || i} className="bg-white p-3 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs text-[#182672]">{proj.name}</h3>
                    {proj.liveUrl && (
                      <a href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-[10.5px] text-[#182672] font-bold underline">
                        View
                      </a>
                    )}
                  </div>
                  {proj.description && <p className="text-[10.5px] text-gray-600 mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS & LANGUAGES */}
        {(certifications.length > 0 || languages.length > 0 || awards.length > 0) && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 break-inside-avoid font-jakarta">
            {certifications.length > 0 && (
              <div>
                <div className="inline-block relative mb-1.5">
                  <span className="relative z-10 font-cabinet font-black text-sm text-[#182672] px-2.5 py-0.5 uppercase">Certifications</span>
                  <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0" />
                </div>
                <ul className="text-[10.5px] text-gray-800 space-y-1">
                  {certifications.map((c, i) => (
                    <li key={i} className="font-semibold">• {typeof c === 'string' ? c : `${c.name} (${c.issuer || ''})`}</li>
                  ))}
                </ul>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <div className="inline-block relative mb-1.5">
                  <span className="relative z-10 font-cabinet font-black text-sm text-[#182672] px-2.5 py-0.5 uppercase">Languages</span>
                  <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0" />
                </div>
                <ul className="text-[10.5px] text-gray-800 space-y-1">
                  {languages.map((l, i) => (
                    <li key={i} className="font-semibold">• {l.language}: <span className="font-normal text-gray-600">{l.proficiency}</span></li>
                  ))}
                </ul>
              </div>
            )}
            {awards.length > 0 && (
              <div>
                <div className="inline-block relative mb-1.5">
                  <span className="relative z-10 font-cabinet font-black text-sm text-[#182672] px-2.5 py-0.5 uppercase">Awards</span>
                  <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0" />
                </div>
                <ul className="text-[10.5px] text-gray-800 space-y-1">
                  {awards.map((a, i) => (
                    <li key={i} className="font-semibold">• {a.title} ({a.organization || a.issuer})</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections?.length > 0 && (
          <section className="mt-3 break-inside-avoid font-jakarta">
            {customSections.map((sec, i) => (
              <div key={sec.id || i} className="mb-3">
                <div className="inline-block relative mb-1.5">
                  <span className="relative z-10 font-cabinet font-black text-sm text-[#182672] px-2.5 py-0.5 uppercase">{sec.title}</span>
                  <span className="absolute inset-0 bg-[#FFD026] rounded-full transform -rotate-1 z-0" />
                </div>
                {sec.content && <p className="text-xs text-gray-700 leading-relaxed">{sec.content}</p>}
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
    </div>
  );
}