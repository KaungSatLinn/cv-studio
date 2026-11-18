import React from 'react';
import { Plus, X, ChevronUp, ChevronDown } from 'lucide-react';
import { SkillCategory } from '../../types/cv';

interface SkillsEditorProps {
  skills: SkillCategory[];
  onChange: (skills: SkillCategory[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, onChange }) => {
  const handleUpdate = (index: number, field: keyof SkillCategory, val: string) => {
    const next = [...skills];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const handleAdd = () => {
    onChange([...skills, { id: Date.now(), category: '', items: '' }]);
  };

  const handleRemove = (index: number) => {
    if (skills.length <= 1) return;
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...skills];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index === skills.length - 1) return;
    const next = [...skills];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  return (
    <div id="sec-skills" className="bg-white rounded-3xl p-5 sm:p-6 shadow-apple-sm border border-black/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-bold flex items-center justify-center">
            3
          </span>
          <h2 className="text-base font-semibold tracking-tight">Technical and Language Skills</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-2.5 py-1 rounded-lg bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/15 text-xs font-medium transition flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Group
        </button>
      </div>
      <p className="text-xs text-[#86868B]">
        Categorized comma-separated lists ensure 100% ATS keyword extraction. Use arrows to reorder groups.
      </p>

      <div className="space-y-3">
        {skills.map((skill, idx) => (
          <div key={skill.id || idx} className="p-3 rounded-2xl bg-[#F2F2F7]/60 border border-black/5 space-y-2 relative group">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={skill.category}
                onChange={(e) => handleUpdate(idx, 'category', e.target.value)}
                placeholder="Category (e.g. Languages)"
                className="mac-input flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-black/10 text-xs font-semibold focus:outline-none"
              />

              <div className="flex items-center gap-0.5">
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
                  disabled={idx === skills.length - 1}
                  className="p-1 text-neutral-400 hover:text-[#0071E3] disabled:opacity-30 disabled:hover:text-neutral-400 rounded transition cursor-pointer"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="p-1 text-neutral-400 hover:text-red-600 rounded transition ml-1 cursor-pointer"
                    title="Remove group"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
            <input
              type="text"
              value={skill.items}
              onChange={(e) => handleUpdate(idx, 'items', e.target.value)}
              placeholder="e.g. TypeScript, Go, Python, React, AWS, Docker"
              className="mac-input w-full px-2.5 py-1.5 rounded-lg bg-white border border-black/10 text-xs focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
