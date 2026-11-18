import React from 'react';

interface SummaryEditorProps {
  summary: string;
  onChange: (value: string) => void;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({ summary, onChange }) => {
  return (
    <div id="sec-summary" className="bg-white rounded-3xl p-5 sm:p-6 shadow-apple-sm border border-black/5 space-y-3">
      <div className="flex items-center gap-2.5">
        <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-bold flex items-center justify-center">
          2
        </span>
        <h2 className="text-base font-semibold tracking-tight">Professional Summary</h2>
      </div>
      <p className="text-xs text-[#86868B]">
        Highlight years of experience, core architecture strengths, and measurable impact.
      </p>
      <textarea
        rows={3}
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Software Engineer with 5+ years of experience designing scalable distributed systems, cloud-native APIs, and responsive web applications..."
        className="mac-input w-full px-3.5 py-2.5 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none leading-relaxed"
      />
    </div>
  );
};
