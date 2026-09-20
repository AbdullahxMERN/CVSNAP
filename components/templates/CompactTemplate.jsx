'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function CompactTemplate(props) {
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white text-[#2B2B2B] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-relaxed selection:bg-[#EAE8F5]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-signature { font-family: 'Alex Brush', cursive; }
        .font-parisian { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      {/* TOP LAVENDER-GREY HEADER BANNER */}
      <header className="bg-[#ECEAF2] border-b border-[#D8D4E2] px-8 sm:px-12 py-8 flex items-center gap-8">
        {photoUrl ? (
          <div className="flex-shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-stone-200">
              <img src={photoUrl} alt={fullName} className="w-full h-full object-cover object-top" />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col justify-center">
          {/* Cursive Signature Name */}
          <h1 className="font-signature text-5xl sm:text-6xl text-[#1E1B24] leading-tight tracking-normal m-0">
            {fullName}
          </h1>
          {jobTitle && (
            <p className="font-parisian text-xs sm:text-sm uppercase tracking-[0.25em] text-[#635E6D] font-bold mt-1">
              {jobTitle}
            </p>
          )}
        </div>
      </header>

      {/* 2-COLUMN BODY */}
      <div className="grid grid-cols-12 min-h-[230mm] font-parisian">
        
        {/* LEFT SIDEBAR */}
        <aside className="col-span-4 bg-[#F8F7FA] border-r border-[#E8E5EE] p-6 sm:p-7 space-y-6">
          
          {/* CONTACT */}
          {(p.phone || p.email || fullLocation || p.linkedin || p.website || p.github) && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-3 pb-1 border-b border-[#DCD7E5]">
                CONTACT
              </h2>
              <div className="space-y-2.5 text-[11px] text-[#554F62]">
                {fullLocation && (
                  <div className="flex items-start gap-2">
                    <IconLocation className="w-3.5 h-3.5 mt-0.5 text-[#7C748C] shrink-0" />
                    <span className="leading-snug">{fullLocation}</span>
                  </div>
                )}
                {p.phone && (
                  <div className="flex items-center gap-2">
                    <IconPhone className="w-3.5 h-3.5 text-[#7C748C] shrink-0" />
                    <a href={`tel:${p.phone}`} className="hover:text-black font-medium">{p.phone}</a>
                  </div>
                )}
                {p.email && (
                  <div className="flex items-center gap-2">
                    <IconEmail className="w-3.5 h-3.5 text-[#7C748C] shrink-0" />
                    <a href={`mailto:${p.email}`} className="hover:text-black font-medium truncate max-w-[150px]">{p.email}</a>
                  </div>
                )}
                {p.linkedin && (
                  <div className="flex items-center gap-2">
                    <IconLinkedIn className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
                    <a href={ensureHttps(p.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-black font-medium truncate max-w-[150px] text-[#0A66C2]">
                      {cleanUrl(p.linkedin)}
                    </a>
                  </div>
                )}
                {p.website && (
                  <div className="flex items-center gap-2">
                    <IconGlobe className="w-3.5 h-3.5 text-[#7C748C] shrink-0" />
                    <a href={ensureHttps(p.website)} target="_blank" rel="noopener noreferrer" className="hover:text-black font-medium truncate max-w-[150px]">
                      {cleanUrl(p.website)}
                    </a>
                  </div>
                )}
                {p.github && (
                  <div className="flex items-center gap-2">
                    <IconGitHub className="w-3.5 h-3.5 text-[#7C748C] shrink-0" />
                    <a href={ensureHttps(p.github)} target="_blank" rel="noopener noreferrer" className="hover:text-black font-medium truncate max-w-[150px]">
                      {cleanUrl(p.github)}
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-3 pb-1 border-b border-[#DCD7E5]">
                SKILLS
              </h2>
              <ul className="space-y-1.5 text-[11px] text-[#4A4556]">
                {skills.map((skill, index) => {
                  const name = typeof skill === 'string' ? skill : skill.name;
                  return (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C748C]" />
                      <span>{name}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-3 pb-1 border-b border-[#DCD7E5]">
                LANGUAGES
              </h2>
              <ul className="space-y-1.5 text-[11px] text-[#4A4556]">
                {languages.map((l, i) => (
                  <li key={i}>
                    <span className="font-bold text-[#2A2633]">{l.language} :</span>{' '}
                    <span className="text-[#645E70]">{l.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* INTERESTS */}
          {interests.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-3 pb-1 border-b border-[#DCD7E5]">
                INTERESTS
              </h2>
              <ul className="space-y-1 text-[11px] text-[#554F62]">
                {interests.map((it, i) => (
                  <li key={i}>{typeof it === 'string' ? it : it.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-3 pb-1 border-b border-[#DCD7E5]">
                CERTIFICATIONS
              </h2>
              <ul className="space-y-1.5 text-[11px] text-[#4A4556]">
                {certifications.map((c, i) => (
                  <li key={i} className="leading-snug">
                    <p className="font-bold text-[#2A2633]">{typeof c === 'string' ? c : c.name}</p>
                    {c.issuer && <p className="text-[10px] text-[#7A7488]">{c.issuer}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className="col-span-8 p-6 sm:p-8 space-y-6">
          
          {/* PROFILE / SUMMARY */}
          {p.summary && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-2.5 pb-1 border-b border-gray-200">
                PROFILE
              </h2>
              <p className="text-xs text-[#443F4D] leading-relaxed text-justify">
                {p.summary}
              </p>
            </section>
          )}

          {/* WORK EXPERIENCE */}
          {experience.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-3 pb-1 border-b border-gray-200">
                WORK EXPERIENCE
              </h2>

              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="text-xs break-inside-avoid">
                    <h3 className="font-bold text-[12.5px] uppercase tracking-wide text-[#1E1B24]">
                      {exp.title || exp.jobTitle}
                    </h3>
                    <p className="italic text-[#6B6577] text-[11px] mt-0.5 mb-1.5">
                      {exp.company} {exp.location ? `/ ${exp.location}` : ''} / {exp.startDate} – {exp.endDate || 'Present'}
                    </p>

                    {exp.description && (
                      <p className="text-[11px] text-[#443F4D] leading-relaxed mb-1.5">
                        {exp.description}
                      </p>
                    )}

                    {exp.achievements?.length > 0 && (
                      <ul className="space-y-1 list-disc pl-4 text-[11px] text-[#443F4D]">
                        {exp.achievements.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
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
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-3 pb-1 border-b border-gray-200">
                EDUCATION
              </h2>

              <div className="space-y-3.5">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="text-xs break-inside-avoid">
                    <h3 className="italic font-medium text-[12px] text-[#1E1B24]">
                      {edu.degree}
                    </h3>
                    <p className="text-[#6B6577] text-[11px] mt-0.5">
                      {edu.school || edu.institution} {edu.location ? `, ${edu.location}` : ''} {edu.startDate ? `, ${edu.startDate}` : ''} {edu.endDate ? `– ${edu.endDate}` : ''}
                    </p>
                    {edu.description && (
                      <p className="text-[10.5px] text-gray-600 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-2.5 pb-1 border-b border-gray-200">
                PROJECTS
              </h2>
              <div className="space-y-2 text-xs">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="text-[11px]">
                    <span className="font-bold text-[#1E1B24]">{proj.name}: </span>
                    <span className="text-[#443F4D]">{proj.description} </span>
                    {proj.liveUrl && (
                      <a href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#7C748C] font-semibold underline">
                        [lien]
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
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-2 pb-1 border-b border-gray-200">
                AWARDS & HONORS
              </h2>
              <ul className="text-xs text-[#443F4D] space-y-1">
                {awards.map((a, i) => (
                  <li key={i}>• <span className="font-bold">{a.title}</span> ({a.organization || a.issuer})</li>
                ))}
              </ul>
            </section>
          )}

          {/* VOLUNTEER & PUBLICATIONS */}
          {(volunteer.length > 0 || publications.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 break-inside-avoid">
              {volunteer.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-1.5 pb-1 border-b border-gray-200">
                    VOLUNTEER
                  </h2>
                  <ul className="text-xs text-[#443F4D] space-y-1">
                    {volunteer.map((v, i) => (
                      <li key={i}>• {v.role} ({v.organization})</li>
                    ))}
                  </ul>
                </div>
              )}
              {publications.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-1.5 pb-1 border-b border-gray-200">
                    PUBLICATIONS
                  </h2>
                  <ul className="text-xs text-[#443F4D] space-y-1">
                    {publications.map((pItem, i) => (
                      <li key={i}>• {pItem.title} ({pItem.publisher})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* CUSTOM SECTIONS */}
          {customSections?.length > 0 && (
            <section className="break-inside-avoid space-y-3">
              {customSections.map((sec, idx) => (
                <div key={idx}>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#342F3E] mb-1.5 pb-1 border-b border-gray-200">
                    {sec.title}
                  </h2>
                  {sec.content && <p className="text-xs text-[#443F4D] leading-relaxed">{sec.content}</p>}
                </div>
              ))}
            </section>
          )}
        </main>

      </div>
    </div>
  );
}