import React from 'react';
import { ScanLine } from 'lucide-react';

interface ATSDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ATSDrawer: React.FC<ATSDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="no-print bg-white border-b border-black/10 px-4 sm:px-6 py-4 transition-all">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
            <ScanLine className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1D1D1F]">ATS Parser Compatibility Check</h3>
            <p className="text-xs text-[#86868B] mt-0.5">
              Single-column semantic hierarchy, standard section headers, machine-readable typography, and categorized skill keywords ensure maximum compatibility with modern Applicant Tracking Systems (Workday, Greenhouse, Lever).
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-medium text-[#0071E3] hover:underline self-end sm:self-center shrink-0"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
