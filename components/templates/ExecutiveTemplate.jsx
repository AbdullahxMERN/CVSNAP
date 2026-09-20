import React from 'react';
import { PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function ExecutiveTemplate({ cv, data, settings, forExport = false }) {
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
    references = {},
  } = resumeData;

  const primaryColor = settings?.colors?.primary || '#111111';

  // Helper to extract bullets or descriptions
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl text-[#222222] font-sans antialiased p-[14mm] sm:p-[18mm]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        ${PRINT_CSS}
      `}</style>

      <main className="flex flex-col space-y-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* HEADER SECTION */}
        <header className="space-y-1 pb-2">
          {/* Bold Uppercase Name */}
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight uppercase"
            style={{ color: primaryColor }}
          >
            {`${personal.firstName || ''} ${personal.lastName || ''}`.trim() || ''}
          </h1>

          {/* Location, Phone & Title */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#333333]">
            {fullLocation && (
              <span className="flex items-center gap-1.5"><IconLocation className="w-3 h-3 text-[#888]" />{fullLocation}</span>
            )}
            {personal.phone && (
              <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-black hover:underline">
                <IconPhone className="w-3 h-3 text-[#888]" />{personal.phone}
              </a>
            )}
            {personal.title && (
              <span className="font-semibold text-[#111111]">{personal.title}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#333333]">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-black hover:underline">
                <IconEmail className="w-3 h-3 text-[#888]" />{personal.email}
              </a>
            )}
            {personal.linkedin && (
              <a href={ensureHttps(personal.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#0A66C2] hover:underline">
                <IconLinkedIn className="w-3 h-3" />{cleanUrl(personal.linkedin)}
              </a>
            )}
            {personal.github && (
              <a href={ensureHttps(personal.github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-black hover:underline">
                <IconGitHub className="w-3 h-3" />{cleanUrl(personal.github)}
              </a>
            )}
            {personal.website && (
              <a href={ensureHttps(personal.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                <IconGlobe className="w-3 h-3" />{cleanUrl(personal.website)}
              </a>
            )}
          </div>

          {(personal.dob || personal.nationality || personal.drivingLicense) && (
            <div className="text-[10px] text-[#666666] pt-0.5">
              {[
                personal.dob ? `DOB: ${personal.dob}` : null,
                personal.nationality ? `Nat: ${personal.nationality}` : null,
                personal.drivingLicense ? `License: ${personal.drivingLicense}` : null,
              ].filter(Boolean).join('  •  ')}
            </div>
          )}

          {/* Heavy Black Header Divider Line */}
          <div className="w-full border-b-[2.5px] border-[#111111] pt-2" />
        </header>

        {/* SUMMARY SECTION */}
        {personal.summary && (
          <section className="break-inside-avoid space-y-1">
            <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
              Summary
            </h2>
            <p className="text-xs sm:text-[12px] leading-relaxed text-[#333333] text-justify pt-0.5">
              {personal.summary}
            </p>
          </section>
        )}

        {/* SKILLS SECTION (3-COLUMN BULLETED GRID) */}
        {skills.length > 0 && (
          <section className="break-inside-avoid space-y-1">
            <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
              Skills
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1.5 list-disc ml-5 pt-1">
              {skills.map((skill, index) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                const skillLevel = typeof skill === 'object' && skill?.level ? ` (${skill.level})` : '';
                return (
                  <li key={index} className="text-xs text-[#333333] leading-snug">
                    {skillName}{skillLevel}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* EDUCATION SECTION */}
        {education.length > 0 && (
          <section className="space-y-1">
            <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
              Education
            </h2>
            <div className="space-y-2.5 pt-1">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline text-xs">
                    <h3 className="font-bold text-[#111111]">
                      {edu.degree || 'Degree'}
                    </h3>
                    <span className="font-medium text-[#555555]">
                      {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-[#444444]">
                    {edu.institution || edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                  </p>
                  {edu.description && (
                    <p className="text-[11px] text-[#666666] italic">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROFESSIONAL EXPERIENCE SECTION */}
        {experience.length > 0 && (
          <section className="space-y-1">
            <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
              Professional Experience
            </h2>

            <div className="space-y-3.5 pt-1">
              {experience.map((exp, index) => {
                const bullets = getBullets(exp);
                return (
                  <div key={exp.id || index} className="break-inside-avoid space-y-0.5">
                    <div className="flex justify-between items-baseline text-xs">
                      <h3 className="font-bold text-[#111111]">
                        {exp.jobTitle || exp.title || 'Role'}
                      </h3>
                      <span className="font-medium text-[#555555]">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                        {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    <p className="text-xs text-[#444444] italic">
                      {exp.company}
                      {exp.location ? ` (${exp.location})` : ''}
                    </p>

                    {exp.description && (
                      <p className="text-xs text-[#333333] leading-relaxed pt-0.5">
                        {exp.description}
                      </p>
                    )}

                    {bullets.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1 text-xs text-[#333333] leading-relaxed pt-1">
                        {bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* NOTABLE PROJECTS */}
        {projects.length > 0 && (
          <section className="space-y-1">
            <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
              Key Projects
            </h2>
            <div className="space-y-3 pt-1">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="break-inside-avoid space-y-0.5">
                  <div className="flex justify-between items-baseline text-xs">
                    <h3 className="font-bold text-[#111111]">
                      {proj.name} {proj.role ? `(${proj.role})` : ''}
                    </h3>
                    {proj.liveUrl && (
                      <a
                        href={`https://${proj.liveUrl.replace(/^https?:\/\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#2563eb] hover:underline"
                      >
                        {proj.liveUrl.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs text-[#333333] leading-relaxed">{proj.description}</p>
                  )}
                  {proj.technologies?.length > 0 && (
                    <p className="text-[11px] text-[#666666]">
                      Technologies: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS & LICENSES */}
        {certifications.length > 0 && (
          <section className="break-inside-avoid space-y-1">
            <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
              Certifications
            </h2>
            <div className="space-y-1.5 pt-1 text-xs">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="flex justify-between">
                  <span className="font-semibold text-[#111111]">{cert.name} — {cert.issuer}</span>
                  {cert.issueDate && <span className="text-[#666666] text-[11px]">{cert.issueDate}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {languages.length > 0 && (
          <section className="break-inside-avoid space-y-1">
            <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
              Languages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
              {languages.map((lang, idx) => (
                <div key={lang.id || idx}>
                  <span className="font-semibold text-[#111111]">{lang.language}</span>
                  {lang.proficiency && <span className="text-[#666666] text-[11px]"> ({lang.proficiency})</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AWARDS */}
        {awards.length > 0 && (
          <section className="break-inside-avoid space-y-1">
            <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
              Awards & Honors
            </h2>
            <div className="space-y-1.5 pt-1 text-xs">
              {awards.map((aw, idx) => (
                <div key={aw.id || idx} className="flex justify-between">
                  <span className="font-semibold text-[#111111]">{aw.name} — {aw.organization}</span>
                  {aw.date && <span className="text-[#666666] text-[11px]">{aw.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((cs, idx) => (
            <section key={cs.id || idx} className="break-inside-avoid space-y-1">
              <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
                {cs.title || 'Additional Information'}
              </h2>
              <p className="text-xs text-[#333333] leading-relaxed pt-0.5 whitespace-pre-line">
                {cs.content || cs.description || ''}
              </p>
            </section>
          ))}

        {/* REFERENCES SECTION */}
        <section className="break-inside-avoid space-y-1">
          <h2 className="font-bold text-xs tracking-wider uppercase text-[#111111] border-b border-[#cccccc] pb-1">
            References
          </h2>
          <p className="text-xs text-[#555555] italic pt-0.5">
            {references?.type === 'available' || !references?.items?.length
              ? 'Available upon request'
              : references.items.map((r, i) => (
                  <span key={i} className="block not-italic text-[#333333]">
                    {r.name} — {r.position}, {r.company} ({r.email || r.phone})
                  </span>
                ))}
          </p>
        </section>
      </main>
    </div>
  );
}