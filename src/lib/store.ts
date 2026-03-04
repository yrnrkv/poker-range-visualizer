import { create } from 'zustand';
import { SavedRange, ToastMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { ALL_HANDS } from './poker';

interface RangeStore {
  selectedHands: Set<string>;
  savedRanges: SavedRange[];
  toasts: ToastMessage[];
  isLoading: boolean;

  toggleHand: (hand: string) => void;
  selectHands: (hands: string[]) => void;
  deselectHands: (hands: string[]) => void;
  setSelectedHands: (hands: string[]) => void;
  clearAll: () => void;
  selectAll: () => void;

  setSavedRanges: (ranges: SavedRange[]) => void;
  addSavedRange: (range: SavedRange) => void;
  removeSavedRange: (id: string) => void;

  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  setLoading: (loading: boolean) => void;
}

export const useRangeStore = create<RangeStore>((set) => ({
  selectedHands: new Set<string>(),
  savedRanges: [],
  toasts: [],
  isLoading: false,

  toggleHand: (hand) =>
    set((state) => {
      const next = new Set(state.selectedHands);
      if (next.has(hand)) next.delete(hand);
      else next.add(hand);
      return { selectedHands: next };
    }),

  selectHands: (hands) =>
    set((state) => {
      const next = new Set(state.selectedHands);
      hands.forEach((h) => next.add(h));
      return { selectedHands: next };
    }),

  deselectHands: (hands) =>
    set((state) => {
      const next = new Set(state.selectedHands);
      hands.forEach((h) => next.delete(h));
      return { selectedHands: next };
    }),

  setSelectedHands: (hands) =>
    set({ selectedHands: new Set(hands) }),

  clearAll: () => set({ selectedHands: new Set() }),

  selectAll: () => set({ selectedHands: new Set(ALL_HANDS) }),

  setSavedRanges: (ranges) => set({ savedRanges: ranges }),

  addSavedRange: (range) =>
    set((state) => ({ savedRanges: [...state.savedRanges, range] })),

  removeSavedRange: (id) =>
    set((state) => ({
      savedRanges: state.savedRanges.filter((r) => r.id !== id),
    })),

  addToast: (message, type) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: uuidv4(), message, type },
      ],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  setLoading: (loading) => set({ isLoading: loading }),
}));
