import { v4 as uuidv4 } from 'uuid';

export interface StoredRange {
  id: string;
  name: string;
  position: string | null;
  hands: string[];
  createdAt: string;
  updatedAt: string;
}

// In-memory storage (persists during serverless function warm period)
const ranges: Map<string, StoredRange> = new Map();

export function getAllRanges(): StoredRange[] {
  return Array.from(ranges.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getRangeById(id: string): StoredRange | undefined {
  return ranges.get(id);
}

export function createRange(name: string, hands: string[], position?: string): StoredRange {
  const now = new Date().toISOString();
  const range: StoredRange = {
    id: uuidv4(),
    name,
    position: position ?? null,
    hands,
    createdAt: now,
    updatedAt: now,
  };
  ranges.set(range.id, range);
  return range;
}

export function deleteRange(id: string): boolean {
  return ranges.delete(id);
}
