'use client';
import React from 'react';
import { formatDate, displayUrl, PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function NordicTemplate(props) {
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white text-[#2B3A37] overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl relative font-sans leading-normal selection:bg-[#F4ECE1]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=League+Gothic&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-condensed { font-family: 'League Gothic', sans-serif; }
        .font-main { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${PRINT_CSS}
      `}</style>

      {/* Decorative Organic Pastel Blob Waves Background */}
      <div className="absolute top-0 left-0 w-[420px] h-[380px] bg-[#EFE2D3] rounded-br-[240px] rounded-bl-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[340px] h-[300px] bg-[#DFE7DD] rounded-tr-[220px] pointer-events-none z-0 opacity-80" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 p-8 sm:p-12 min-h-[297mm] flex flex-col justify-between font-main">
        
        {/* HEADER */}
        <header className="grid grid-cols-12 gap-6 items-center pb-4">
          {/* Portrait with Organic Backdrop */}
          {photoUrl ? (
            <div className="col-span-5 relative flex justify-start pl-2">
              <div className="relative w-44 h-44 sm:w-48 sm:h-48">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-stone-200 relative z-10">
                  <img src={photoUrl} alt={fullName} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          ) : null}

          {/* Name & Title */}
          <div className={`${photoUrl ? 'col-span-7 pl-6' : 'col-span-12'} flex flex-col justify-center`}>
            {firstName && (
              <h1 className="font-condensed text-6xl sm:text-7xl font-normal uppercase tracking-[0.06em] text-[#1E332E] leading-[0.88] m-0">
                {firstName}
              </h1>
            )}
            {lastName && (
              <div className="font-condensed text-6xl sm:text-7xl font-normal uppercase tracking-[0.06em] text-[#1E332E] leading-[0.88] mt-1">
                {lastName}
              </div>
            )}
            {!firstName && !lastName && fullName && (
              <h1 className="font-condensed text-6xl sm:text-7xl font-normal uppercase tracking-[0.06em] text-[#1E332E] leading-[0.88] m-0">
                {fullName}
              </h1>
            )}
            {jobTitle && (
              <p className="font-main text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[#C8877B] mt-3">
                {jobTitle}
              </p>
            )}
          </div>
        </header>

        {/* 2-COLUMN MAIN BODY */}
        <div className="grid grid-cols-12 gap-8 mt-2 items-start flex-grow">
          
          {/* LEFT COLUMN: ABOUT ME, SKILLS, CONTACT, EXTRAS */}
          <div className="col-span-5 space-y-6">
            
            {/* ABOUT ME / SUMMARY */}
            {p.summary && (
              <section className="break-inside-avoid">
                <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-1.5">
                  ABOUT ME
                </h2>
                <p className="text-xs text-[#3E4F4C] leading-relaxed text-justify">
                  {p.summary}
                </p>
              </section>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-2">
                  SKILLS
                </h2>
                <ul className="space-y-1.5 text-xs text-[#334542]">
                  {skills.map((skill, index) => {
                    const name = typeof skill === 'string' ? skill : skill.name;
                    return (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#1E332E] text-sm leading-none">•</span>
                        <span>{name}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* CONTACT */}
            {(p.phone || p.email || fullLocation || p.website || p.linkedin || p.github) && (
              <section className="break-inside-avoid">
                <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-2">
                  CONTACT
                </h2>
                <div className="space-y-1 text-xs text-[#334542]">
                  {fullLocation && <p>{fullLocation}</p>}
                  {p.phone && (
                    <p>
                      <a href={`tel:${p.phone}`} className="hover:underline font-medium text-[#1E332E]">
                        {p.phone}
                      </a>
                    </p>
                  )}
                  {p.email && (
                    <p>
                      <a href={`mailto:${p.email}`} className="hover:underline font-medium text-[#1E332E] truncate block max-w-[190px]">
                        {p.email}
                      </a>
                    </p>
                  )}
                  {p.website && (
                    <p>
                      <a href={`https://${p.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-[#1E332E] truncate block max-w-[190px]">
                        {p.website}
                      </a>
                    </p>
                  )}
                  {p.linkedin && (
                    <p>
                      <a href={`https://${p.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-[#1E332E] truncate block max-w-[190px]">
                        {p.linkedin}
                      </a>
                    </p>
                  )}
                  {p.github && (
                    <p>
                      <a href={`https://${p.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-[#1E332E] truncate block max-w-[190px]">
                        {p.github}
                      </a>
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-1.5">
                  LANGUAGES
                </h2>
                <ul className="text-xs text-[#334542] space-y-1">
                  {languages.map((l, i) => (
                    <li key={i}>• {l.language}: {l.proficiency}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* DRIVING LICENSE / EXTRAS */}
            {(p.drivingLicense || p.nationality || p.dob) && (
              <section className="break-inside-avoid text-xs text-[#334542] font-semibold pt-2">
                {p.drivingLicense && <p>License {p.drivingLicense}</p>}
                {p.nationality && <p>Nationality: {p.nationality}</p>}
                {p.dob && <p>{p.dob}</p>}
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: EDUCATION, EXPERIENCE, PROJECTS */}
          <div className="col-span-7 space-y-6">
            
            {/* EDUCATION */}
            {education.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-2">
                  EDUCATION
                </h2>

                <div className="space-y-3.5 text-xs text-[#334542]">
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx} className="break-inside-avoid">
                      <h3 className="font-bold text-[#1E332E]">
                        {edu.school || edu.institution} :
                      </h3>
                      <p className="text-[11.5px] text-[#4E5E5A]">
                        {edu.startDate ? `${edu.startDate} – ${edu.endDate || 'Present'} | ` : ''}{edu.degree}
                      </p>
                      {edu.description && (
                        <p className="text-[11px] text-[#4E5E5A] mt-0.5">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCE */}
            {experience.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-2">
                  EXPERIENCE
                </h2>

                <div className="space-y-4 text-xs text-[#334542]">
                  {experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="break-inside-avoid">
                      <p className="text-[11.5px] font-semibold text-[#556965]">
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </p>
                      <h3 className="font-bold text-[#1E332E] text-[12.5px]">
                        {exp.company}
                      </h3>
                      <h4 className="italic text-[11px] text-[#556965]">
                        Position: {exp.title || exp.jobTitle}
                      </h4>
                      {exp.description && (
                        <p className="text-[11px] text-[#4E5E5A] mt-1 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      {exp.achievements?.length > 0 && (
                        <ul className="mt-1 space-y-0.5 list-disc pl-4 text-[11px] text-[#4E5E5A]">
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
                <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-2">
                  PROJECTS
                </h2>
                <div className="space-y-2 text-xs">
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx}>
                      <span className="font-bold text-[#1E332E]">{proj.name}: </span>
                      <span className="text-[#4E5E5A]">{proj.description}</span>
                      {proj.liveUrl && (
                        <a href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="ml-1 text-[#C8877B] font-semibold underline">
                          [lien]
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CERTIFICATIONS */}
            {certifications.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-1.5">
                  CERTIFICATIONS
                </h2>
                <ul className="text-xs text-[#334542] space-y-1">
                  {certifications.map((c, i) => (
                    <li key={i}>• {typeof c === 'string' ? c : `${c.name} (${c.issuer || ''})`}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* AWARDS & VOLUNTEER */}
            {(awards.length > 0 || volunteer.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 break-inside-avoid">
                {awards.length > 0 && (
                  <div>
                    <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-1">
                      AWARDS
                    </h2>
                    <ul className="text-xs text-[#334542] space-y-1">
                      {awards.map((a, i) => (
                        <li key={i}>• {a.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {volunteer.length > 0 && (
                  <div>
                    <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-1">
                      VOLUNTEER
                    </h2>
                    <ul className="text-xs text-[#334542] space-y-1">
                      {volunteer.map((v, i) => (
                        <li key={i}>• {v.role} ({v.organization})</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* CUSTOM SECTIONS */}
            {customSections?.length > 0 && (
              <section className="break-inside-avoid">
                {customSections.map((sec, idx) => (
                  <div key={idx} className="mb-3">
                    <h2 className="font-condensed text-2xl uppercase tracking-wider text-[#1E332E] mb-1">
                      {sec.title}
                    </h2>
                    {sec.content && <p className="text-xs text-[#4E5E5A] leading-relaxed">{sec.content}</p>}
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