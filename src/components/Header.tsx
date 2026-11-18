import React, { useRef } from 'react';
import { Terminal, ShieldCheck, Sparkles, RotateCcw, Upload, FileJson, Download, Printer, Loader2 } from 'lucide-react';

interface HeaderProps {
  atsScore: number;
  saveStatus: string;
  isGeneratingPDF: boolean;
  onToggleATS: () => void;
  onLoadSample: () => void;
  onOpenClearConfirm: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadJSON: () => void;
  onDownloadPDF: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  atsScore,
  saveStatus,
  isGeneratingPDF,
  onToggleATS,
  onLoadSample,
  onOpenClearConfirm,
  onImportJSON,
  onDownloadJSON,
  onDownloadPDF,
  onPrint
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="no-print sticky top-0 z-40 mac-glass border-b border-black/5 px-4 sm:px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: macOS Window Controls & Title */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10"></span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1D1D1F] to-neutral-700 text-white flex items-center justify-center shadow-sm">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-[#1D1D1F] leading-none">CV Studio</h1>
              <p className="text-[11px] text-[#86868B] mt-0.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                ATS-Pass Ready • <span>{saveStatus}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* ATS Score Pill */}
          <button
            type="button"
            onClick={onToggleATS}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-medium cursor-pointer hover:bg-emerald-500/15 transition"
            title="Click to view ATS parser checklist"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ATS Score: <strong>{atsScore}%</strong></span>
          </button>

          {/* Load Sample */}
          <button
            type="button"
            onClick={onLoadSample}
            title="Fill with Software Engineer sample"
            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#1D1D1F] bg-white border border-black/10 hover:bg-neutral-50 active:scale-[0.98] transition flex items-center gap-1.5 shadow-apple-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
            <span className="hidden sm:inline">Sample Data</span>
          </button>

          {/* Clear Form */}
          <button
            type="button"
            onClick={onOpenClearConfirm}
            title="Clear all fields to start fresh"
            className="px-3 py-1.5 rounded-full text-xs font-medium text-red-600 bg-white border border-black/10 hover:bg-red-50 active:scale-[0.98] transition flex items-center gap-1.5 shadow-apple-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <div className="h-4 w-[1px] bg-black/10 mx-0.5 hidden sm:block"></div>

          {/* Import JSON */}
          <label className="cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium text-[#1D1D1F] bg-white border border-black/10 hover:bg-neutral-50 active:scale-[0.98] transition flex items-center gap-1.5 shadow-apple-sm">
            <Upload className="w-3.5 h-3.5 text-[#86868B]" />
            <span>Import</span>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              className="hidden"
              onChange={onImportJSON}
            />
          </label>

          {/* Save JSON */}
          <button
            type="button"
            onClick={onDownloadJSON}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#1D1D1F] bg-white border border-black/10 hover:bg-neutral-50 active:scale-[0.98] transition flex items-center gap-1.5 shadow-apple-sm"
          >
            <FileJson className="w-3.5 h-3.5 text-[#86868B]" />
            <span className="hidden sm:inline">Save Data</span>
          </button>

          {/* Print / System Dialog */}
          <button
            type="button"
            onClick={onPrint}
            title="Print or Save via Browser Dialog"
            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#1D1D1F] bg-white border border-black/10 hover:bg-neutral-50 active:scale-[0.98] transition flex items-center gap-1.5 shadow-apple-sm"
          >
            <Printer className="w-3.5 h-3.5 text-[#86868B]" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Direct Download PDF */}
          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] disabled:opacity-70 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
