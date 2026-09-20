'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function ATSTemplate(props) {
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-[#F9F7F2] text-[#2C241E] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-normal selection:bg-[#C8B8A6]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;0,6..96,900;1,6..96,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-editorial-serif { font-family: 'Bodoni Moda', Georgia, serif; }
        .font-clean { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      {/* Decorative Botanical Arch & Wave */}
      <div className="absolute -top-12 -left-12 w-[340px] h-[340px] bg-[#C8B8A6]/45 rounded-br-[180px] rounded-tr-[120px] rounded-bl-[100px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[380px] h-[340px] bg-[#F4EDE2] rounded-bl-[240px] pointer-events-none z-0 border-b border-l border-[#C8B8A6]/30" />

      {/* Botanical Leaves - Top Left */}
      <div className="absolute top-2 left-4 w-32 h-32 pointer-events-none z-10 opacity-75">
        <svg viewBox="0 0 100 100" fill="none" stroke="#2C241E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 20 Q 35 45 65 30" />
          <path d="M30 32 C 28 20 40 18 40 28 C 40 38 28 32 30 32 Z" fill="#F9F7F2" fillOpacity="0.4" />
          <path d="M45 36 C 45 22 58 24 56 34 C 54 44 45 36 45 36 Z" fill="#F9F7F2" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Botanical Leaves - Bottom Right */}
      <div className="absolute -bottom-6 -right-6 w-56 h-72 pointer-events-none z-0 opacity-80">
        <svg viewBox="0 0 160 220" fill="none" stroke="#2C241E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M90 210 Q 75 140 100 60" />
          <path d="M83 175 C 60 160 65 140 82 155 C 95 168 83 175 83 175 Z" fill="#EDE4D8" fillOpacity="0.5" />
          <path d="M87 145 C 115 130 118 150 93 158 C 80 162 87 145 87 145 Z" fill="#EDE4D8" fillOpacity="0.5" />
        </svg>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 p-10 sm:p-12 min-h-[297mm] flex flex-col justify-between">
        
        {/* HEADER */}
        <header className="grid grid-cols-12 gap-6 items-center pb-6">
          <div className={`${photoUrl ? 'col-span-7' : 'col-span-12'} pt-4`}>
            <h1 className="font-editorial-serif text-4xl sm:text-5xl font-black uppercase tracking-wider text-[#2C241E] leading-[0.95] m-0">
              {firstName || (fullName ? '' : 'YOUR')}
            </h1>
            <div className="font-editorial-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#2C241E] leading-[1.05] mt-1">
              {lastName || (fullName ? '' : 'NAME')}
            </div>
            {jobTitle && (
              <p className="font-clean text-base sm:text-lg text-[#524438] font-normal tracking-wide mt-2">
                {jobTitle}
              </p>
            )}
            {p.summary && (
              <p className="font-clean text-xs text-[#473B32] mt-3 leading-relaxed">
                {p.summary}
              </p>
            )}
          </div>

          {photoUrl ? (
            <div className="col-span-5 relative flex justify-end items-center pr-2">
              <div className="relative w-40 h-40 sm:w-44 sm:h-44">
                <div className="absolute inset-0 rounded-full border-2 border-[#A89685] transform scale-105" />
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#F9F7F2] shadow-lg bg-[#C8B8A6]">
                  <img src={photoUrl} alt={fullName} className="w-full h-full object-cover object-center" />
                </div>
              </div>
            </div>
          ) : null}
        </header>

        {/* 2-COLUMN MAIN BODY */}
        <main className="grid grid-cols-12 gap-8 mt-2 items-start flex-grow">
          
          {/* LEFT COLUMN: EDUCATION, WORK EXPERIENCE, PROJECTS */}
          <div className="col-span-7 space-y-6">
            
            {/* WORK EXPERIENCE */}
            {experience.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-3 bg-[#EDE4D8]/60 shadow-xs">
                  <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">
                    Work Experience
                  </h2>
                </div>

                <div className="space-y-4 font-clean">
                  {experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="text-xs break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[#2C241E] text-[12px]">
                          {exp.company}
                        </h3>
                        <span className="text-[10.5px] font-medium text-[#736355]">
                          {exp.startDate} – {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <h4 className="text-[11px] font-semibold text-[#594B3F] mt-0.5">
                        {exp.title || exp.jobTitle}
                      </h4>
                      {exp.description && (
                        <p className="text-[11px] text-[#473B32] mt-1 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      {exp.achievements?.length > 0 && (
                        <ul className="mt-1 space-y-0.5 pl-3 list-disc text-[#473B32] text-[10.5px]">
                          {exp.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-3 bg-[#EDE4D8]/60 shadow-xs">
                  <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">
                    Education
                  </h2>
                </div>

                <div className="space-y-3 font-clean">
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="text-xs">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[#2C241E] text-xs">
                          {edu.school || edu.institution}
                        </h3>
                        <span className="text-[10.5px] font-medium text-[#736355]">
                          {edu.startDate} – {edu.endDate}
                        </span>
                      </div>
                      <p className="text-[#594B3F] text-[11px] mt-0.5">
                        {edu.degree}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-3 bg-[#EDE4D8]/60 shadow-xs">
                  <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">
                    Projects
                  </h2>
                </div>
                <div className="space-y-2 font-clean text-xs">
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="text-[11px]">
                      <span className="font-bold text-[#2C241E]">{proj.name}: </span>
                      <span className="text-[#473B32]">{proj.description}</span>
                      {proj.liveUrl && (
                        <a href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="ml-1 text-[#8C7A6B] font-semibold underline">
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
              <section className="break-inside-avoid font-clean">
                {customSections.map((sec, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-2 bg-[#EDE4D8]/60 shadow-xs">
                      <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">{sec.title}</h2>
                    </div>
                    {sec.content && <p className="text-[11px] text-[#473B32] leading-relaxed">{sec.content}</p>}
                    {sec.items?.map((item, j) => (
                      <div key={j} className="text-[11px] text-[#473B32] mb-1">
                        <span className="font-bold text-[#2C241E]">{item.title}: </span>
                        <span>{item.description}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: SKILLS, CONTACT, CERTIFICATIONS, LANGUAGES */}
          <div className="col-span-5 space-y-6 pl-2">
            
            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-3 bg-[#EDE4D8]/60 shadow-xs">
                  <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">
                    Skills
                  </h2>
                </div>
                <ul className="font-clean space-y-1.5 text-xs text-[#2C241E]">
                  {skills.map((skill, index) => {
                    const name = typeof skill === 'string' ? skill : skill.name;
                    return (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2C241E]" />
                        <span className="text-[11px] font-medium">{name}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* CONTACT ME */}
            {(p.phone || p.email || p.website || p.linkedin || p.github || fullLocation) && (
              <section className="break-inside-avoid">
                <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-3 bg-[#EDE4D8]/60 shadow-xs">
                  <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">
                    Contact Me
                  </h2>
                </div>

                <div className="font-clean space-y-2.5 text-xs text-[#2C241E]">
                  {p.phone && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs">📞</span>
                      <a href={`tel:${p.phone}`} className="hover:underline text-[11px] font-medium text-[#2C241E]">{p.phone}</a>
                    </div>
                  )}
                  {p.email && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs">✉</span>
                      <a href={`mailto:${p.email}`} className="hover:underline text-[11px] font-medium text-[#2C241E] truncate max-w-[170px]">{p.email}</a>
                    </div>
                  )}
                  {p.website && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🌐</span>
                      <a href={`https://${p.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-[11px] font-medium text-[#2C241E] truncate max-w-[170px]">{p.website}</a>
                    </div>
                  )}
                  {p.linkedin && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">in</span>
                      <a href={`https://${p.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-[11px] font-medium text-[#2C241E] truncate max-w-[170px]">{p.linkedin}</a>
                    </div>
                  )}
                  {p.github && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">⌨</span>
                      <a href={`https://${p.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-[11px] font-medium text-[#2C241E] truncate max-w-[170px]">{p.github}</a>
                    </div>
                  )}
                  {fullLocation && (
                    <div className="flex items-start gap-2">
                      <span className="text-xs">📍</span>
                      <span className="text-[11px] font-medium text-[#2C241E]">{fullLocation}</span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* CERTIFICATIONS */}
            {certifications.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-2 bg-[#EDE4D8]/60 shadow-xs">
                  <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">Certifications</h2>
                </div>
                <ul className="font-clean space-y-1 text-[11px] text-[#2C241E]">
                  {certifications.map((c, i) => (
                    <li key={i}>• {typeof c === 'string' ? c : `${c.name} (${c.issuer || ''})`}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-2 bg-[#EDE4D8]/60 shadow-xs">
                  <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">Languages</h2>
                </div>
                <ul className="font-clean space-y-1 text-[11px] text-[#2C241E]">
                  {languages.map((l, i) => (
                    <li key={i}>• {l.language} ({l.proficiency})</li>
                  ))}
                </ul>
              </section>
            )}

            {/* AWARDS */}
            {awards.length > 0 && (
              <section className="break-inside-avoid">
                <div className="inline-block border border-[#8C7A6B] rounded-full px-5 py-1 mb-2 bg-[#EDE4D8]/60 shadow-xs">
                  <h2 className="font-clean font-bold text-xs uppercase tracking-widest text-[#2C241E]">Awards</h2>
                </div>
                <ul className="font-clean space-y-1 text-[11px] text-[#2C241E]">
                  {awards.map((a, i) => (
                    <li key={i}>• {a.title}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
