'use client';

import { memo } from 'react';
import { getHandColor } from '@/lib/poker';

interface GridCellProps {
  hand: string;
  isSelected: boolean;
  onMouseDown: (hand: string) => void;
  onMouseEnter: (hand: string) => void;
}

const GridCell = memo(function GridCell({
  hand,
  isSelected,
  onMouseDown,
  onMouseEnter,
}: GridCellProps) {
  return (
    <div
      className={`
        flex items-center justify-center
        text-xs font-semibold
        cursor-pointer select-none
        rounded-sm transition-colors duration-75
        aspect-square
        ${getHandColor(hand, isSelected)}
      `}
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown(hand);
      }}
      onMouseEnter={() => onMouseEnter(hand)}
    >
      {hand}
    </div>
  );
});

export default GridCell;
