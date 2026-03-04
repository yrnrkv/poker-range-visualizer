export type HandType = 'pair' | 'suited' | 'offsuit';

export interface Hand {
  label: string;
  type: HandType;
  row: number;
  col: number;
}

export interface SavedRange {
  id: string;
  name: string;
  position?: string | null;
  hands: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RangeStats {
  total: number;
  pairs: number;
  suited: number;
  offsuit: number;
  percentage: number;
}

export type Position = 'UTG' | 'UTG+1' | 'MP' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
