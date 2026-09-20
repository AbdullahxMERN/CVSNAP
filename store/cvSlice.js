import { createSlice } from '@reduxjs/toolkit';
import { defaultCVData, demoCVData } from '@/lib/cvData';

const cvSlice = createSlice({
  name: 'cv',
  initialState: defaultCVData,
  reducers: {
    // Personal details
    updatePersonal(state, action) {
      state.personal = { ...state.personal, ...action.payload };
    },

    // Experience
    addExperience(state) {
      state.experience.push({
        id: `exp-${Date.now()}`,
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      });
    },
    updateExperience(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.experience.findIndex((e) => e.id === id);
      if (idx !== -1) state.experience[idx][field] = value;
    },
    removeExperience(state, action) {
      state.experience = state.experience.filter((e) => e.id !== action.payload);
    },
    duplicateExperience(state, action) {
      const item = state.experience.find((e) => e.id === action.payload);
      if (item) state.experience.push({ ...item, id: `exp-${Date.now()}` });
    },
    reorderExperience(state, action) {
      state.experience = action.payload;
    },
    addAchievement(state, action) {
      const { id, text } = action.payload;
      const idx = state.experience.findIndex((e) => e.id === id);
      if (idx !== -1) state.experience[idx].achievements.push(text);
    },
    updateAchievement(state, action) {
      const { expId, achIdx, text } = action.payload;
      const idx = state.experience.findIndex((e) => e.id === expId);
      if (idx !== -1) state.experience[idx].achievements[achIdx] = text;
    },
    removeAchievement(state, action) {
      const { expId, achIdx } = action.payload;
      const idx = state.experience.findIndex((e) => e.id === expId);
      if (idx !== -1) state.experience[idx].achievements.splice(achIdx, 1);
    },

    // Education
    addEducation(state) {
      state.education.push({
        id: `edu-${Date.now()}`,
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        grade: '',
        description: '',
      });
    },
    updateEducation(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.education.findIndex((e) => e.id === id);
      if (idx !== -1) state.education[idx][field] = value;
    },
    removeEducation(state, action) {
      state.education = state.education.filter((e) => e.id !== action.payload);
    },
    duplicateEducation(state, action) {
      const item = state.education.find((e) => e.id === action.payload);
      if (item) state.education.push({ ...item, id: `edu-${Date.now()}` });
    },
    reorderEducation(state, action) {
      state.education = action.payload;
    },

    // Skills
    addSkill(state, action) {
      if (typeof action.payload === 'object' && action.payload !== null) {
        state.skills.push({
          id: action.payload.id || `sk-${Date.now()}`,
          name: action.payload.name || '',
          level: action.payload.level || 'Experienced',
        });
      } else {
        state.skills.push({
          id: `sk-${Date.now()}`,
          name: action.payload,
          level: 'Experienced',
        });
      }
    },
    updateSkill(state, action) {
      const { id, level, name } = action.payload;
      const idx = state.skills.findIndex((s) => s.id === id);
      if (idx !== -1) {
        if (level !== undefined) state.skills[idx].level = level;
        if (name !== undefined) state.skills[idx].name = name;
      }
    },
    removeSkill(state, action) {
      state.skills = state.skills.filter((s) => s.id !== action.payload);
    },
    reorderSkills(state, action) {
      state.skills = action.payload;
    },

    // Projects
    addProject(state) {
      state.projects.push({
        id: `pr-${Date.now()}`,
        name: '',
        description: '',
        technologies: [],
        role: '',
        achievements: [],
        liveUrl: '',
        githubUrl: '',
      });
    },
    updateProject(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.projects.findIndex((p) => p.id === id);
      if (idx !== -1) state.projects[idx][field] = value;
    },
    removeProject(state, action) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    duplicateProject(state, action) {
      const item = state.projects.find((p) => p.id === action.payload);
      if (item) state.projects.push({ ...item, id: `pr-${Date.now()}` });
    },
    reorderProjects(state, action) {
      state.projects = action.payload;
    },

    // Certifications
    addCertification(state) {
      state.certifications.push({
        id: `cert-${Date.now()}`,
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
      });
    },
    updateCertification(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.certifications.findIndex((c) => c.id === id);
      if (idx !== -1) state.certifications[idx][field] = value;
    },
    removeCertification(state, action) {
      state.certifications = state.certifications.filter((c) => c.id !== action.payload);
    },

    // Languages
    addLanguage(state) {
      state.languages.push({ id: `lang-${Date.now()}`, language: '', proficiency: 'Conversational' });
    },
    updateLanguage(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.languages.findIndex((l) => l.id === id);
      if (idx !== -1) state.languages[idx][field] = value;
    },
    removeLanguage(state, action) {
      state.languages = state.languages.filter((l) => l.id !== action.payload);
    },

    // Awards
    addAward(state) {
      state.awards.push({ id: `aw-${Date.now()}`, name: '', organization: '', date: '', description: '' });
    },
    updateAward(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.awards.findIndex((a) => a.id === id);
      if (idx !== -1) state.awards[idx][field] = value;
    },
    removeAward(state, action) {
      state.awards = state.awards.filter((a) => a.id !== action.payload);
    },

    // Courses
    addCourse(state) {
      state.courses.push({ id: `crs-${Date.now()}`, name: '', provider: '', date: '', description: '', url: '' });
    },
    updateCourse(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.courses.findIndex((c) => c.id === id);
      if (idx !== -1) state.courses[idx][field] = value;
    },
    removeCourse(state, action) {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
    },

    // Volunteer
    addVolunteer(state) {
      state.volunteer.push({
        id: `vol-${Date.now()}`,
        organization: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      });
    },
    updateVolunteer(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.volunteer.findIndex((v) => v.id === id);
      if (idx !== -1) state.volunteer[idx][field] = value;
    },
    removeVolunteer(state, action) {
      state.volunteer = state.volunteer.filter((v) => v.id !== action.payload);
    },

    // Publications
    addPublication(state) {
      state.publications.push({ id: `pub-${Date.now()}`, title: '', publisher: '', date: '', url: '', description: '' });
    },
    updatePublication(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.publications.findIndex((p) => p.id === id);
      if (idx !== -1) state.publications[idx][field] = value;
    },
    removePublication(state, action) {
      state.publications = state.publications.filter((p) => p.id !== action.payload);
    },

    // Interests
    addInterest(state, action) {
      state.interests.push({ id: `int-${Date.now()}`, name: action.payload });
    },
    removeInterest(state, action) {
      state.interests = state.interests.filter((i) => i.id !== action.payload);
    },

    // References
    updateReferences(state, action) {
      state.references = { ...state.references, ...action.payload };
    },
    addReference(state) {
      state.references.items.push({
        id: `ref-${Date.now()}`,
        name: '',
        position: '',
        company: '',
        email: '',
        phone: '',
      });
    },
    updateReference(state, action) {
      const { id, field, value } = action.payload;
      const idx = state.references.items.findIndex((r) => r.id === id);
      if (idx !== -1) state.references.items[idx][field] = value;
    },
    removeReference(state, action) {
      state.references.items = state.references.items.filter((r) => r.id !== action.payload);
    },

    // Custom sections
    addCustomSection(state, action) {
      if (action.payload && typeof action.payload === 'object') {
        state.customSections.push(action.payload);
      } else {
        state.customSections.push({
          id: `cs-${Date.now()}`,
          title: 'Custom Section',
          content: '',
        });
      }
    },
    updateCustomSection(state, action) {
      const { id, title, content } = action.payload;
      const idx = state.customSections.findIndex((s) => s.id === id);
      if (idx !== -1) {
        if (title !== undefined) state.customSections[idx].title = title;
        if (content !== undefined) state.customSections[idx].content = content;
      }
    },
    removeCustomSection(state, action) {
      state.customSections = state.customSections.filter((s) => s.id !== action.payload);
    },

    // Reset / Load
    resetCV(state) {
      return defaultCVData;
    },
    loadDemoData(state) {
      return demoCVData;
    },
    loadCV(state, action) {
      return action.payload;
    },
  },
});

export const {
  updatePersonal,
  addExperience, updateExperience, removeExperience, duplicateExperience, reorderExperience,
  addAchievement, updateAchievement, removeAchievement,
  addEducation, updateEducation, removeEducation, duplicateEducation, reorderEducation,
  addSkill, updateSkill, removeSkill, reorderSkills,
  addProject, updateProject, removeProject, duplicateProject, reorderProjects,
  addCertification, updateCertification, removeCertification,
  addLanguage, updateLanguage, removeLanguage,
  addAward, updateAward, removeAward,
  addCourse, updateCourse, removeCourse,
  addVolunteer, updateVolunteer, removeVolunteer,
  addPublication, updatePublication, removePublication,
  addInterest, removeInterest,
  updateReferences, addReference, updateReference, removeReference,
  addCustomSection, updateCustomSection, removeCustomSection,
  resetCV, loadDemoData, loadCV,
} = cvSlice.actions;

export default cvSlice.reducer;
