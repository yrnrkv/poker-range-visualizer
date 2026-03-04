'use client';

import { useState, useMemo } from 'react';
import { useRangeStore } from '@/lib/store';
import { RANKS, getHandLabel } from '@/lib/poker';

interface ComparisonStats {
  onlyA: number;
  onlyB: number;
  both: number;
  neither: number;
}

function getCellClass(hand: string, setA: Set<string>, setB: Set<string>): string {
  const inA = setA.has(hand);
  const inB = setB.has(hand);
  if (inA && inB) return 'bg-yellow-500 text-black';
  if (inA) return 'bg-blue-600 text-white';
  if (inB) return 'bg-red-600 text-white';
  return 'bg-gray-800 text-gray-600';
}

export default function RangeComparison() {
  const { savedRanges } = useRangeStore();
  const [rangeAId, setRangeAId] = useState('');
  const [rangeBId, setRangeBId] = useState('');

  const rangeA = useMemo(() => savedRanges.find((r) => r.id === rangeAId), [savedRanges, rangeAId]);
  const rangeB = useMemo(() => savedRanges.find((r) => r.id === rangeBId), [savedRanges, rangeBId]);

  const setA = useMemo(() => new Set(rangeA?.hands ?? []), [rangeA]);
  const setB = useMemo(() => new Set(rangeB?.hands ?? []), [rangeB]);

  const stats = useMemo<ComparisonStats>(() => {
    let onlyA = 0, onlyB = 0, both = 0, neither = 0;
    for (let row = 0; row < 13; row++) {
      for (let col = 0; col < 13; col++) {
        const hand = getHandLabel(row, col);
        const inA = setA.has(hand);
        const inB = setB.has(hand);
        if (inA && inB) both++;
        else if (inA) onlyA++;
        else if (inB) onlyB++;
        else neither++;
      }
    }
    return { onlyA, onlyB, both, neither };
  }, [setA, setB]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-1">Range A (Blue)</label>
          <select
            value={rangeAId}
            onChange={(e) => setRangeAId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none"
          >
            <option value="">-- Select Range A --</option>
            {savedRanges.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} {r.position ? `(${r.position})` : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">Range B (Red)</label>
          <select
            value={rangeBId}
            onChange={(e) => setRangeBId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none"
          >
            <option value="">-- Select Range B --</option>
            {savedRanges.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} {r.position ? `(${r.position})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(rangeAId || rangeBId) && (
        <>
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div className="bg-blue-900 rounded p-3">
              <div className="text-blue-300 font-bold text-xl">{stats.onlyA}</div>
              <div className="text-gray-400 text-xs">Only A</div>
            </div>
            <div className="bg-red-900 rounded p-3">
              <div className="text-red-300 font-bold text-xl">{stats.onlyB}</div>
              <div className="text-gray-400 text-xs">Only B</div>
            </div>
            <div className="bg-yellow-900 rounded p-3">
              <div className="text-yellow-300 font-bold text-xl">{stats.both}</div>
              <div className="text-gray-400 text-xs">Overlap</div>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <div className="text-gray-400 font-bold text-xl">{stats.neither}</div>
              <div className="text-gray-500 text-xs">Neither</div>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="border-collapse" style={{ tableLayout: 'fixed', width: '100%' }}>
              <thead>
                <tr>
                  <th className="w-6" />
                  {RANKS.map((rank) => (
                    <th key={rank} className="text-center text-xs text-gray-400 font-bold pb-1 w-10">
                      {rank}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RANKS.map((rank, row) => (
                  <tr key={rank}>
                    <td className="text-center text-xs text-gray-400 font-bold pr-1">{rank}</td>
                    {RANKS.map((_, col) => {
                      const hand = getHandLabel(row, col);
                      return (
                        <td key={hand} className="p-0.5">
                          <div
                            className={`flex items-center justify-center text-xs font-semibold rounded-sm aspect-square ${getCellClass(hand, setA, setB)}`}
                          >
                            {hand}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-600 rounded-sm inline-block" /> Range A only</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-600 rounded-sm inline-block" /> Range B only</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-500 rounded-sm inline-block" /> Both ranges</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-800 rounded-sm inline-block" /> Neither</span>
          </div>
        </>
      )}
    </div>
  );
}
