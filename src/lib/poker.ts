import { HandType } from '@/types';

export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;

export type Rank = typeof RANKS[number];

export function getHandLabel(row: number, col: number): string {
  const r1 = RANKS[row];
  const r2 = RANKS[col];
  if (row === col) {
    return `${r1}${r2}`; // Pocket pair
  } else if (row < col) {
    return `${r1}${r2}s`; // Suited (upper triangle)
  } else {
    return `${r2}${r1}o`; // Offsuit (lower triangle) — higher rank first
  }
}

export function getHandType(hand: string): HandType {
  if (hand.endsWith('s')) return 'suited';
  if (hand.endsWith('o')) return 'offsuit';
  return 'pair';
}

export const ALL_HANDS: string[] = [];
for (let row = 0; row < 13; row++) {
  for (let col = 0; col < 13; col++) {
    ALL_HANDS.push(getHandLabel(row, col));
  }
}

export function getHandColor(hand: string, isSelected: boolean): string {
  if (!isSelected) return 'bg-gray-800 hover:bg-gray-700 text-gray-500';
  const type = getHandType(hand);
  switch (type) {
    case 'pair':
      return 'bg-indigo-600 hover:bg-indigo-500 text-white';
    case 'suited':
      return 'bg-teal-600 hover:bg-teal-500 text-white';
    case 'offsuit':
      return 'bg-rose-600 hover:bg-rose-500 text-white';
  }
}

export function parseHandString(handStr: string): string[] {
  return handStr
    .split(',')
    .map(h => h.trim())
    .filter(h => ALL_HANDS.includes(h));
}

export function calculateStats(selectedHands: Set<string>) {
  let pairs = 0, suited = 0, offsuit = 0;
  for (const hand of Array.from(selectedHands)) {
    const type = getHandType(hand);
    if (type === 'pair') pairs++;
    else if (type === 'suited') suited++;
    else offsuit++;
  }
  const total = selectedHands.size;
  const percentage = Math.round((total / 169) * 100 * 10) / 10;
  return { total, pairs, suited, offsuit, percentage };
}
