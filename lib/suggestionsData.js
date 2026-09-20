// Pre-written phrases and smart suggestions inspired by Resume.io for fast, high-quality CV generation

export const SUMMARY_CATEGORIES = [
  {
    id: 'tech',
    label: 'Tech & Engineering',
    summaries: [
      'Innovative Full-Stack Developer with 6+ years of experience building scalable web applications and cloud architectures. Proficient in React, Node.js, and modern DevOps pipelines with a focus on code quality and system performance.',
      'Results-driven Software Engineer specialized in frontend architectures, microservices, and distributed systems. Track record of cutting latency by 40% and optimizing critical user flows.',
      'Detail-oriented DevOps / Cloud Engineer with proven expertise in AWS, Kubernetes, and automated CI/CD workflows that accelerate deployment cycles and ensure 99.99% uptime.',
    ],
  },
  {
    id: 'design',
    label: 'Product & Design',
    summaries: [
      'Creative Product Designer with 7+ years of experience creating intuitive digital experiences for high-growth startups and enterprise platforms. Adept in UX research, design systems, and rapid prototyping.',
      'Passionate UI/UX Specialist dedicated to user-centered design, iterative testing, and cross-functional team collaboration that boosts user engagement and retention.',
      'Brand & Visual Designer with a sharp eye for aesthetics, typography, and interactive storytelling across digital and print mediums.',
    ],
  },
  {
    id: 'management',
    label: 'Leadership & Mgmt',
    summaries: [
      'Strategic Product Manager with 5+ years of experience driving product vision, customer discovery, and sprint execution. Led cross-functional squads to launch 4 tier-1 SaaS products.',
      'High-impact Engineering Manager adept at coaching talent, aligning technical roadmaps with business OKRs, and establishing agile best practices across distributed teams.',
      'Seasoned Project Manager recognized for delivering complex $2M+ enterprise initiatives on time, within budget, and with high stakeholder satisfaction.',
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Sales',
    summaries: [
      'Data-driven Growth Marketer skilled in SEO, paid acquisition, lifecycle email marketing, and conversion rate optimization (CRO) that yielded 140% YoY revenue growth.',
      'Dynamic Brand Strategist with expertise in content marketing, social media campaigns, and influencer partnerships that amplify market presence and brand recall.',
      'Account Executive and Sales Specialist with consistent quota overachievement (125%+), specializing in B2B SaaS deal cycles and enterprise client relations.',
    ],
  },
  {
    id: 'student',
    label: 'Student / Entry-Level',
    summaries: [
      'Motivated Computer Science graduate with strong foundational knowledge in data structures, web development, and modern JavaScript frameworks. Eager to contribute to high-velocity engineering teams.',
      'Recent Business & Design graduate with internship experience in project coordination and market research. Fast learner with strong analytical and communication skills.',
      'Ambitious self-taught developer with portfolio of full-stack projects and active contributions to open-source tools. Ready to tackle challenging software development roles.',
    ],
  },
];

export const SUMMARY_TONES = [
  { id: 'impactful', label: '🎯 Impactful', prefix: 'Results-driven professional recognized for ' },
  { id: 'technical', label: '⚙️ Technical', prefix: 'Technically proficient specialist with deep expertise in ' },
  { id: 'executive', label: '💎 Executive', prefix: 'Forward-thinking strategist with extensive experience spearheading ' },
  { id: 'creative', label: '🎨 Creative', prefix: 'Visionary creative dedicated to crafting memorable and intuitive ' },
  { id: 'concise', label: '⚡ Concise', prefix: 'Proven performer with solid track record in ' },
];

export const ROLE_BULLET_SUGGESTIONS = {
  'Software Engineer': [
    'Architected and deployed high-traffic RESTful APIs serving 2M+ monthly active requests.',
    'Reduced database query execution times by 55% by introducing Redis caching and indexing optimizations.',
    'Spearheaded transition from legacy monolith to decoupled microservices using Docker and Kubernetes.',
    'Integrated comprehensive unit and integration testing suite, lifting code coverage from 45% to 88%.',
  ],
  'Product Designer': [
    'Designed end-to-end user onboarding experience, increasing 7-day activation rate by 28%.',
    'Created and maintained centralized Figma design system used across 6 engineering squads.',
    'Conducted 40+ moderated usability test sessions to identify critical UX friction points.',
    'Partnered closely with front-end engineers to ensure pixel-perfect implementation of UI components.',
  ],
  'Product Manager': [
    'Defined product roadmap and feature prioritization based on qualitative user feedback and quantitative product analytics.',
    'Launched core subscription tier generating $850K in incremental ARR in its first 2 quarters.',
    'Facilitated daily standups, sprint planning, and retrospective meetings for a team of 10 developers.',
    'Authored detailed PRDs and user stories with clear acceptance criteria that reduced rework by 35%.',
  ],
  'Marketing Specialist': [
    'Managed paid advertising budget of $50K/month across Google, LinkedIn, and Meta, achieving a 3.8x ROAS.',
    'Produced weekly email newsletter growing subscriber base from 5K to 45K with a 32% open rate.',
    'Optimized landing page conversion rates by 22% through structured A/B split testing.',
    'Coordinated multi-channel product launch campaigns that drove #1 ranking on Product Hunt.',
  ],
  'General / Universal': [
    'Spearheaded core process improvement that saved 12+ team hours each sprint.',
    'Collaborated with cross-functional team of 8 to deliver key quarterly deliverables 2 weeks early.',
    'Mentored junior team members on industry best practices and quality standards.',
    'Streamlined reporting workflows, improving executive visibility and decision velocity.',
  ],
};

export const SKILL_CATEGORIES = {
  'Frontend & Web': ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5/CSS3', 'Vue.js', 'Redux / Zustand', 'WebSockets', 'GraphQL'],
  'Backend & Cloud': ['Node.js', 'Python', 'Go', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'REST APIs', 'Serverless'],
  'Design & UX': ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Wireframing', 'Prototyping', 'Interaction Design', 'Accessibility (a11y)', 'Mobile Design'],
  'Product & Agile': ['Product Strategy', 'Agile / Scrum', 'Jira', 'Roadmapping', 'A/B Testing', 'Data Analytics', 'Stakeholder Management', 'User Stories'],
  'Soft Skills': ['Cross-Functional Leadership', 'Problem Solving', 'Clear Communication', 'Team Mentorship', 'Critical Thinking', 'Adaptability', 'Time Management'],
};

/**
 * Calculates dynamic resume completeness score (0 - 100%) and returns step-specific advice
 */
export function calculateResumeScore(cv) {
  let score = 0;
  const missingSteps = [];
  const quickActions = [];

  // Personal details (25%)
  if (cv?.personal?.firstName && cv?.personal?.lastName) {
    score += 10;
  } else {
    missingSteps.push('personal');
    quickActions.push({ step: 0, label: '+10% Add name', field: 'name' });
  }

  if (cv?.personal?.email && cv?.personal?.phone) {
    score += 10;
  } else {
    quickActions.push({ step: 0, label: '+10% Add email & phone', field: 'contact' });
  }

  if (cv?.personal?.title) {
    score += 5;
  } else {
    quickActions.push({ step: 0, label: '+5% Add job title', field: 'title' });
  }

  // Summary (15%)
  if (cv?.personal?.summary && cv.personal.summary.trim().length > 30) {
    score += 15;
  } else {
    missingSteps.push('summary');
    quickActions.push({ step: 1, label: '+15% Add summary', field: 'summary' });
  }

  // Experience (30%)
  if (cv?.experience && cv.experience.length > 0) {
    score += 20;
    const hasBullets = cv.experience.some(
      (e) => (e.achievements && e.achievements.length > 0) || (e.description && e.description.trim().length > 10)
    );
    if (hasBullets) {
      score += 10;
    } else {
      quickActions.push({ step: 2, label: '+10% Add achievements', field: 'bullets' });
    }
  } else {
    missingSteps.push('experience');
    quickActions.push({ step: 2, label: '+20% Add job history', field: 'experience' });
  }

  // Education (10%)
  if (cv?.education && cv.education.length > 0) {
    score += 10;
  } else {
    missingSteps.push('education');
    quickActions.push({ step: 3, label: '+10% Add education', field: 'education' });
  }

  // Skills (10%)
  if (cv?.skills && cv.skills.length >= 3) {
    score += 10;
  } else {
    missingSteps.push('skills');
    quickActions.push({ step: 4, label: '+10% Add skills', field: 'skills' });
  }

  // Extra credit: Projects / Certifications / Languages
  if ((cv?.projects && cv.projects.length > 0) || (cv?.certifications && cv.certifications.length > 0)) {
    score = Math.min(100, score + 10);
  }

  return {
    score: Math.min(score, 100),
    missingSteps,
    nextAction: quickActions[0] || null,
    isComplete: score >= 85,
  };
}
