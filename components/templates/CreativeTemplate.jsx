import React from 'react';
import { PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function CreativeTemplate({ cv, data, settings, forExport = false }) {
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl text-[#1f1f1f] font-sans antialiased p-[12mm] sm:p-[16mm]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        ${PRINT_CSS}
      `}</style>

      <main className="flex flex-col space-y-5" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* TOP HEADER: Editorial Stacked Name on Left & Circular Icon Badges on Right */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
          <div>
            <h1
              className="text-3xl sm:text-5xl font-normal tracking-wider uppercase leading-none"
              style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif", color: primaryColor }}
            >
              <div>{personal.firstName || ''}</div>
              <div>{personal.lastName || ''}</div>
            </h1>
            {personal.title && (
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase mt-3 text-[#111111]">
                {personal.title}
              </p>
            )}
          </div>

          {/* Contact Details with Circular Icon Badges */}
          <div className="flex flex-col space-y-2 text-xs text-[#2b2b2b]">
            {personal.phone && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z" />
                  </svg>
                </div>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="font-medium hover:underline"
                >
                  {personal.phone}
                </a>
              </div>
            )}

            {personal.email && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <a
                  href={`mailto:${personal.email}`}
                  className="font-medium hover:underline truncate max-w-[200px]"
                >
                  {personal.email}
                </a>
              </div>
            )}

            {fullLocation && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                  </svg>
                </div>
                <span className="font-medium">{fullLocation}</span>
              </div>
            )}

            {personal.linkedin && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </div>
                <a
                  href={`https://${personal.linkedin.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline truncate max-w-[200px]"
                >
                  {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}

            {personal.github && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </div>
                <a
                  href={`https://${personal.github.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline truncate max-w-[200px]"
                >
                  {personal.github.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}

            {personal.website && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1a2 2 0 0 0 2 2zm6.9-2.54A7.94 7.94 0 0 1 12 20v-2a3 3 0 0 0-3-3l-2.4-2.4A9.9 9.9 0 0 0 12 4a8 8 0 0 1 6.9 11.39z" />
                  </svg>
                </div>
                <a
                  href={`https://${personal.website.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline truncate max-w-[200px]"
                >
                  {personal.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}

            {(personal.dob || personal.nationality || personal.drivingLicense) && (
              <div className="text-[10px] text-[#666666] pt-1">
                {[
                  personal.dob ? `DOB: ${personal.dob}` : null,
                  personal.nationality ? `Nat: ${personal.nationality}` : null,
                  personal.drivingLicense ? `License: ${personal.drivingLicense}` : null,
                ].filter(Boolean).join(' • ')}
              </div>
            )}
          </div>
        </header>

        {/* FULL WIDTH SUMMARY */}
        {personal.summary && (
          <section className="break-inside-avoid">
            <p className="text-xs sm:text-[12.5px] leading-relaxed text-[#3a3a3a] text-justify font-light">
              {personal.summary}
            </p>
          </section>
        )}

        <div className="w-full border-t border-[#111111]" />

        {/* MID SECTION: DUAL COLUMN (EDUCATION & SKILLS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.length > 0 && (
            <section className="space-y-3">
              <h2
                className="text-lg sm:text-xl font-normal tracking-wider uppercase"
                style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif", color: primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="space-y-0.5">
                    <span className="text-[11px] text-[#666666] font-medium block">
                      {edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}
                    </span>
                    <h3 className="text-xs sm:text-[13px] font-bold text-[#111111]">
                      {edu.institution || edu.school}
                    </h3>
                    <p className="text-xs text-[#444444]">{edu.degree}</p>
                    {edu.description && (
                      <p className="text-[11px] text-[#666666] italic">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section className="space-y-3">
              <h2
                className="text-lg sm:text-xl font-normal tracking-wider uppercase"
                style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif", color: primaryColor }}
              >
                Skills
              </h2>
              <ul className="space-y-1.5 list-disc ml-5 text-xs text-[#333333]">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  return (
                    <li key={idx} className="leading-snug">
                      {skillName}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        <div className="w-full border-t border-[#111111]" />

        {/* BOTTOM SECTION: WORK EXPERIENCE */}
        {experience.length > 0 && (
          <section className="space-y-3">
            <h2
              className="text-lg sm:text-xl font-normal tracking-wider uppercase"
              style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif", color: primaryColor }}
            >
              Work Experience
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => {
                const bullets = getBullets(exp);
                return (
                  <div key={exp.id || idx} className="space-y-1">
                    <h3 className="text-xs sm:text-[13px] font-bold text-[#111111]">
                      {exp.jobTitle || exp.title || 'Role'}
                    </h3>
                    <p className="text-[11px] text-[#555555] font-medium">
                      {exp.company}
                      {exp.startDate
                        ? `, ${exp.startDate} - ${exp.current ? 'Now' : exp.endDate || ''}`
                        : ''}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-[#444444] leading-relaxed font-light">
                        {exp.description}
                      </p>
                    )}
                    {bullets.length > 0 && (
                      <ul className="list-disc ml-4 space-y-0.5 text-xs text-[#444444] font-light mt-1">
                        {bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            {bullet}
                          </li>
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
          <section className="space-y-3 pt-2">
            <div className="w-full border-t border-[#111111] mb-3" />
            <h2
              className="text-lg sm:text-xl font-normal tracking-wider uppercase"
              style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif", color: primaryColor }}
            >
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="break-inside-avoid space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs sm:text-[13px] font-bold text-[#111111]">
                      {proj.name} {proj.role ? `— ${proj.role}` : ''}
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
                    <p className="text-xs text-[#444444] leading-relaxed font-light">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXTRA DUAL COLUMN (CERTIFICATIONS, LANGUAGES, AWARDS) */}
        {(certifications.length > 0 || languages.length > 0 || awards.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {certifications.length > 0 && (
              <section className="space-y-2 break-inside-avoid">
                <h2
                  className="text-base sm:text-lg font-normal tracking-wider uppercase"
                  style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif", color: primaryColor }}
                >
                  Certifications
                </h2>
                <div className="space-y-1.5 text-xs text-[#333333]">
                  {certifications.map((cert, idx) => (
                    <div key={cert.id || idx} className="flex justify-between">
                      <span className="font-medium text-[#111111]">{cert.name} — {cert.issuer}</span>
                      {cert.issueDate && <span className="text-[#666666] text-[11px]">{cert.issueDate}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section className="space-y-2 break-inside-avoid">
                <h2
                  className="text-base sm:text-lg font-normal tracking-wider uppercase"
                  style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif", color: primaryColor }}
                >
                  Languages
                </h2>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#333333]">
                  {languages.map((lang, idx) => (
                    <div key={lang.id || idx}>
                      <span className="font-medium text-[#111111]">{lang.language}</span>
                      {lang.proficiency && <span className="text-[#666666] text-[11px]"> ({lang.proficiency})</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {customSections.length > 0 &&
          customSections.map((cs, idx) => (
            <section key={cs.id || idx} className="space-y-2 break-inside-avoid pt-2">
              <div className="w-full border-t border-[#111111] mb-2" />
              <h2
                className="text-lg sm:text-xl font-normal tracking-wider uppercase"
                style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif", color: primaryColor }}
              >
                {cs.title || 'Additional Information'}
              </h2>
              <p className="text-xs text-[#444444] leading-relaxed font-light whitespace-pre-line">
                {cs.content || cs.description || ''}
              </p>
            </section>
          ))}
      </main>
    </div>
  );
}