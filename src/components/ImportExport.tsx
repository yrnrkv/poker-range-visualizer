'use client';

import { useState } from 'react';
import { useRangeStore } from '@/lib/store';
import { parseHandString } from '@/lib/poker';

export default function ImportExport() {
  const { selectedHands, setSelectedHands, addToast } = useRangeStore();
  const [importText, setImportText] = useState('');

  const handleExport = async () => {
    const handStr = Array.from(selectedHands).join(',');
    try {
      await navigator.clipboard.writeText(handStr);
      addToast('Range copied to clipboard!', 'success');
    } catch {
      addToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleImport = () => {
    const hands = parseHandString(importText);
    if (hands.length === 0) {
      addToast('No valid hands found in input', 'error');
      return;
    }
    setSelectedHands(hands);
    setImportText('');
    addToast(`Imported ${hands.length} hands`, 'success');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      <h3 className="text-white font-semibold text-sm">Import / Export</h3>
      <button
        onClick={handleExport}
        disabled={selectedHands.size === 0}
        className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white text-xs rounded transition-colors"
      >
        Copy Range to Clipboard
      </button>
      <div className="space-y-2">
        <textarea
          placeholder="Paste range here (e.g. AA,KK,AKs,AKo)"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 text-white text-xs rounded border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none"
        />
        <button
          onClick={handleImport}
          disabled={!importText.trim()}
          className="w-full px-3 py-2 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white text-xs rounded transition-colors"
        >
          Import Range
        </button>
      </div>
    </div>
  );
}
