import React from 'react';
import { PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function MinimalTemplate({ cv, data, settings, forExport = false }) {
  const resumeData = data || cv || {};
  const {
    personal = {},
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    awards = [],
    interests = [],
    customSections = [],
  } = resumeData;

  const textColor = settings?.colors?.text || '#111827';
  const primaryColor = settings?.colors?.primary || '#111827';

  // Helper to safely format experience descriptions into bullet items
  const getBullets = (exp) => {
    if (Array.isArray(exp.achievements) && exp.achievements.length > 0) {
      return exp.achievements;
    }
    if (exp.description) {
      return exp.description
        .split('\n')
        .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
        .filter(Boolean);
    }
    return [];
  };

  const fullName = `${personal.firstName || ''} ${personal.lastName || ''}`.trim();
  const fullLocation = [personal.location || personal.address, personal.postalCode, personal.country].filter(Boolean).join(', ');

  // Inline contact list
  const contactItems = [];
  if (personal.phone) {
    contactItems.push(
      <a key="phone" href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="hover:underline flex items-center gap-1">
        <IconPhone className="w-3 h-3 text-slate-400 shrink-0" />
        <span>{personal.phone}</span>
      </a>
    );
  }
  if (personal.email) {
    contactItems.push(
      <a key="email" href={`mailto:${personal.email}`} className="hover:underline flex items-center gap-1">
        <IconEmail className="w-3 h-3 text-slate-400 shrink-0" />
        <span>{personal.email}</span>
      </a>
    );
  }
  if (fullLocation) {
    contactItems.push(
      <span key="loc" className="flex items-center gap-1">
        <IconLocation className="w-3 h-3 text-slate-400 shrink-0" />
        <span>{fullLocation}</span>
      </span>
    );
  }
  if (personal.linkedin) {
    contactItems.push(
      <a key="linkedin" href={ensureHttps(personal.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#0A66C2] flex items-center gap-1">
        <IconLinkedIn className="w-3 h-3 shrink-0" />
        <span>{cleanUrl(personal.linkedin)}</span>
      </a>
    );
  }
  if (personal.github) {
    contactItems.push(
      <a key="github" href={ensureHttps(personal.github)} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
        <IconGitHub className="w-3 h-3 shrink-0" />
        <span>{cleanUrl(personal.github)}</span>
      </a>
    );
  }
  if (personal.website) {
    contactItems.push(
      <a key="website" href={ensureHttps(personal.website)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 flex items-center gap-1">
        <IconGlobe className="w-3 h-3 shrink-0" />
        <span>{cleanUrl(personal.website)}</span>
      </a>
    );
  }

  return (
    <div
      className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl font-sans antialiased p-[12mm] sm:p-[16mm]"
      style={{ color: textColor }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        ${PRINT_CSS}
      `}</style>

      <main className="flex flex-col space-y-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* HEADER SECTION */}
        <header className="text-center pt-2">
          {fullName && (
            <h1
              className="text-2xl sm:text-3xl font-light tracking-[0.22em] uppercase text-center"
              style={{ color: primaryColor }}
            >
              {fullName}
            </h1>
          )}

          {personal.title && (
            <p className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-slate-600 text-center mt-1.5">
              {personal.title}
            </p>
          )}

          {/* Top Divider Line */}
          <hr className="border-t border-slate-200 my-3" />

          {/* Inline Contact Info Bar */}
          {contactItems.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-300">|</span>}
                  {item}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Bottom Divider Line */}
          {contactItems.length > 0 && <hr className="border-t border-slate-200 my-3" />}
        </header>

        {/* PROFESSIONAL SUMMARY */}
        {personal.summary && (
          <section className="break-inside-avoid">
            <h2
              className="text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-2"
              style={{ color: primaryColor }}
            >
              Professional Summary
            </h2>
            <p className="text-xs sm:text-[12px] leading-relaxed text-slate-700">
              {personal.summary}
            </p>
          </section>
        )}

        {/* WORK EXPERIENCE SECTION */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-2.5"
              style={{ color: primaryColor }}
            >
              Work Experience
            </h2>

            <div className="space-y-3.5">
              {experience.map((exp, index) => {
                const bullets = getBullets(exp);
                return (
                  <div key={exp.id || index} className="break-inside-avoid space-y-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-semibold text-slate-900">
                        {exp.company}
                        {exp.location ? ` | ${exp.location}` : ''}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                        {exp.current ? 'PRESENT' : exp.endDate}
                      </span>
                    </div>

                    <div className="text-[12px] font-bold uppercase tracking-wide text-slate-800">
                      {exp.jobTitle || exp.title || 'Role'}
                    </div>

                    {bullets.length > 0 ? (
                      <ul className="list-disc ml-4 space-y-1 mt-1">
                        {bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs leading-relaxed text-slate-700">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : exp.description ? (
                      <p className="text-xs leading-relaxed text-slate-700 mt-1">
                        {exp.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* EDUCATION SECTION */}
        {education.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-2.5"
              style={{ color: primaryColor }}
            >
              Education
            </h2>

            <div className="space-y-2.5">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="break-inside-avoid space-y-0.5">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-900 uppercase">
                      {edu.degree || 'Degree'}
                      {edu.location ? ` | ${edu.location}` : ''}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 uppercase">
                      {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                    </span>
                  </div>
                  <div className="text-xs italic text-slate-700">
                    {edu.institution || edu.school}
                  </div>
                  {edu.description && (
                    <p className="text-[11px] text-slate-600 italic mt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS & EXPERTISE SECTION */}
        {skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-2"
              style={{ color: primaryColor }}
            >
              Skills & Expertise
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 text-xs text-slate-700">
              {skills.map((skill, index) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                const skillLevel = typeof skill === 'object' && skill?.level ? ` (${skill.level})` : '';
                return (
                  <div key={index} className="flex items-center gap-1.5">
                    <span className="font-medium">{skillName}{skillLevel}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* NOTABLE PROJECTS SECTION */}
        {projects.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-2"
              style={{ color: primaryColor }}
            >
              Projects
            </h2>

            <div className="space-y-2.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="break-inside-avoid space-y-0.5">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-900 uppercase">
                      {proj.name || 'Project'}
                      {proj.role ? ` | ${proj.role}` : ''}
                    </span>
                    {proj.liveUrl && (
                      <a
                        href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-600 hover:underline"
                      >
                        {cleanUrl(proj.liveUrl)}
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs text-slate-700 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS & LICENSES */}
        {certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-2"
              style={{ color: primaryColor }}
            >
              Certifications
            </h2>
            <div className="space-y-1.5 text-xs">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                  </div>
                  {cert.issueDate && <span className="text-[11px] text-slate-500">{cert.issueDate}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {languages.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-2"
              style={{ color: primaryColor }}
            >
              Languages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
              {languages.map((lang, idx) => (
                <div key={lang.id || idx}>
                  <span className="font-bold text-slate-900">{lang.language}</span>
                  {lang.proficiency && <span className="text-slate-500 text-[11px]"> ({lang.proficiency})</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((cs, idx) => (
            <section key={cs.id || idx} className="break-inside-avoid">
              <h2
                className="text-xs sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-2"
                style={{ color: primaryColor }}
              >
                {cs.title || 'Additional Information'}
              </h2>
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {cs.content || cs.description || ''}
              </div>
            </section>
          ))}
      </main>
    </div>
  );
}
