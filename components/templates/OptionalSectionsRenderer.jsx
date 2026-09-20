'use client';
import { formatDate, displayUrl } from '@/lib/templateUtils';

/**
 * OptionalSectionsRenderer
 * Renders supplemental CV sections that templates include at the bottom:
 * certifications, awards, courses, volunteer, publications, interests,
 * references, and custom sections.
 *
 * Props:
 *  cv      – the full CV data object
 *  colors  – { primary, accent, ... } from settings
 */
export default function OptionalSectionsRenderer({ cv, colors }) {
  const d = cv;
  const primary = colors?.primary || '#1e293b';
  const accent = colors?.accent || '#3b82f6';

  const heading = {
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: accent,
    margin: '0 0 10px',
  };

  const sectionWrap = { marginBottom: '18px' };

  return (
    <>
      {/* Certifications */}
      {d.certifications?.length > 0 && (
        <div style={sectionWrap}>
          <h2 style={heading}>Certifications</h2>
          {d.certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: '600', fontSize: '11px', margin: 0, color: primary }}>{cert.name}</p>
                <p style={{ fontSize: '10px', margin: '2px 0 0', color: '#6b7280' }}>{cert.issuer}</p>
                {cert.credentialId && (
                  <p style={{ fontSize: '9.5px', margin: '2px 0 0', color: '#94a3b8' }}>
                    ID: {cert.credentialId}
                    {cert.credentialUrl ? ` · ${displayUrl(cert.credentialUrl)}` : ''}
                  </p>
                )}
              </div>
              <p style={{ fontSize: '9.5px', color: '#94a3b8', margin: 0, whiteSpace: 'nowrap', paddingLeft: '8px' }}>
                {formatDate(cert.issueDate)}
                {cert.expiryDate ? ` – ${formatDate(cert.expiryDate)}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {d.awards?.length > 0 && (
        <div style={sectionWrap}>
          <h2 style={heading}>Awards & Honors</h2>
          {d.awards.map((award) => (
            <div key={award.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: '600', fontSize: '11px', margin: 0, color: primary }}>{award.name}</p>
                <p style={{ fontSize: '10px', margin: '2px 0 0', color: '#6b7280' }}>{award.organization}</p>
                {award.description && (
                  <p style={{ fontSize: '10.5px', margin: '3px 0 0', color: '#374151' }}>{award.description}</p>
                )}
              </div>
              <p style={{ fontSize: '9.5px', color: '#94a3b8', margin: 0, whiteSpace: 'nowrap', paddingLeft: '8px' }}>
                {formatDate(award.date)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Courses */}
      {d.courses?.length > 0 && (
        <div style={sectionWrap}>
          <h2 style={heading}>Courses & Training</h2>
          {d.courses.map((course) => (
            <div key={course.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '600', fontSize: '11px', margin: 0, color: primary }}>{course.name}</p>
                {course.institution && (
                  <p style={{ fontSize: '10px', margin: '2px 0 0', color: '#6b7280' }}>{course.institution}</p>
                )}
              </div>
              {course.date && (
                <p style={{ fontSize: '9.5px', color: '#94a3b8', margin: 0, whiteSpace: 'nowrap', paddingLeft: '8px' }}>
                  {formatDate(course.date)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer Experience */}
      {d.volunteer?.length > 0 && (
        <div style={sectionWrap}>
          <h2 style={heading}>Volunteer Experience</h2>
          {d.volunteer.map((vol) => (
            <div key={vol.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontWeight: '600', fontSize: '11px', margin: 0, color: primary }}>{vol.role}</p>
                <p style={{ fontSize: '9.5px', color: '#94a3b8', margin: 0 }}>
                  {formatDate(vol.startDate)} – {vol.current ? 'Present' : formatDate(vol.endDate)}
                </p>
              </div>
              <p style={{ fontSize: '10px', margin: '2px 0 4px', color: '#6b7280' }}>{vol.organization}</p>
              {vol.description && (
                <p style={{ fontSize: '10.5px', margin: 0, color: '#374151' }}>{vol.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Publications */}
      {d.publications?.length > 0 && (
        <div style={sectionWrap}>
          <h2 style={heading}>Publications</h2>
          {d.publications.map((pub, i) => (
            <p key={pub.id} style={{ margin: '0 0 6px', paddingLeft: '20px', textIndent: '-20px', fontSize: '10.5px' }}>
              [{i + 1}] {pub.title}
              {pub.publisher ? `. ${pub.publisher}` : ''}
              {pub.date ? `. ${formatDate(pub.date)}` : ''}
              {pub.url ? `. ${displayUrl(pub.url)}` : ''}
            </p>
          ))}
        </div>
      )}

      {/* Interests */}
      {d.interests?.length > 0 && (
        <div style={sectionWrap}>
          <h2 style={heading}>Interests</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {d.interests.map((int) => (
              <span
                key={int.id}
                style={{
                  fontSize: '10px',
                  background: `${accent}15`,
                  color: accent,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: `1px solid ${accent}30`,
                  fontWeight: '500',
                }}
              >
                {int.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {d.references?.type === 'available' && d.references?.items?.length > 0 && (
        <div style={sectionWrap}>
          <h2 style={heading}>References</h2>
          {d.references.items.map((ref, i) => (
            <div key={ref.id || i} style={{ marginBottom: '8px' }}>
              <p style={{ fontWeight: '600', fontSize: '11px', margin: 0, color: primary }}>{ref.name}</p>
              <p style={{ fontSize: '10px', margin: '2px 0 0', color: '#6b7280' }}>
                {ref.title}{ref.company ? ` · ${ref.company}` : ''}
              </p>
              {(ref.email || ref.phone) && (
                <p style={{ fontSize: '9.5px', margin: '2px 0 0', color: '#94a3b8' }}>
                  {[ref.email, ref.phone].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {d.references?.type === 'on_request' && (
        <div style={sectionWrap}>
          <h2 style={heading}>References</h2>
          <p style={{ fontSize: '10.5px', fontStyle: 'italic', color: '#6b7280', margin: 0 }}>
            Available upon request
          </p>
        </div>
      )}

      {/* Custom Sections */}
      {d.customSections?.length > 0 && d.customSections.map((section) => (
        section.items?.length > 0 && (
          <div key={section.id} style={sectionWrap}>
            <h2 style={heading}>{section.title}</h2>
            {section.items.map((item, i) => (
              <div key={item.id || i} style={{ marginBottom: '8px' }}>
                {item.title && (
                  <p style={{ fontWeight: '600', fontSize: '11px', margin: 0, color: primary }}>{item.title}</p>
                )}
                {item.subtitle && (
                  <p style={{ fontSize: '10px', margin: '2px 0 2px', color: '#6b7280' }}>{item.subtitle}</p>
                )}
                {item.description && (
                  <p style={{ fontSize: '10.5px', margin: '2px 0 0', color: '#374151' }}>{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )
      ))}
    </>
  );
}
