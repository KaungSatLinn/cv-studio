import React, { useState, useEffect, useRef } from 'react';
import { CVData } from './types/cv';
import { emptyTemplate, sampleTemplate, STORAGE_KEY } from './constants/templates';
import { calculateATSScore } from './utils/ats';
import { downloadJSON, downloadDirectPDF, printCV } from './utils/export';
import { Header } from './components/Header';
import { ATSDrawer } from './components/ATSDrawer';
import { MobileTabSwitcher } from './components/MobileTabSwitcher';
import { PersonalDetailsEditor } from './components/Editor/PersonalDetailsEditor';
import { SummaryEditor } from './components/Editor/SummaryEditor';
import { SkillsEditor } from './components/Editor/SkillsEditor';
import { ExperienceEditor } from './components/Editor/ExperienceEditor';
import { ProjectsEditor } from './components/Editor/ProjectsEditor';
import { EducationEditor } from './components/Editor/EducationEditor';
import { CVDocument } from './components/Preview/CVDocument';
import { ConfirmModal } from './components/ConfirmModal';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...emptyTemplate, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse saved CV data:', e);
    }
    return sampleTemplate;
  });

  const [saveStatus, setSaveStatus] = useState<string>('Saved locally');
  const [atsOpen, setAtsOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [clearModalOpen, setClearModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to localStorage whenever cvData updates
  useEffect(() => {
    try {
      setSaveStatus('Saving...');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        setSaveStatus('Saved locally');
      }, 350);
    } catch (e) {
      console.error('Storage error:', e);
      showToast('Storage quota exceeded');
    }
  }, [cvData]);

  const updateField = <K extends keyof CVData>(field: K, value: CVData[K]) => {
    setCvData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadSample = () => {
    setCvData(JSON.parse(JSON.stringify(sampleTemplate)));
    showToast('Loaded Software Engineer sample CV');
  };

  const handleClearConfirmed = () => {
    setCvData(JSON.parse(JSON.stringify(emptyTemplate)));
    showToast('All fields cleared for manual entry');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setCvData({ ...emptyTemplate, ...imported });
        showToast('CV data restored successfully');
      } catch (err) {
        showToast('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadJSON = () => {
    downloadJSON(cvData);
    showToast('CV JSON data downloaded');
  };

  const handleDownloadPDF = async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    showToast('Generating high-resolution PDF...');

    try {
      const success = await downloadDirectPDF(cvData.name);
      if (success) {
        showToast('PDF downloaded successfully!');
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast('Export failed; opening print view');
      printCV(cvData.name);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    printCV(cvData.name);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const atsScore = calculateATSScore(cvData);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] text-[#1D1D1F]">
      {/* Top macOS-style Toolbar */}
      <Header
        atsScore={atsScore}
        saveStatus={saveStatus}
        isGeneratingPDF={isGeneratingPDF}
        onToggleATS={() => setAtsOpen((prev) => !prev)}
        onLoadSample={handleLoadSample}
        onOpenClearConfirm={() => setClearModalOpen(true)}
        onImportJSON={handleImportJSON}
        onDownloadJSON={handleDownloadJSON}
        onDownloadPDF={handleDownloadPDF}
        onPrint={handlePrint}
      />

      {/* ATS Parser Insight Drawer */}
      <ATSDrawer isOpen={atsOpen} onClose={() => setAtsOpen(false)} />

      {/* Mobile Switcher */}
      <MobileTabSwitcher activeTab={mobileTab} onTabChange={setMobileTab} />

      {/* Main Workspace Split View */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">
        {/* LEFT PANEL: Form Editor */}
        <section
          id="editor-panel"
          className={`no-print lg:col-span-5 xl:col-span-5 space-y-5 pb-12 ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Step Navigation Pills */}
          <div className="bg-white rounded-2xl p-2 shadow-apple-sm border border-black/5 flex items-center gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => scrollToSection('sec-profile')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-[#F2F2F7] text-[#1D1D1F] whitespace-nowrap transition cursor-pointer"
            >
              Profile & Photo
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-summary')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-[#F2F2F7] text-[#1D1D1F] whitespace-nowrap transition cursor-pointer"
            >
              Summary
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-skills')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-[#F2F2F7] text-[#1D1D1F] whitespace-nowrap transition cursor-pointer"
            >
              Tech & Languages
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-experience')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-[#F2F2F7] text-[#1D1D1F] whitespace-nowrap transition cursor-pointer"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-projects')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-[#F2F2F7] text-[#1D1D1F] whitespace-nowrap transition cursor-pointer"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-education')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-[#F2F2F7] text-[#1D1D1F] whitespace-nowrap transition cursor-pointer"
            >
              Education
            </button>
          </div>

          {/* Form Editors */}
          <PersonalDetailsEditor
            data={cvData}
            onChange={updateField}
            onToast={showToast}
          />

          <SummaryEditor
            summary={cvData.summary}
            onChange={(val) => updateField('summary', val)}
          />

          <SkillsEditor
            skills={cvData.skills}
            onChange={(val) => updateField('skills', val)}
          />

          <ExperienceEditor
            experience={cvData.experience}
            onChange={(val) => updateField('experience', val)}
          />

          <ProjectsEditor
            projects={cvData.projects}
            onChange={(val) => updateField('projects', val)}
          />

          <EducationEditor
            education={cvData.education}
            onChange={(val) => updateField('education', val)}
          />
        </section>

        {/* RIGHT PANEL: Live A4 Document Preview */}
        <div
          id="preview-wrapper"
          className={`${
            mobileTab === 'editor' ? 'hidden lg:block' : 'block'
          } lg:col-span-7 xl:col-span-7 print-container`}
        >
          <CVDocument data={cvData} />
        </div>
      </main>

      {/* Confirmation Dialog */}
      <ConfirmModal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        onConfirm={handleClearConfirmed}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
