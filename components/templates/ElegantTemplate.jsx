'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function ElegantTemplate(props) {
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
  const midIndex = Math.ceil(skillList.length / 2);
  const leftSkills = skillList.slice(0, midIndex);
  const rightSkills = skillList.slice(midIndex);

  const fullLocation = [p.address, p.city, p.postalCode, p.country, p.location].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(', ');

  return (
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-[#F5F4EF] text-[#222222] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-normal selection:bg-[#FEE2E2]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Alex+Brush&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .font-display-anton { font-family: 'Anton', Impact, sans-serif; }
        ${PRINT_CSS}
        .font-script-alex { font-family: 'Alex Brush', cursive; }
        .font-editorial { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div className="p-10 sm:p-12 min-h-[297mm] flex flex-col justify-between">
        
        {/* TOP METADATA BAR */}
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#444] pb-4">
          <span>[ RESUME ]</span>
          <span className="text-[#222] font-black">{jobTitle}</span>
        </div>

        {/* HEADER */}
        <header className="grid grid-cols-12 gap-6 items-start pb-6">
          <div className={`${photoUrl ? 'col-span-8' : 'col-span-12'} flex flex-col justify-between h-full pt-2`}>
            <div className="relative select-none">
              <h1 className="font-display-anton text-6xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#BA1D24] leading-none m-0">
                {firstName || (fullName ? '' : 'YOUR')}
              </h1>
              <div className="font-script-alex text-6xl sm:text-7xl text-[#BA1D24] -mt-5 sm:-mt-7 ml-10 sm:ml-14 leading-none tracking-normal drop-shadow-xs">
                {lastName || (fullName ? '' : 'NAME')}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-2 font-editorial text-xs">
              {p.phone && (
                <div>
                  <span className="font-bold text-[#BA1D24] block uppercase tracking-wider text-[10.5px]">PHONE</span>
                  <a href={`tel:${p.phone}`} className="text-gray-800 hover:text-[#BA1D24] font-medium tracking-tight">
                    [ {p.phone} ]
                  </a>
                </div>
              )}
              {p.email && (
                <div>
                  <span className="font-bold text-[#BA1D24] block uppercase tracking-wider text-[10.5px]">EMAIL</span>
                  <a href={`mailto:${p.email}`} className="text-gray-800 hover:text-[#BA1D24] font-medium tracking-tight truncate block max-w-[170px]">
                    {p.email}
                  </a>
                </div>
              )}
              {p.website && (
                <div>
                  <span className="font-bold text-[#BA1D24] block uppercase tracking-wider text-[10.5px]">WEBSITE</span>
                  <a href={`https://${p.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#BA1D24] font-medium tracking-tight truncate block max-w-[170px]">
                    {p.website.toUpperCase().replace(/^HTTPS?:\/\//, '')}
                  </a>
                </div>
              )}
              {p.linkedin && (
                <div>
                  <span className="font-bold text-[#BA1D24] block uppercase tracking-wider text-[10.5px]">LINKEDIN</span>
                  <a href={`https://${p.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#BA1D24] font-medium tracking-tight truncate block max-w-[170px]">
                    {p.linkedin}
                  </a>
                </div>
              )}
              {p.github && (
                <div>
                  <span className="font-bold text-[#BA1D24] block uppercase tracking-wider text-[10.5px]">GITHUB</span>
                  <a href={`https://${p.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#BA1D24] font-medium tracking-tight truncate block max-w-[170px]">
                    {p.github}
                  </a>
                </div>
              )}
              {fullLocation && (
                <div>
                  <span className="font-bold text-[#BA1D24] block uppercase tracking-wider text-[10.5px]">LOCATION</span>
                  <span className="text-gray-800 font-medium tracking-tight truncate block max-w-[170px]">{fullLocation}</span>
                </div>
              )}
            </div>
          </div>

          {photoUrl && (
            <div className="col-span-4 flex justify-end">
              <div className="w-36 h-44 sm:w-40 sm:h-48 overflow-hidden shadow-md bg-stone-300">
                <img src={photoUrl} alt={fullName} className="w-full h-full object-cover grayscale contrast-110" />
              </div>
            </div>
          )}
        </header>

        {/* PROFILE SUMMARY */}
        {p.summary && (
          <section className="my-4 break-inside-avoid">
            <h2 className="font-editorial font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-1.5">
              PROFILE SUMMARY
            </h2>
            <p className="font-editorial text-xs text-[#2A2A2A] leading-relaxed uppercase font-medium text-justify">
              {p.summary}
            </p>
          </section>
        )}

        {/* SKILLS */}
        {skillList.length > 0 && (
          <section className="my-4 break-inside-avoid">
            <h2 className="font-editorial font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-2.5">
              SKILLS
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 font-editorial text-xs font-semibold text-[#2A2A2A] uppercase">
              <ul className="space-y-1 list-disc pl-4">
                {leftSkills.map((sk, i) => <li key={i}>{sk}</li>)}
              </ul>
              <ul className="space-y-1 list-disc pl-4">
                {rightSkills.map((sk, i) => <li key={i}>{sk}</li>)}
              </ul>
            </div>
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {experience.length > 0 && (
          <section className="my-4 break-inside-avoid">
            <h2 className="font-editorial font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-3">
              WORK EXPERIENCE
            </h2>

            <div className="space-y-4 font-editorial">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} className="grid grid-cols-12 gap-6 items-start text-xs break-inside-avoid">
                  <div className="col-span-5">
                    <h3 className="font-black text-[12px] uppercase text-[#111]">
                      {exp.title || exp.jobTitle}
                    </h3>
                    <p className="font-bold text-[#444] uppercase text-[10.5px] mt-0.5">
                      {exp.company} – [ {exp.startDate} - {exp.endDate || 'PRESENT'} ]
                    </p>
                  </div>
                  <div className="col-span-7">
                    {exp.description && (
                      <p className="text-[11px] uppercase font-medium text-gray-800 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements?.length > 0 && (
                      <ul className="mt-1 space-y-0.5 list-disc pl-3 text-[10.5px] uppercase font-medium text-gray-800">
                        {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <section className="my-4 break-inside-avoid font-editorial">
            <h2 className="font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-2">PROJECTS</h2>
            <div className="space-y-2 text-xs">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="text-[11px] uppercase">
                  <span className="font-bold text-black">{proj.name}: </span>
                  <span className="text-gray-700">{proj.description}</span>
                  {proj.liveUrl && (
                    <a href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="ml-1 text-[#BA1D24] font-bold underline">
                      [LINK]
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOTTOM ROW: CERTIFICATIONS & EDUCATION */}
        <section className="grid grid-cols-2 gap-8 pt-2 break-inside-avoid">
          {certifications.length > 0 && (
            <div>
              <h2 className="font-editorial font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-2">
                CERTIFICATIONS
              </h2>
              <ul className="font-editorial text-xs font-semibold text-[#2A2A2A] uppercase space-y-1 list-disc pl-4">
                {certifications.map((c, i) => (
                  <li key={i}>{typeof c === 'string' ? c : `${c.name} (${c.issuer || ''})`}</li>
                ))}
              </ul>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="font-editorial font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-2">
                EDUCATION
              </h2>
              <div className="font-editorial text-xs uppercase space-y-2">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx}>
                    <h3 className="font-black text-[#111]">{edu.degree}</h3>
                    <p className="font-bold text-[#444] mt-0.5">{edu.school || edu.institution} [ {edu.startDate} - {edu.endDate} ]</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* LANGUAGES & AWARDS & CUSTOM */}
        {(languages.length > 0 || awards.length > 0 || customSections.length > 0) && (
          <section className="grid grid-cols-2 gap-8 pt-3 break-inside-avoid font-editorial">
            {languages.length > 0 && (
              <div>
                <h2 className="font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-1.5">LANGUAGES</h2>
                <ul className="text-xs uppercase space-y-0.5 text-gray-800">
                  {languages.map((l, i) => <li key={i}>• {l.language} ({l.proficiency})</li>)}
                </ul>
              </div>
            )}
            {awards.length > 0 && (
              <div>
                <h2 className="font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-1.5">AWARDS</h2>
                <ul className="text-xs uppercase space-y-0.5 text-gray-800">
                  {awards.map((a, i) => <li key={i}>• {a.title} ({a.organization || a.issuer})</li>)}
                </ul>
              </div>
            )}
            {customSections?.map((sec, idx) => (
              <div key={idx} className="col-span-2 mt-2">
                <h2 className="font-black text-sm uppercase tracking-wider text-[#BA1D24] mb-1">{sec.title}</h2>
                {sec.content && <p className="text-xs uppercase text-gray-800">{sec.content}</p>}
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  );
}