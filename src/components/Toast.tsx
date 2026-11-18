import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="no-print fixed bottom-5 right-5 z-50 transition-all duration-300">
      <div className="mac-glass border border-black/10 shadow-apple-lg rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-[#0071E3] text-white flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-medium text-[#1D1D1F]">{message}</span>
      </div>
    </div>
  );
};
