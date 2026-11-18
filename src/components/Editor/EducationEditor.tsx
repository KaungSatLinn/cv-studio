import React from 'react';
import { Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { EducationItem } from '../../types/cv';

interface EducationEditorProps {
  education: EducationItem[];
  onChange: (education: EducationItem[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({ education, onChange }) => {
  const handleUpdate = (index: number, field: keyof EducationItem, val: string) => {
    const next = [...education];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const handleAdd = () => {
    onChange([
      ...education,
      { id: Date.now(), degree: '', school: '', period: '', details: '' }
    ]);
  };

  const handleRemove = (index: number) => {
    if (education.length <= 1) return;
    onChange(education.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...education];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index === education.length - 1) return;
    const next = [...education];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  return (
    <div id="sec-education" className="bg-white rounded-3xl p-5 sm:p-6 shadow-apple-sm border border-black/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-bold flex items-center justify-center">
            6
          </span>
          <h2 className="text-base font-semibold tracking-tight">Education & Certifications</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-xl bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/15 text-xs font-medium transition flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Entry
        </button>
      </div>

      <div className="space-y-3">
        {education.map((edu, idx) => (
          <div key={edu.id || idx} className="p-3.5 rounded-2xl bg-[#F2F2F7]/60 border border-black/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                Entry #{idx + 1}
              </span>
              <div className="flex items-center gap-1">
                {/* Reorder Buttons */}
                <button
                  type="button"
                  onClick={() => handleMoveUp(idx)}
                  disabled={idx === 0}
                  className="p-1 text-neutral-400 hover:text-[#0071E3] disabled:opacity-30 disabled:hover:text-neutral-400 rounded transition cursor-pointer"
                  title="Move Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(idx)}
                  disabled={idx === education.length - 1}
                  className="p-1 text-neutral-400 hover:text-[#0071E3] disabled:opacity-30 disabled:hover:text-neutral-400 rounded transition cursor-pointer"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-xs text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleUpdate(idx, 'degree', e.target.value)}
                placeholder="Degree or Certification"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs font-medium focus:outline-none"
              />
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleUpdate(idx, 'school', e.target.value)}
                placeholder="University / Issuing Body"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs focus:outline-none"
              />
              <input
                type="text"
                value={edu.period}
                onChange={(e) => handleUpdate(idx, 'period', e.target.value)}
                placeholder="Graduation Year (e.g. 2018 – 2022)"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs focus:outline-none"
              />
              <input
                type="text"
                value={edu.details}
                onChange={(e) => handleUpdate(idx, 'details', e.target.value)}
                placeholder="GPA / Honors (optional)"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
