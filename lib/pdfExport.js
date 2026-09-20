'use client';

/**
 * High-Fidelity Vector PDF Exporter
 * 1. Calls server-side Puppeteer API to generate crisp vector A4 PDF with active links & fonts.
 * 2. Gracefully falls back to vector print dialog if API is unreachable.
 */
export async function exportToPDF(elementId = 'cv-preview-pdf', filename = 'Resume.pdf') {
  let element = document.getElementById('cv-preview-pdf') || document.getElementById(elementId) || document.getElementById('cv-preview-page');
  if (!element) {
    throw new Error('CV preview element not found');
  }

  // Ensure filename has .pdf extension
  const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  // Clone element to sanitize styles for standalone vector PDF export
  const clone = element.cloneNode(true);

  // Remove ALL UI overlay elements (such as page break lines, badges, action buttons)
  clone.querySelectorAll('.no-print').forEach((el) => el.remove());

  // Completely wipe off-screen classes and force top-level visible styles
  clone.removeAttribute('id');
  clone.className = 'w-[210mm] mx-auto bg-white text-black font-sans';
  clone.style.cssText = 'position: relative !important; top: 0 !important; left: 0 !important; margin: 0 auto !important; width: 210mm !important; opacity: 1 !important; visibility: visible !important; display: block !important; transform: none !important; background: white !important;';

  // Sanitize all children to ensure no off-screen positioning classes remain
  clone.querySelectorAll('*').forEach((child) => {
    if (child.classList) {
      child.classList.remove('fixed', 'left-[-9999px]', 'top-[-9999px]', 'z-[-100]', 'opacity-0', 'pointer-events-none', 'hidden');
    }
    if (child.style) {
      if (child.style.position === 'fixed' || child.style.position === 'absolute') {
        child.style.position = 'relative';
      }
      child.style.left = '0';
      child.style.top = '0';
      child.style.opacity = '1';
      child.style.visibility = 'visible';
    }
  });

  const htmlContent = clone.outerHTML;

  try {
    // Attempt high-performance server-side Puppeteer generation
    const response = await fetch('/api/export-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: htmlContent,
        filename: cleanFilename,
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = cleanFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      return true;
    }
  } catch (err) {
    console.warn('Server-side PDF export error, falling back to browser vector print:', err);
  }

  // Fallback: Trigger crisp vector browser print
  window.print();
  return true;
}
