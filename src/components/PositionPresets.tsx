'use client';

import { PRESETS, POSITIONS } from '@/lib/presets';
import { useRangeStore } from '@/lib/store';
import { Position } from '@/types';

export default function PositionPresets() {
  const { setSelectedHands } = useRangeStore();

  const handleSelectPosition = (position: Position) => {
    setSelectedHands(PRESETS[position]);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-white font-semibold text-sm mb-3">Position Presets</h3>
      <div className="grid grid-cols-4 gap-1.5">
        {POSITIONS.map((pos) => (
          <button
            key={pos}
            onClick={() => handleSelectPosition(pos)}
            className="px-2 py-2 bg-gray-700 hover:bg-blue-600 text-white text-xs rounded font-medium transition-colors"
          >
            {pos}
          </button>
        ))}
      </div>
      <p className="text-gray-500 text-xs mt-2">Click to load GTO preset range</p>
    </div>
  );
}
