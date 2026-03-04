'use client';

import { useState } from 'react';
import { useRangeStore } from '@/lib/store';

export default function RangeControls() {
  const { selectedHands, clearAll, selectAll, addToast } = useRangeStore();
  const [saveName, setSaveName] = useState('');
  const [savePosition, setSavePosition] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!saveName.trim()) {
      addToast('Please enter a name for the range', 'error');
      return;
    }
    if (selectedHands.size === 0) {
      addToast('No hands selected to save', 'error');
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/ranges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: saveName.trim(),
          position: savePosition.trim() || undefined,
          hands: Array.from(selectedHands),
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      const saved = await res.json() as import('@/types').SavedRange;
      useRangeStore.getState().addSavedRange(saved);
      setSaveName('');
      setSavePosition('');
      addToast(`Range "${saved.name}" saved successfully!`, 'success');
    } catch (error) {
      console.error('Failed to save range:', error);
      addToast('Failed to save range', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      <h3 className="text-white font-semibold text-sm">Controls</h3>
      <div className="flex gap-2">
        <button
          onClick={selectAll}
          className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Range name (e.g. BTN Open)"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white text-xs rounded border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Position (optional, e.g. BTN)"
          value={savePosition}
          onChange={(e) => setSavePosition(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white text-xs rounded border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500"
        />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs rounded font-semibold transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Range'}
        </button>
      </div>
    </div>
  );
}
