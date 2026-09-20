import React from 'react';
import { PRINT_CSS } from '@/lib/templateUtils';
import { IconPhone, IconEmail, IconLocation, IconLinkedIn, IconGitHub, IconGlobe, cleanUrl, ensureHttps } from './TemplateIcons';

export default function ProfessionalTemplate({ cv, data, settings, forExport = false }) {
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

  const primaryColor = settings?.colors?.primary || '#1a1a1a';

  // Helper to extract bullets or text descriptions
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
    <div className="cv-page max-w-[210mm] min-h-[297mm] mx-auto bg-white overflow-hidden print:w-auto print:h-auto print:m-0 print:shadow-none shadow-2xl text-[#262626] font-sans antialiased p-[12mm] sm:p-[16mm]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;500;600;700&display=swap');
        ${PRINT_CSS}
      `}</style>

      {/* HEADER: Calligraphic Script Name & Centered Subtitle */}
      <header className="text-center pb-6 border-b border-transparent">
        <h1
          className="text-4xl sm:text-5xl tracking-wide font-normal"
          style={{ fontFamily: "'Great Vibes', cursive", color: primaryColor }}
        >
          {`${personal.firstName || ''} ${personal.lastName || ''}`.trim() || ''}
        </h1>
        {personal.title && (
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#595959] uppercase mt-2 font-sans">
            {personal.title}
          </p>
        )}
      </header>

      {/* MAIN TWO-COLUMN BODY */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-2">
        {/* LEFT COLUMN: Contact, Education, Expertise, Languages, Certifications, Interests */}
        <div className="md:col-span-4 flex flex-col space-y-6 md:border-r md:border-[#1a1a1a] md:pr-6 text-right md:text-right">
          {/* CONTACT INFO WITH INLINE ICONS */}
          <section className="space-y-2.5 break-inside-avoid">
            {personal.phone && (
              <div className="flex items-center justify-end gap-2 text-xs text-[#333333]">
                <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="hover:underline">{personal.phone}</a>
                <IconPhone className="w-3.5 h-3.5 text-[#1a1a1a] shrink-0" />
              </div>
            )}

            {personal.email && (
              <div className="flex items-center justify-end gap-2 text-xs text-[#333333]">
                <a href={`mailto:${personal.email}`} className="hover:underline truncate max-w-[180px]">{personal.email}</a>
                <IconEmail className="w-3.5 h-3.5 text-[#1a1a1a] shrink-0" />
              </div>
            )}

            {fullLocation && (
              <div className="flex items-center justify-end gap-2 text-xs text-[#333333]">
                <span>{fullLocation}</span>
                <IconLocation className="w-3.5 h-3.5 text-[#1a1a1a] shrink-0" />
              </div>
            )}

            {personal.linkedin && (
              <div className="flex items-center justify-end gap-2 text-xs text-[#333333]">
                <a href={ensureHttps(personal.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[180px] text-[#0A66C2]">{cleanUrl(personal.linkedin)}</a>
                <IconLinkedIn className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
              </div>
            )}

            {personal.github && (
              <div className="flex items-center justify-end gap-2 text-xs text-[#333333]">
                <a href={ensureHttps(personal.github)} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[180px]">{cleanUrl(personal.github)}</a>
                <IconGitHub className="w-3.5 h-3.5 text-[#1a1a1a] shrink-0" />
              </div>
            )}

            {personal.website && (
              <div className="flex items-center justify-end gap-2 text-xs text-[#333333]">
                <a href={ensureHttps(personal.website)} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[180px]">{cleanUrl(personal.website)}</a>
                <IconGlobe className="w-3.5 h-3.5 text-[#1a1a1a] shrink-0" />
              </div>
            )}

            {(personal.dob || personal.nationality || personal.drivingLicense) && (
              <div className="text-[10px] text-[#737373] pt-1">
                {[
                  personal.dob ? `DOB: ${personal.dob}` : null,
                  personal.nationality ? `Nat: ${personal.nationality}` : null,
                  personal.drivingLicense ? `License: ${personal.drivingLicense}` : null,
                ].filter(Boolean).join(' • ')}
              </div>
            )}
          </section>

          {/* EDUCATIONS */}
          {education.length > 0 && (
            <section className="space-y-3 break-inside-avoid">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Educations
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="space-y-0.5">
                    <h3 className="text-xs font-bold uppercase text-[#1a1a1a]">
                      {edu.institution || edu.school}
                    </h3>
                    <p className="text-[11px] text-[#595959]">
                      {edu.degree}
                      {edu.startDate && edu.endDate ? ` / ${edu.startDate} - ${edu.endDate}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EXPERTISE / SKILLS */}
          {skills.length > 0 && (
            <section className="space-y-2.5 break-inside-avoid">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Expertise
              </h2>
              <div className="space-y-1 text-xs text-[#404040]">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  return (
                    <div key={idx} className="font-normal">
                      {skillName}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <section className="space-y-2 break-inside-avoid">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Languages
              </h2>
              <div className="space-y-1 text-xs text-[#404040]">
                {languages.map((lang, idx) => (
                  <div key={lang.id || idx}>
                    <span className="font-semibold text-[#1a1a1a]">{lang.language}</span>
                    {lang.proficiency && <span className="text-[10px] text-[#666666]"> ({lang.proficiency})</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <section className="space-y-2 break-inside-avoid">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Certifications
              </h2>
              <div className="space-y-1.5 text-xs text-[#404040]">
                {certifications.map((cert, idx) => (
                  <div key={cert.id || idx}>
                    <p className="font-semibold text-[#1a1a1a] leading-tight">{cert.name}</p>
                    <p className="text-[10px] text-[#666666]">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* INTERESTS */}
          {interests.length > 0 && (
            <section className="space-y-1.5 break-inside-avoid">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Interests
              </h2>
              <p className="text-xs text-[#595959]">
                {interests.map((it) => it.name).join(', ')}
              </p>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Profile, Work Experience, Projects, Awards, Custom Sections */}
        <div className="md:col-span-8 flex flex-col space-y-6">
          {/* PROFILE SUMMARY */}
          {personal.summary && (
            <section className="space-y-2 break-inside-avoid">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Profile
              </h2>
              <p className="text-xs leading-relaxed text-[#404040] text-justify font-light">
                {personal.summary}
              </p>
            </section>
          )}

          {/* WORK EXPERIENCE */}
          {experience.length > 0 && (
            <section className="space-y-4">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Work Experience
              </h2>

              <div className="space-y-5">
                {experience.map((exp, index) => {
                  const bullets = getBullets(exp);
                  return (
                    <div key={exp.id || index} className="break-inside-avoid space-y-1.5">
                      <h3
                        className="text-xs font-bold uppercase tracking-wide"
                        style={{ color: primaryColor }}
                      >
                        {exp.jobTitle || exp.title || 'Role'}
                      </h3>

                      <p className="text-[11px] text-[#737373] italic">
                        {exp.company}
                        {exp.startDate
                          ? ` / ${exp.startDate} – ${exp.current ? 'Present' : exp.endDate || ''}`
                          : ''}
                      </p>

                      {exp.description && (
                        <p className="text-xs leading-relaxed text-[#404040] font-light">
                          {exp.description}
                        </p>
                      )}

                      {bullets.length > 0 && (
                        <ul className="list-disc ml-5 space-y-1 text-xs text-[#404040] font-light mt-1">
                          {bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">
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

          {/* PROJECTS */}
          {projects.length > 0 && (
            <section className="space-y-3">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Notable Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="break-inside-avoid space-y-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <h3 className="font-bold uppercase text-[#1a1a1a]">
                        {proj.name} {proj.role ? `(${proj.role})` : ''}
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
                      <p className="text-xs text-[#404040] leading-relaxed font-light">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AWARDS */}
          {awards.length > 0 && (
            <section className="space-y-2 break-inside-avoid">
              <h2
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: primaryColor }}
              >
                Awards & Honors
              </h2>
              <div className="space-y-2 text-xs text-[#404040]">
                {awards.map((aw, idx) => (
                  <div key={aw.id || idx} className="flex justify-between">
                    <div>
                      <span className="font-semibold text-[#1a1a1a]">{aw.name}</span>
                      {aw.organization && <span className="text-[#666666]"> — {aw.organization}</span>}
                    </div>
                    {aw.date && <span className="text-[11px] text-[#737373]">{aw.date}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CUSTOM SECTIONS */}
          {customSections.length > 0 &&
            customSections.map((cs, idx) => (
              <section key={cs.id || idx} className="space-y-1.5 break-inside-avoid">
                <h2
                  className="text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: primaryColor }}
                >
                  {cs.title || 'Additional Information'}
                </h2>
                <p className="text-xs text-[#404040] leading-relaxed font-light whitespace-pre-line">
                  {cs.content || cs.description || ''}
                </p>
              </section>
            ))}
        </div>
      </main>
    </div>
  );
}
