import React from 'react';
import { User } from 'lucide-react';
import { CVData } from '../../types/cv';
import { compressImage } from '../../utils/image';

interface PersonalDetailsEditorProps {
  data: CVData;
  onChange: <K extends keyof CVData>(field: K, value: CVData[K]) => void;
  onToast: (msg: string) => void;
}

export const PersonalDetailsEditor: React.FC<PersonalDetailsEditorProps> = ({
  data,
  onChange,
  onToast
}) => {
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImage(file, 320, 0.85);
      onChange('photo', compressedDataUrl);
      onChange('showPhoto', true);
      onToast('Profile picture updated');
    } catch (err) {
      console.error(err);
      onToast('Failed to process image');
    }
  };

  const handleRemovePhoto = () => {
    onChange('photo', '');
    onToast('Profile picture removed');
  };

  return (
    <div id="sec-profile" className="bg-white rounded-3xl p-5 sm:p-6 shadow-apple-sm border border-black/5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="text-base font-semibold tracking-tight">Personal Details & Photo</h2>
        </div>
        <label className="flex items-center gap-2 text-xs text-[#86868B] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.showPhoto}
            onChange={(e) => onChange('showPhoto', e.target.checked)}
            className="rounded text-[#0071E3] focus:ring-[#0071E3]"
          />
          <span>Show photo on CV</span>
        </label>
      </div>

      {/* Photo Upload Box */}
      <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F2F2F7]/70 border border-black/5">
        <div className="relative w-16 h-16 rounded-2xl bg-white border border-black/10 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
          {data.photo ? (
            <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-7 h-7 text-[#86868B]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[#1D1D1F]">Profile Portrait</p>
          <p className="text-[11px] text-[#86868B] mt-0.5">Optional for ATS. Square high-res image recommended.</p>
          <div className="flex items-center gap-2 mt-2">
            <label className="cursor-pointer px-3 py-1 rounded-lg bg-white border border-black/10 text-xs font-medium text-[#1D1D1F] hover:bg-neutral-50 transition shadow-2xs">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
            {data.photo && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-2.5 py-1 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-medium text-[#86868B] mb-1">Full Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="e.g. Alex Chen"
            className="mac-input w-full px-3.5 py-2 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#86868B] mb-1">Role / Headline</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="mac-input w-full px-3.5 py-2 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#86868B] mb-1">Email Address</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="alex@domain.com"
            className="mac-input w-full px-3.5 py-2 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#86868B] mb-1">Phone Number</label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+1 (555) 234-5678"
            className="mac-input w-full px-3.5 py-2 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#86868B] mb-1">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange('location', e.target.value)}
            placeholder="San Francisco, CA (or Remote)"
            className="mac-input w-full px-3.5 py-2 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#86868B] mb-1">GitHub URL / Handle</label>
          <input
            type="text"
            value={data.github}
            onChange={(e) => onChange('github', e.target.value)}
            placeholder="github.com/alexchen"
            className="mac-input w-full px-3.5 py-2 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#86868B] mb-1">LinkedIn URL / Handle</label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => onChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/alexchen"
            className="mac-input w-full px-3.5 py-2 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#86868B] mb-1">Portfolio / Website</label>
          <input
            type="text"
            value={data.website}
            onChange={(e) => onChange('website', e.target.value)}
            placeholder="alexchen.dev"
            className="mac-input w-full px-3.5 py-2 rounded-xl bg-[#F2F2F7]/60 border border-black/10 text-sm focus:bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
