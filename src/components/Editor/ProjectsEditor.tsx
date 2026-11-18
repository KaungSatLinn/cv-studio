import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { ProjectItem } from '../../types/cv';

interface ProjectsEditorProps {
  projects: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ projects, onChange }) => {
  const handleUpdate = (index: number, field: keyof ProjectItem, val: string) => {
    const next = [...projects];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const handleAdd = () => {
    onChange([
      ...projects,
      { id: Date.now(), name: '', tech: '', link: '', description: '' }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...projects];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const next = [...projects];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  return (
    <div id="sec-projects" className="bg-white rounded-3xl p-5 sm:p-6 shadow-apple-sm border border-black/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-bold flex items-center justify-center">
            5
          </span>
          <h2 className="text-base font-semibold tracking-tight">Projects</h2>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-xl bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/15 text-xs font-medium transition flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div key={proj.id || idx} className="p-4 rounded-2xl bg-[#F2F2F7]/60 border border-black/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                Project #{idx + 1}
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
                  disabled={idx === projects.length - 1}
                  className="p-1 text-neutral-400 hover:text-[#0071E3] disabled:opacity-30 disabled:hover:text-neutral-400 rounded transition cursor-pointer"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 ml-2 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                value={proj.name}
                onChange={(e) => handleUpdate(idx, 'name', e.target.value)}
                placeholder="Project Name"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs font-medium focus:outline-none"
              />
              <input
                type="text"
                value={proj.tech}
                onChange={(e) => handleUpdate(idx, 'tech', e.target.value)}
                placeholder="Tech Stack (e.g. Rust, WebAssembly)"
                className="mac-input px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs focus:outline-none"
              />
            </div>
            <input
              type="text"
              value={proj.link}
              onChange={(e) => handleUpdate(idx, 'link', e.target.value)}
              placeholder="Repo or Live URL (optional)"
              className="mac-input w-full px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs focus:outline-none"
            />
            <textarea
              rows={2}
              value={proj.description}
              onChange={(e) => handleUpdate(idx, 'description', e.target.value)}
              placeholder="Brief description of architecture and outcome..."
              className="mac-input w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs leading-relaxed focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
