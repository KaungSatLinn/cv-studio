import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { ExperienceItem } from '../../types/cv';

interface ExperienceEditorProps {
  experience: ExperienceItem[];
  onChange: (experience: ExperienceItem[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ experience, onChange }) => {
  const handleUpdate = (index: number, field: keyof ExperienceItem, val: string) => {
    const next = [...experience];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const handleAdd = () => {
    onChange([
      ...experience,
      { id: Date.now(), role: '', company: '', location: '', period: '', bullets: '' }
    ]);
  };

  const handleRemove = (index: number) => {
    if (experience.length <= 1) return;
    onChange(experience.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...experience];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index === experience.length - 1) return;
    const next = [...experience];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  return (
    <div id="sec-experience" className="bg-white rounded-3xl p-5 sm:p-6 shadow-apple-sm border border-black/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-bold flex items-center justify-center">
            4
          </span>
          <h2 className="text-base font-semibold tracking-tight">Work Experience</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-xl bg-[#0071E3] text-white hover:bg-[#0077ED] text-xs font-medium transition flex items-center gap-1 shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Role
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp, idx) => (
          <div key={exp.id || idx} className="p-4 rounded-2xl bg-[#F2F2F7]/60 border border-black/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                Position #{idx + 1}
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
                  disabled={idx === experience.length - 1}
                  className="p-1 text-neutral-400 hover:text-[#0071E3] disabled:opacity-30 disabled:hover:text-neutral-400 rounded transition cursor-pointer"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 ml-2 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                value={exp.role}
                onChange={(e) => handleUpdate(idx, 'role', e.target.value)}
                placeholder="Job Title (e.g. Senior Software Engineer)"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs font-medium focus:outline-none"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleUpdate(idx, 'company', e.target.value)}
                placeholder="Company Name"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs focus:outline-none"
              />
              <input
                type="text"
                value={exp.period}
                onChange={(e) => handleUpdate(idx, 'period', e.target.value)}
                placeholder="Dates (e.g. Jan 2023 – Present)"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs focus:outline-none"
              />
              <input
                type="text"
                value={exp.location}
                onChange={(e) => handleUpdate(idx, 'location', e.target.value)}
                placeholder="Location (e.g. Remote / NY)"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#86868B] mb-1">
                Impact Bullets (One achievement per line)
              </label>
              <textarea
                rows={3}
                value={exp.bullets}
                onChange={(e) => handleUpdate(idx, 'bullets', e.target.value)}
                placeholder="• Built scalable microservice handling 10k req/s...&#10;• Reduced cloud infrastructure spend by 25%..."
                className="mac-input w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs leading-relaxed focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
