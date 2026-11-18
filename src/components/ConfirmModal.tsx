import React from 'react';
import { Trash2 } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-apple-lg border border-black/5 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#1D1D1F]">Clear all CV fields?</h3>
          <p className="text-xs text-[#86868B] mt-1">
            This will reset the form so you can type everything from scratch. You can export your current data as JSON first if needed.
          </p>
        </div>
        <div className="flex items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-[#F2F2F7] text-[#1D1D1F] text-xs font-semibold hover:bg-neutral-200 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};
