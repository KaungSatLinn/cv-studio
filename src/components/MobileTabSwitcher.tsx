import React from 'react';

interface MobileTabSwitcherProps {
  activeTab: 'editor' | 'preview';
  onTabChange: (tab: 'editor' | 'preview') => void;
}

export const MobileTabSwitcher: React.FC<MobileTabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="no-print lg:hidden sticky top-[57px] z-30 bg-[#F5F5F7]/95 backdrop-blur-md px-4 py-2 border-b border-black/5 flex justify-center">
      <div className="inline-flex p-1 rounded-xl bg-black/5 w-full max-w-xs">
        <button
          type="button"
          onClick={() => onTabChange('editor')}
          className={`flex-1 py-1.5 text-xs rounded-lg transition ${
            activeTab === 'editor'
              ? 'bg-white text-[#1D1D1F] font-semibold shadow-sm'
              : 'text-[#86868B] font-medium'
          }`}
        >
          1. Edit Data
        </button>
        <button
          type="button"
          onClick={() => onTabChange('preview')}
          className={`flex-1 py-1.5 text-xs rounded-lg transition ${
            activeTab === 'preview'
              ? 'bg-white text-[#1D1D1F] font-semibold shadow-sm'
              : 'text-[#86868B] font-medium'
          }`}
        >
          2. Preview CV
        </button>
      </div>
    </div>
  );
};
