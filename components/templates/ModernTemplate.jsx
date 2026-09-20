import React from 'react';
import { PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function ModernTemplate({ cv, data, settings, forExport = false }) {
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

  const primaryColor = settings?.colors?.primary || '#171717';
  const accentColor = settings?.colors?.accent || '#525252';

  // Helper to format bullets or descriptions
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

  const fullLocation = [personal.location, personal.postalCode, personal.country].filter(Boolean).join(', ');

  return (
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl text-[#262626] font-sans antialiased p-[15mm] sm:p-[18mm]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        ${PRINT_CSS}
      `}</style>

      <main className="flex flex-col space-y-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {/* HEADER SECTION */}
        <header className="text-center pt-2">
          {/* Centered Name with Wide Tracking */}
          <h1
            className="text-2xl sm:text-3xl font-light tracking-[0.25em] uppercase"
            style={{ color: primaryColor }}
          >
            {`${personal.firstName || ''} ${personal.lastName || ''}`.trim() || ''}
          </h1>

          {/* Professional Title */}
          {personal.title && (
            <p
              className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase mt-2"
              style={{ color: accentColor }}
            >
              {personal.title}
            </p>
          )}

          {/* Thin Divider Top */}
          <div className="w-full border-t border-[#e5e5e5] mt-4 mb-2.5" />

          {/* Single-line Centered Contact Details */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#525252] tracking-wide">
            {personal.phone && (
              <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 hover:text-black transition-colors">
                <IconPhone className="w-3 h-3 text-[#a3a3a3]" />{personal.phone}
              </a>
            )}
            {personal.phone && personal.email && <span className="text-[#d4d4d4]">|</span>}
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="flex items-center gap-1 hover:text-black transition-colors">
                <IconEmail className="w-3 h-3 text-[#a3a3a3]" />{personal.email}
              </a>
            )}
            {personal.email && fullLocation && <span className="text-[#d4d4d4]">|</span>}
            {fullLocation && (
              <span className="flex items-center gap-1">
                <IconLocation className="w-3 h-3 text-[#a3a3a3]" />{fullLocation}
              </span>
            )}
            {personal.linkedin && (
              <>
                <span className="text-[#d4d4d4]">|</span>
                <a href={ensureHttps(personal.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0A66C2] hover:underline">
                  <IconLinkedIn className="w-3 h-3" />{cleanUrl(personal.linkedin)}
                </a>
              </>
            )}
            {personal.github && (
              <>
                <span className="text-[#d4d4d4]">|</span>
                <a href={ensureHttps(personal.github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-black">
                  <IconGitHub className="w-3 h-3" />{cleanUrl(personal.github)}
                </a>
              </>
            )}
            {personal.website && (
              <>
                <span className="text-[#d4d4d4]">|</span>
                <a href={ensureHttps(personal.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-black">
                  <IconGlobe className="w-3 h-3" />{cleanUrl(personal.website)}
                </a>
              </>
            )}
          </div>

          {(personal.dob || personal.nationality || personal.drivingLicense) && (
            <div className="text-[10px] text-[#737373] tracking-wide mt-1.5">
              {[
                personal.dob ? `DOB: ${personal.dob}` : null,
                personal.nationality ? `Nationality: ${personal.nationality}` : null,
                personal.drivingLicense ? `License: ${personal.drivingLicense}` : null,
              ].filter(Boolean).join('  •  ')}
            </div>
          )}

          {/* Thin Divider Bottom */}
          <div className="w-full border-b border-[#e5e5e5] mt-2.5 mb-1" />
        </header>

        {/* PROFESSIONAL SUMMARY */}
        {personal.summary && (
          <section className="break-inside-avoid space-y-1.5">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Professional Summary
            </h2>
            <p className="text-xs sm:text-[12px] leading-relaxed text-[#525252] text-justify font-normal">
              {personal.summary}
            </p>
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {experience.length > 0 && (
          <section className="space-y-3">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Work Experience
            </h2>

            <div className="space-y-4">
              {experience.map((exp, index) => {
                const bullets = getBullets(exp);
                return (
                  <div key={exp.id || index} className="break-inside-avoid space-y-1">
                    <div className="flex justify-between items-baseline text-xs text-[#525252]">
                      <span className="font-medium text-[#404040]">
                        {exp.company}
                        {exp.location ? ` | ${exp.location}` : ''}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-[#737373]">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                        {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    <h3
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: primaryColor }}
                    >
                      {exp.jobTitle || exp.title || 'Role'}
                    </h3>

                    {bullets.length > 0 ? (
                      <ul className="list-disc ml-5 space-y-1 mt-1.5">
                        {bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="text-xs leading-relaxed text-[#525252]"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : exp.description ? (
                      <p className="text-xs leading-relaxed text-[#525252] mt-1">
                        {exp.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section className="space-y-2.5">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Education
            </h2>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="break-inside-avoid space-y-0.5">
                  <div className="flex justify-between items-baseline text-xs text-[#525252]">
                    <h3
                      className="font-bold uppercase tracking-wider"
                      style={{ color: primaryColor }}
                    >
                      {edu.degree || 'Degree'}
                      {edu.location ? ` | ${edu.location}` : ''}
                    </h3>
                    <span className="text-[11px] uppercase tracking-wider text-[#737373]">
                      {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-[#525252]">
                    {edu.institution || edu.school}
                  </p>
                  {edu.description && (
                    <p className="text-[11px] text-[#737373] italic">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS & EXPERTISE (3-Column Layout) */}
        {skills.length > 0 && (
          <section className="break-inside-avoid space-y-2">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Skills & Expertise
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 pt-1">
              {skills.map((skill, index) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                return (
                  <div key={index} className="text-xs text-[#525252] font-medium truncate">
                    {skillName}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* NOTABLE PROJECTS */}
        {projects.length > 0 && (
          <section className="space-y-2.5">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="break-inside-avoid space-y-0.5">
                  <div className="flex justify-between items-baseline text-xs">
                    <h3 className="font-bold uppercase text-[#171717]">
                      {proj.name}
                      {proj.role ? ` | ${proj.role}` : ''}
                    </h3>
                    {proj.liveUrl && (
                      <a
                        href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-600 hover:underline"
                      >
                        {proj.liveUrl.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs text-[#525252] leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS & LICENSES */}
        {certifications.length > 0 && (
          <section className="break-inside-avoid space-y-2">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Certifications
            </h2>
            <div className="space-y-1.5 text-xs text-[#525252]">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="flex justify-between">
                  <span className="font-medium text-[#171717]">
                    {cert.name} {cert.issuer ? ` | ${cert.issuer}` : ''}
                  </span>
                  {cert.issueDate && <span className="text-[11px] text-[#737373]">{cert.issueDate}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {languages.length > 0 && (
          <section className="break-inside-avoid space-y-2">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Languages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-[#525252]">
              {languages.map((lang, idx) => (
                <div key={lang.id || idx}>
                  <span className="font-medium text-[#171717]">{lang.language}</span>
                  {lang.proficiency && <span className="text-[#737373] text-[11px]"> ({lang.proficiency})</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AWARDS */}
        {awards.length > 0 && (
          <section className="break-inside-avoid space-y-2">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Awards & Honors
            </h2>
            <div className="space-y-1 text-xs text-[#525252]">
              {awards.map((aw, idx) => (
                <div key={aw.id || idx} className="flex justify-between">
                  <span className="font-medium text-[#171717]">
                    {aw.name} {aw.organization ? ` | ${aw.organization}` : ''}
                  </span>
                  {aw.date && <span className="text-[11px] text-[#737373]">{aw.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INTERESTS */}
        {interests.length > 0 && (
          <section className="break-inside-avoid space-y-2">
            <h2
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: primaryColor }}
            >
              Interests
            </h2>
            <p className="text-xs text-[#525252]">
              {interests.map((it) => it.name).join(' • ')}
            </p>
          </section>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((cs, idx) => (
            <section key={cs.id || idx} className="break-inside-avoid space-y-1.5">
              <h2
                className="text-xs font-bold tracking-[0.15em] uppercase"
                style={{ color: primaryColor }}
              >
                {cs.title || 'Additional Information'}
              </h2>
              <p className="text-xs text-[#525252] leading-relaxed whitespace-pre-line">
                {cs.content || cs.description || ''}
              </p>
            </section>
          ))}
      </main>
    </div>
  );
}
