'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function AcademicTemplate(props) {
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white text-[#222222] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-relaxed selection:bg-gray-800 selection:text-white">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-samira { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      {/* 2-COLUMN FULL HEIGHT LAYOUT */}
      <div className="grid grid-cols-12 min-h-[297mm] font-samira">
        
        {/* LEFT DARK SIDEBAR */}
        <aside className="col-span-5 bg-[#161719] text-white p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-7 relative z-10">
            {/* Circular Photo with White Ring */}
            {photoUrl ? (
              <div className="flex justify-center pt-2">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-[#25262B]">
                  <img src={photoUrl} alt={fullName} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            ) : null}

            {/* ABOUT ME */}
            {p.summary && (
              <section className="break-inside-avoid">
                <h2 className="text-xl font-bold tracking-tight text-white mb-2">
                  About me
                </h2>
                <p className="text-[11.5px] text-[#A5A6AD] leading-relaxed font-normal">
                  {p.summary}
                </p>
              </section>
            )}

            {/* CONTACT */}
            {(p.phone || p.email || fullLocation || p.website || p.linkedin || p.github) && (
              <section className="break-inside-avoid space-y-2">
                <h2 className="text-xl font-bold tracking-tight text-white mb-2">
                  Contact
                </h2>
                <div className="space-y-2 text-[11.5px] text-[#A5A6AD]">
                  {p.phone && (
                    <a href={`tel:${p.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                      <IconPhone className="w-3.5 h-3.5 text-[#6B6D7A] shrink-0" />
                      {p.phone}
                    </a>
                  )}
                  {p.email && (
                    <a href={`mailto:${p.email}`} className="flex items-center gap-2 hover:text-white transition-colors truncate max-w-[190px]">
                      <IconEmail className="w-3.5 h-3.5 text-[#6B6D7A] shrink-0" />
                      {p.email}
                    </a>
                  )}
                  {fullLocation && (
                    <span className="flex items-start gap-2">
                      <IconLocation className="w-3.5 h-3.5 text-[#6B6D7A] shrink-0 mt-0.5" />
                      <span className="leading-snug">{fullLocation}</span>
                    </span>
                  )}
                  {p.linkedin && (
                    <a href={ensureHttps(p.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors truncate max-w-[190px]">
                      <IconLinkedIn className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
                      {cleanUrl(p.linkedin)}
                    </a>
                  )}
                  {p.github && (
                    <a href={ensureHttps(p.github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors truncate max-w-[190px]">
                      <IconGitHub className="w-3.5 h-3.5 text-[#A5A6AD] shrink-0" />
                      {cleanUrl(p.github)}
                    </a>
                  )}
                  {p.website && (
                    <a href={ensureHttps(p.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors truncate max-w-[190px]">
                      <IconGlobe className="w-3.5 h-3.5 text-[#6B6D7A] shrink-0" />
                      {cleanUrl(p.website)}
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* EXPERTISE / SKILLS WITH HORIZONTAL CAPSULES */}
            {skills.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="text-xl font-bold tracking-tight text-white mb-3">
                  Expertise
                </h2>
                <div className="space-y-2.5">
                  {skills.map((skill, index) => {
                    const name = typeof skill === 'string' ? skill : skill.name;
                    return (
                      <div key={index} className="flex items-center justify-between gap-3 text-[11.5px]">
                        <span className="text-[#D1D1D8] font-medium truncate max-w-[110px]">• {name}</span>
                        {/* Horizontal Level Capsule */}
                        <div className="w-20 h-2 bg-[#2D2E33] rounded-full overflow-hidden flex">
                          <div className="h-full bg-white rounded-full w-[80%]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="text-xl font-bold tracking-tight text-white mb-2">
                  Languages
                </h2>
                <div className="space-y-1.5 text-[11.5px] text-[#A5A6AD]">
                  {languages.map((l, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="font-medium text-white">• {l.language}</span>
                      <span className="text-[#8E8E9A]">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Bottom decorative white corner swoosh */}
          <div className="absolute -bottom-6 -left-6 w-32 h-20 bg-white rounded-tr-[50px] pointer-events-none z-0 opacity-90" />
        </aside>

        {/* RIGHT MAIN SECTION */}
        <main className="col-span-7 flex flex-col justify-between bg-white">
          
          {/* TOP DARK HEADER BLOCK */}
          <div className="bg-[#161719] text-white pt-10 pb-8 px-8 sm:px-10 border-b border-[#25262B] flex flex-col items-center justify-center text-center">
            {fullName && (
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white leading-tight m-0">
                {fullName}
              </h1>
            )}
            {fullName && <div className="w-20 h-[2.5px] bg-white my-2.5 rounded-full" />}
            {jobTitle && (
              <p className="text-xs sm:text-sm font-normal text-[#A5A6AD] tracking-widest lowercase">
                {jobTitle}
              </p>
            )}
          </div>

          {/* TIMELINE CONTENT AREA */}
          <div className="p-8 sm:p-10 space-y-8 flex-grow">
            
            {/* EDUCATION TIMELINE */}
            {education.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="text-2xl font-bold tracking-tight text-[#161719] mb-4">
                  Education
                </h2>

                <div className="relative pl-6 space-y-6">
                  {/* Vertical Timeline Line */}
                  <div className="absolute top-2 bottom-2 left-2 w-[1.5px] bg-[#161719]" />

                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="relative break-inside-avoid">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#161719]" />
                      
                      <p className="text-xs font-bold text-[#161719]">
                        {edu.startDate} – {edu.endDate || 'Present'}
                      </p>
                      <h3 className="text-xs font-semibold text-[#333] mt-0.5">
                        {edu.school || edu.institution}
                      </h3>
                      <p className="text-[11px] text-[#666] font-normal">
                        {edu.degree} {edu.location ? `• ${edu.location}` : ''}
                      </p>
                      {edu.description && (
                        <p className="text-[11px] text-[#555] mt-1 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* WORK EXPERIENCE TIMELINE */}
            {experience.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="text-2xl font-bold tracking-tight text-[#161719] mb-4">
                  Work Experience
                </h2>

                <div className="relative pl-6 space-y-6">
                  {/* Vertical Timeline Line */}
                  <div className="absolute top-2 bottom-2 left-2 w-[1.5px] bg-[#161719]" />

                  {experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="relative break-inside-avoid">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#161719]" />

                      <p className="text-xs font-bold text-[#161719]">
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </p>
                      <h3 className="text-xs font-semibold text-[#333] mt-0.5">
                        {exp.title || exp.jobTitle} {exp.company ? `• ${exp.company}` : ''} {exp.location ? `(${exp.location})` : ''}
                      </h3>

                      {exp.description && (
                        <p className="text-[11px] text-[#555] mt-1 leading-relaxed">
                          {exp.description}
                        </p>
                      )}

                      {exp.achievements?.length > 0 && (
                        <ul className="mt-1 space-y-1 list-disc pl-3 text-[11px] text-[#555]">
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
                <h2 className="text-2xl font-bold tracking-tight text-[#161719] mb-3">
                  Projects
                </h2>
                <div className="space-y-3">
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="text-xs">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-[#161719]">{proj.name}</h3>
                        {proj.liveUrl && (
                          <a href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-[10.5px] font-semibold text-black underline">
                            View Link
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-[#555] mt-0.5">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CERTIFICATIONS & AWARDS */}
            {(certifications.length > 0 || awards.length > 0) && (
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 break-inside-avoid pt-1">
                {certifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-[#161719] mb-1.5">Certifications</h3>
                    <ul className="text-xs text-[#555] space-y-1">
                      {certifications.map((c, i) => (
                        <li key={i}>• {typeof c === 'string' ? c : `${c.name} (${c.issuer || ''})`}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {awards.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-[#161719] mb-1.5">Awards</h3>
                    <ul className="text-xs text-[#555] space-y-1">
                      {awards.map((a, i) => (
                        <li key={i}>• {a.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* CUSTOM SECTIONS */}
            {customSections?.length > 0 && (
              <section className="break-inside-avoid space-y-3">
                {customSections.map((sec, idx) => (
                  <div key={idx}>
                    <h2 className="text-2xl font-bold tracking-tight text-[#161719] mb-1">
                      {sec.title}
                    </h2>
                    {sec.content && <p className="text-xs text-[#555] leading-relaxed">{sec.content}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}