'use client';

import { useEffect } from 'react';
import { useRangeStore } from '@/lib/store';
import { SavedRange } from '@/types';

export default function SavedRangesList() {
  const { savedRanges, setSavedRanges, setSelectedHands, removeSavedRange, addToast } = useRangeStore();

  useEffect(() => {
    fetch('/api/ranges')
      .then((r) => r.json())
      .then((data: SavedRange[]) => setSavedRanges(data))
      .catch(() => addToast('Failed to load saved ranges', 'error'));
  }, [setSavedRanges, addToast]);

  const handleLoad = (range: SavedRange) => {
    setSelectedHands(range.hands);
    addToast(`Loaded range "${range.name}"`, 'success');
  };

  const handleDelete = async (range: SavedRange) => {
    try {
      const res = await fetch(`/api/ranges/${range.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      removeSavedRange(range.id);
      addToast(`Deleted range "${range.name}"`, 'success');
    } catch {
      addToast('Failed to delete range', 'error');
    }
  };

  if (savedRanges.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold text-sm mb-2">Saved Ranges</h3>
        <p className="text-gray-500 text-xs">No saved ranges yet. Save a range to see it here.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-white font-semibold text-sm mb-3">Saved Ranges</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {savedRanges.map((range) => (
          <div key={range.id} className="flex items-center justify-between bg-gray-700 rounded p-2">
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{range.name}</div>
              {range.position && (
                <div className="text-gray-400 text-xs">{range.position}</div>
              )}
            </div>
            <div className="flex gap-1 ml-2 shrink-0">
              <button
                onClick={() => handleLoad(range)}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
              >
                Load
              </button>
              <button
                onClick={() => handleDelete(range)}
                className="px-2 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded transition-colors"
              >
                Del
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
