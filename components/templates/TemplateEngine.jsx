'use client';

import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import DeveloperTemplate from './DeveloperTemplate';
import ATSTemplate from './ATSTemplate';
import SidebarTemplate from './SidebarTemplate';
import BoldTemplate from './BoldTemplate';
import ElegantTemplate from './ElegantTemplate';
import CompactTemplate from './CompactTemplate';
import NordicTemplate from './NordicTemplate';
import AcademicTemplate from './AcademicTemplate';
import StartupTemplate from './StartupTemplate';
import MagazineTemplate from './MagazineTemplate';

const templateMap = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  developer: DeveloperTemplate,
  ats: ATSTemplate,
  sidebar: SidebarTemplate,
  bold: BoldTemplate,
  elegant: ElegantTemplate,
  compact: CompactTemplate,
  nordic: NordicTemplate,
  academic: AcademicTemplate,
  startup: StartupTemplate,
  magazine: MagazineTemplate,
};

// Map of font id → Google Fonts URL parameters
const FONT_IMPORTS = {
  'Inter': 'Inter:wght@300;400;500;600;700;800',
  'Playfair Display': 'Playfair+Display:ital,wght@0,400;0,600;0,700;1,400',
  'Space Grotesk': 'Space+Grotesk:wght@300;400;500;600;700',
  'Share Tech Mono': 'Share+Tech+Mono',
  'Bebas Neue': 'Bebas+Neue',
  'Montserrat': 'Montserrat:wght@300;400;500;600;700',
  'Cormorant Garamond': 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400',
  'Plus Jakarta Sans': 'Plus+Jakarta+Sans:wght@300;400;500;600;700',
  'JetBrains Mono': 'JetBrains+Mono:wght@400;500;700',
};

// Map fontSize setting → CSS zoom value (affects all rem/px text sizes uniformly)
const FONT_ZOOM_MAP = {
  small: 0.92,
  normal: 1,
  large: 1.08,
};

// Extra padding injected via a class override (px value added around the cv-page)
const MARGIN_PADDING_MAP = {
  compact: '0px',
  normal: '0px',    // templates already have normal padding
  relaxed: '8mm',   // adds breathing room
};

export default function TemplateEngine({ cv, settings, forExport = false }) {
  const TemplateComponent = templateMap[settings.templateId] || MinimalTemplate;

  const fontFamily = settings?.typography?.fontFamily || 'Inter';
  const fontSize = settings?.typography?.fontSize || 'normal';
  const margins = settings?.spacing?.margins || 'normal';

  const fontImportParam = FONT_IMPORTS[fontFamily];
  const fontImportUrl = fontImportParam
    ? `https://fonts.googleapis.com/css2?family=${fontImportParam}&display=swap`
    : null;

  const zoomLevel = FONT_ZOOM_MAP[fontSize] ?? 1;
  const extraPadding = MARGIN_PADDING_MAP[margins] || '0px';

  return (
    <div
      style={{
        fontFamily: `'${fontFamily}', sans-serif`,
        zoom: zoomLevel,
        padding: extraPadding,
      }}
    >
      {/* Inject the user-chosen font from Google Fonts */}
      {fontImportUrl && (
        <style>{`@import url('${fontImportUrl}');
          /* Override template hard-coded fonts with user selection */
          [data-cv-engine] main,
          [data-cv-engine] .cv-page main,
          [data-cv-engine] p,
          [data-cv-engine] span,
          [data-cv-engine] li,
          [data-cv-engine] div:not([class*="font-"]) {
            font-family: '${fontFamily}', sans-serif !important;
          }
          /* Compact spacing: tighten cv-page padding */
          ${margins === 'compact' ? `
          [data-cv-engine] .cv-page {
            padding: 8mm !important;
          }
          [data-cv-engine] .cv-page main {
            gap: 12px !important;
          }
          [data-cv-engine] section {
            margin-bottom: 8px !important;
          }
          ` : ''}
          /* Relaxed spacing: add extra breathing room */
          ${margins === 'relaxed' ? `
          [data-cv-engine] .cv-page {
            padding: 22mm !important;
          }
          [data-cv-engine] .cv-page main > * + * {
            margin-top: 24px !important;
          }
          [data-cv-engine] section {
            margin-bottom: 20px !important;
          }
          ` : ''}
        `}</style>
      )}
      <div data-cv-engine>
        <TemplateComponent cv={cv} settings={settings} forExport={forExport} />
      </div>
    </div>
  );
}
