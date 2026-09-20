import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {
  let browser = null;

  try {
    const { html, filename = 'resume.pdf' } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // Launch headless browser with optimized flags
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--font-render-hinting=none',
      ],
    });

    const page = await browser.newPage();

    // Set A4 viewport resolution
    await page.setViewport({
      width: 794, // 210mm @ 96 DPI
      height: 1123, // 297mm @ 96 DPI
      deviceScaleFactor: 2, // High-DPI crisp vector rendering
    });

    // Complete HTML wrapper including Tailwind CDN and Print Styles
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              size: 210mm 297mm;
              margin: 0;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background-color: #ffffff !important;
              width: 210mm !important;
            }
            .no-print {
              display: none !important;
            }
            #pdf-root {
              position: relative !important;
              top: 0 !important;
              left: 0 !important;
              margin: 0 auto !important;
              opacity: 1 !important;
              visibility: visible !important;
              display: block !important;
              width: 210mm !important;
            }
            .cv-page-export {
              width: 210mm !important;
              height: 297mm !important;
              max-height: 297mm !important;
              box-sizing: border-box !important;
              overflow: hidden !important;
              margin: 0 auto !important;
              background: white !important;
              page-break-after: always !important;
              break-after: page !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              box-shadow: none !important;
              border: none !important;
            }
            .cv-page-export:last-child, .cv-page-export:last-of-type {
              page-break-after: avoid !important;
              break-after: avoid !important;
              page-break-before: avoid !important;
              break-before: avoid !important;
            }
            h1, h2, h3, h4, header {
              break-after: avoid !important;
              page-break-after: avoid !important;
            }
            a {
              color: inherit;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div id="pdf-root">
            ${html}
          </div>
        </body>
      </html>
    `;

    // Load HTML content
    await page.setContent(fullHtml, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
      timeout: 30000,
    });

    // Ensure all web fonts (Google Fonts) are loaded
    await page.evaluateHandle('document.fonts.ready');

    // Generate A4 PDF Buffer with vector links preserved
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    });

    await page.close();
    await browser.close();

    // Return PDF stream with download headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    if (browser) await browser.close();
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  }
}
