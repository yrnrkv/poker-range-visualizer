'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RANKS, getHandLabel } from '@/lib/poker';
import { useRangeStore } from '@/lib/store';
import GridCell from './GridCell';

export default function RangeGrid() {
  const { selectedHands, selectHands, deselectHands } = useRangeStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<'select' | 'deselect'>('select');
  const draggedRef = useRef<Set<string>>(new Set());

  const handleMouseDown = useCallback(
    (hand: string) => {
      setIsDragging(true);
      draggedRef.current = new Set([hand]);
      if (selectedHands.has(hand)) {
        setDragMode('deselect');
        deselectHands([hand]);
      } else {
        setDragMode('select');
        selectHands([hand]);
      }
    },
    [selectedHands, selectHands, deselectHands]
  );

  const handleMouseEnter = useCallback(
    (hand: string) => {
      if (!isDragging) return;
      if (draggedRef.current.has(hand)) return;
      draggedRef.current.add(hand);
      if (dragMode === 'select') {
        selectHands([hand]);
      } else {
        deselectHands([hand]);
      }
    },
    [isDragging, dragMode, selectHands, deselectHands]
  );

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      draggedRef.current = new Set();
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="select-none overflow-auto">
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
                    <GridCell
                      hand={hand}
                      isSelected={selectedHands.has(hand)}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnter}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
