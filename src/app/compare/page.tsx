'use client';

import { useEffect } from 'react';
import { useRangeStore } from '@/lib/store';
import { SavedRange } from '@/types';
import RangeComparison from '@/components/RangeComparison';

export default function ComparePage() {
  const { savedRanges, setSavedRanges, addToast } = useRangeStore();

  useEffect(() => {
    if (savedRanges.length === 0) {
      fetch('/api/ranges')
        .then((r) => r.json())
        .then((data: SavedRange[]) => setSavedRanges(data))
        .catch(() => addToast('Failed to load saved ranges', 'error'));
    }
  }, [savedRanges.length, setSavedRanges, addToast]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-white font-bold text-xl mb-6">Compare Ranges</h2>
      {savedRanges.length < 2 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400">
            You need at least 2 saved ranges to compare. Go to the{' '}
            <a href="/" className="text-blue-400 hover:underline">Range Builder</a>{' '}
            to create and save ranges.
          </p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6">
          <RangeComparison />
        </div>
      )}
    </div>
  );
}
