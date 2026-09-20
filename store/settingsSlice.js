import { createSlice } from '@reduxjs/toolkit';

const defaultSectionOrder = [
  'personal',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'awards',
  'courses',
  'volunteer',
  'publications',
  'interests',
  'references',
];

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    templateId: 'minimal',
    colors: {
      primary: '#0f172a',
      accent: '#6366f1',
      text: '#1e293b',
      background: '#ffffff',
    },
    typography: {
      fontFamily: 'Inter',
      headingSize: 'md',
      bodySize: 'sm',
      lineHeight: 'normal',
    },
    spacing: {
      margins: 'normal',
      sectionSpacing: 'normal',
    },
    layout: {
      photoVisible: true,
      columns: 'single',
    },
    sectionOrder: defaultSectionOrder,
    hiddenSections: [],
    cvName: 'My CV',
    lastSaved: null,
  },
  reducers: {
    setTemplate(state, action) {
      state.templateId = action.payload;
    },
    updateColors(state, action) {
      state.colors = { ...state.colors, ...action.payload };
    },
    updateTypography(state, action) {
      state.typography = { ...state.typography, ...action.payload };
    },
    updateSpacing(state, action) {
      state.spacing = { ...state.spacing, ...action.payload };
    },
    updateLayout(state, action) {
      state.layout = { ...state.layout, ...action.payload };
    },
    setSectionOrder(state, action) {
      state.sectionOrder = action.payload;
    },
    hideSection(state, action) {
      if (!state.hiddenSections.includes(action.payload)) {
        state.hiddenSections.push(action.payload);
      }
    },
    showSection(state, action) {
      state.hiddenSections = state.hiddenSections.filter((s) => s !== action.payload);
    },
    setCVName(state, action) {
      state.cvName = action.payload;
    },
    setLastSaved(state, action) {
      state.lastSaved = action.payload;
    },
    applyColorPreset(state, action) {
      const presets = {
        slate: { primary: '#0f172a', accent: '#6366f1', text: '#1e293b', background: '#ffffff' },
        ocean: { primary: '#0c4a6e', accent: '#0ea5e9', text: '#0f172a', background: '#ffffff' },
        forest: { primary: '#14532d', accent: '#22c55e', text: '#1e293b', background: '#ffffff' },
        rose: { primary: '#881337', accent: '#f43f5e', text: '#1e293b', background: '#ffffff' },
        amber: { primary: '#78350f', accent: '#f59e0b', text: '#1e293b', background: '#ffffff' },
        violet: { primary: '#4c1d95', accent: '#8b5cf6', text: '#1e293b', background: '#ffffff' },
        mono: { primary: '#000000', accent: '#000000', text: '#111111', background: '#ffffff' },
      };
      if (presets[action.payload]) {
        state.colors = presets[action.payload];
      }
    },
  },
});

export const {
  setTemplate,
  updateColors,
  updateTypography,
  updateSpacing,
  updateLayout,
  setSectionOrder,
  hideSection,
  showSection,
  setCVName,
  setLastSaved,
  applyColorPreset,
} = settingsSlice.actions;

export default settingsSlice.reducer;
