'use client';

import { useMemo } from 'react';
import { useRangeStore } from '@/lib/store';
import { calculateStats } from '@/lib/poker';

export default function RangeStats() {
  const { selectedHands } = useRangeStore();
  const stats = useMemo(() => calculateStats(selectedHands), [selectedHands]);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-white font-semibold text-sm mb-3">Range Statistics</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-700 rounded p-2 text-center">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-gray-400 text-xs">Total Combos</div>
        </div>
        <div className="bg-gray-700 rounded p-2 text-center">
          <div className="text-2xl font-bold text-white">{stats.percentage}%</div>
          <div className="text-gray-400 text-xs">of All Hands</div>
        </div>
        <div className="bg-indigo-900 rounded p-2 text-center">
          <div className="text-xl font-bold text-indigo-300">{stats.pairs}</div>
          <div className="text-gray-400 text-xs">Pairs</div>
        </div>
        <div className="bg-teal-900 rounded p-2 text-center">
          <div className="text-xl font-bold text-teal-300">{stats.suited}</div>
          <div className="text-gray-400 text-xs">Suited</div>
        </div>
        <div className="bg-rose-900 rounded p-2 text-center col-span-2">
          <div className="text-xl font-bold text-rose-300">{stats.offsuit}</div>
          <div className="text-gray-400 text-xs">Offsuit</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-600 rounded-sm inline-block" /> Pairs</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-teal-600 rounded-sm inline-block" /> Suited</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-rose-600 rounded-sm inline-block" /> Offsuit</span>
        </div>
      </div>
    </div>
  );
}
