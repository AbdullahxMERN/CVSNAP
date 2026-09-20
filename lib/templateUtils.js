// Shared utility functions used across all CV templates
import { loadCV, resetCV } from '@/store/cvSlice';
import { setTemplate, updateColors, updateTypography } from '@/store/settingsSlice';
import { demoCVData } from '@/lib/cvData';

/**
 * Print / page-break CSS injected by every template via a <style> block.
 * Ensures content flows naturally onto a second (or third) page when printing / exporting to PDF.
 */
export const PRINT_CSS = `
  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }
    html, body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    /* CV page container - allow natural multi-page flow without clipping */
    .cv-page {
      box-shadow: none !important;
      border: none !important;
      width: 210mm !important;
      max-width: 210mm !important;
      min-height: 297mm !important;
      margin: 0 auto !important;
      overflow: visible !important;
      page-break-inside: auto;
      break-inside: auto;
    }

    /* Sections and entries must not break awkwardly across page splits */
    section, .page-section, .cv-item, .experience-item, .education-item, .project-item, .cert-item, article {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    /* Keep section headings attached to their content */
    h1, h2, h3, h4, .section-title, .section-header {
      break-after: avoid !important;
      page-break-after: avoid !important;
    }

    /* Hide UI overlays in print mode */
    .no-print, .cv-page-break-line {
      display: none !important;
    }
  }
`;

export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  } catch {
    return dateStr;
  }
}

export function displayUrl(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function fullName(personal) {
  return `${personal?.firstName || ''} ${personal?.lastName || ''}`.trim();
}

export function hasContent(arr) {
  return arr && arr.length > 0;
}

/**
 * Resume.io-style Page Splitter
 * Analyzes CV data size and cleanly partitions items into Page 1 and Page 2 data structures.
 */
export function getCvPages(cv) {
  const d = cv || {};
  const exp = d.experience || [];
  const edu = d.education || [];
  const proj = d.projects || [];
  const certs = d.certifications || [];
  const langs = d.languages || [];
  const awards = d.awards || [];
  const vol = d.volunteer || [];
  const custom = d.customSections || [];
  const skills = d.skills || [];

  // Calculate content weight score
  let score = 0;
  if (d.personal?.summary) score += Math.ceil((d.personal.summary.length || 0) / 90);
  exp.forEach(e => { score += 3.5 + Math.ceil(((e.description || '').length) / 100); });
  edu.forEach(e => { score += 2; });
  proj.forEach(p => { score += 2.5 + Math.ceil(((p.description || '').length) / 100); });
  certs.forEach(() => score += 1.2);
  score += Math.ceil((skills.length || 0) * 0.3);
  custom.forEach(c => { score += 2 + Math.ceil(((c.content || '').length) / 100); });

  // If content score <= 13, everything fits on 1 page!
  if (score <= 13) {
    return {
      totalPages: 1,
      pages: [{ ...d, isPage1: true, isPage2: false, pageNumber: 1, totalPages: 1 }],
    };
  }

  // 2-Page Split logic (Resume.io style)
  const p1Exp = exp.slice(0, 2);
  const p2Exp = exp.slice(2);

  const p1Edu = p1Exp.length > 0 ? edu.slice(0, 1) : edu.slice(0, 2);
  const p2Edu = p1Exp.length > 0 ? edu.slice(1) : edu.slice(2);

  const p1Skills = skills.slice(0, 8);
  const p2Skills = skills.slice(8);

  const page1 = {
    ...d,
    experience: p1Exp,
    education: p1Edu,
    skills: p1Skills,
    projects: [],
    certifications: [],
    languages: langs,
    awards: [],
    volunteer: [],
    customSections: [],
    pageNumber: 1,
    totalPages: 2,
    isPage1: true,
    isPage2: false,
  };

  const page2 = {
    ...d,
    summary: '',
    profile: '',
    objective: '',
    personal: {
      ...d.personal,
      summary: '', // Clear summary so it is NOT duplicated on Page 2
      profile: '',
      objective: '',
      photo: null,
      photoUrl: null,
    },
    experience: p2Exp,
    education: p2Edu,
    skills: p2Skills,
    projects: proj,
    certifications: certs,
    languages: [],
    awards: awards,
    volunteer: vol,
    customSections: custom,
    pageNumber: 2,
    totalPages: 2,
    isPage1: false,
    isPage2: true,
  };

  return {
    totalPages: 2,
    pages: [page1, page2],
  };
}

export function selectTemplateWith2SecPreview(templateId, dispatch, colors, font) {
  // 1. Set template & styles
  dispatch(setTemplate(templateId));
  if (colors) dispatch(updateColors(colors));
  if (font) dispatch(updateTypography({ fontFamily: font }));

  // 2. Load default demo sample CV data for preview
  dispatch(loadCV(demoCVData));

  // 3. Notify PreviewPanel that a new template demo preview is active
  if (typeof window !== 'undefined') {
    window.__demoPreviewActive = true;
    window.dispatchEvent(new CustomEvent('demoPreviewRequested', { detail: { templateId } }));
  }
}
