import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    builderMode: 'edit', // 'edit' | 'customize'
    currentStep: 0, // 0: personal, 1: summary, 2: experience, 3: education, 4: skills, 5: additional
    customizeTab: 'templates', // 'templates' | 'text' | 'layout'
    activeSection: 'personal',
    expandedSections: ['personal', 'experience'],
    zoom: 0.8,
    previewPage: 1,
    templateSelectorOpen: false,
    customizationOpen: false,
    mobileTab: 'edit', // 'edit' | 'preview' | 'customize'
    saving: false,
    exportLoading: false,
  },
  reducers: {
    setBuilderMode(state, action) {
      state.builderMode = action.payload;
    },
    setCurrentStep(state, action) {
      state.currentStep = Math.max(0, Math.min(action.payload, 5));
    },
    nextStep(state) {
      state.currentStep = Math.min(state.currentStep + 1, 5);
    },
    prevStep(state) {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    setCustomizeTab(state, action) {
      state.customizeTab = action.payload;
    },
    setActiveSection(state, action) {
      state.activeSection = action.payload;
    },
    toggleSectionExpanded(state, action) {
      const id = action.payload;
      if (state.expandedSections.includes(id)) {
        state.expandedSections = state.expandedSections.filter((s) => s !== id);
      } else {
        state.expandedSections.push(id);
      }
    },
    setZoom(state, action) {
      state.zoom = action.payload;
    },
    setPreviewPage(state, action) {
      state.previewPage = action.payload;
    },
    openTemplateSelector(state) {
      state.builderMode = 'customize';
      state.customizeTab = 'templates';
    },
    closeTemplateSelector(state) {
      state.templateSelectorOpen = false;
    },
    openCustomization(state) {
      state.builderMode = 'customize';
    },
    closeCustomization(state) {
      state.customizationOpen = false;
    },
    setMobileTab(state, action) {
      state.mobileTab = action.payload;
    },
    setSaving(state, action) {
      state.saving = action.payload;
    },
    setExportLoading(state, action) {
      state.exportLoading = action.payload;
    },
  },
});

export const {
  setBuilderMode,
  setCurrentStep,
  nextStep,
  prevStep,
  setCustomizeTab,
  setActiveSection,
  toggleSectionExpanded,
  setZoom,
  setPreviewPage,
  openTemplateSelector,
  closeTemplateSelector,
  openCustomization,
  closeCustomization,
  setMobileTab,
  setSaving,
  setExportLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
