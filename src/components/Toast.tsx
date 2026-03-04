'use client';

import { useEffect } from 'react';
import { useRangeStore } from '@/lib/store';

export default function Toast() {
  const { toasts, removeToast } = useRangeStore();

  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => {
      removeToast(latest.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            px-4 py-3 rounded-lg text-white text-sm shadow-lg
            flex items-center gap-2 min-w-48 max-w-80
            ${toast.type === 'success' ? 'bg-green-700' : ''}
            ${toast.type === 'error' ? 'bg-red-700' : ''}
            ${toast.type === 'info' ? 'bg-blue-700' : ''}
          `}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/70 hover:text-white ml-2"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
