'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { demoCVData } from '@/lib/cvData';

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

// A4 at 96 DPI
const A4_W = 794;
const A4_H = 1123;

export default function TemplateThumbnail({ templateId, customCv, isSelected = false, scale, primaryColor }) {
  const storeCv = useSelector((state) => state?.cv);
  const storeSettings = useSelector((state) => state?.settings);
  const containerRef = useRef(null);

  const [autoScale, setAutoScale] = useState(typeof scale === 'number' ? scale : 0.222);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setAutoScale(width / A4_W);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const TemplateComponent = templateMap[templateId] || MinimalTemplate;

  const rawCv = customCv || storeCv || demoCVData;
  const hasUserPersonal = Boolean(rawCv?.personal?.firstName || rawCv?.personal?.lastName);

  const populatedCv = {
    ...demoCVData,
    ...rawCv,
    personal: {
      ...demoCVData.personal,
      firstName: hasUserPersonal ? rawCv.personal.firstName : 'Abdullah',
      lastName: hasUserPersonal ? rawCv.personal.lastName : 'Kishwar',
      title: rawCv?.personal?.title || 'Senior Software Engineer',
      email: rawCv?.personal?.email || 'abdullah.kishwar@email.com',
      phone: rawCv?.personal?.phone || '+1 (555) 019-2834',
      location: rawCv?.personal?.location || 'San Francisco, CA',
      linkedin: rawCv?.personal?.linkedin || 'linkedin.com/in/abdullahkishwar',
      github: rawCv?.personal?.github || 'github.com/abdullahkishwar',
      website: rawCv?.personal?.website || 'abdullahkishwar.dev',
      summary:
        rawCv?.personal?.summary ||
        'Experienced engineering leader with 8+ years building high-impact distributed web applications, developer tooling, and cloud services.',
      dob: rawCv?.personal?.dob || '',
      nationality: rawCv?.personal?.nationality || '',
      drivingLicense: rawCv?.personal?.drivingLicense || '',
    },
    experience: rawCv?.experience?.length ? rawCv.experience : demoCVData.experience,
    education: rawCv?.education?.length ? rawCv.education : demoCVData.education,
    skills: rawCv?.skills?.length ? rawCv.skills : demoCVData.skills,
    projects: rawCv?.projects?.length ? rawCv.projects : demoCVData.projects,
  };

  const templateSettings = {
    ...(storeSettings || {}),
    templateId,
    colors: {
      primary: primaryColor || storeSettings?.colors?.primary || '#111827',
      accent: primaryColor || storeSettings?.colors?.accent || '#2563eb',
      text: '#1f2937',
      background: '#ffffff',
    },
  };

  const thumbScale = scale === 'fit' ? autoScale : (typeof scale === 'number' ? scale : autoScale);

  return (
    <div
      ref={containerRef}
      className="template-thumbnail-root w-full h-full select-none pointer-events-none overflow-hidden bg-white relative"
    >
      <div
        className="template-thumbnail-inner"
        style={{
          width: A4_W,
          minHeight: A4_H,
          transform: `scale(${thumbScale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <TemplateComponent
          cv={populatedCv}
          data={populatedCv}
          settings={templateSettings}
          forExport={true}
        />
      </div>
    </div>
  );
}
