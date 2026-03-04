'use client';

import RangeGrid from '@/components/RangeGrid';
import RangeStats from '@/components/RangeStats';
import RangeControls from '@/components/RangeControls';
import PositionPresets from '@/components/PositionPresets';
import ImportExport from '@/components/ImportExport';
import SavedRangesList from '@/components/SavedRangesList';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-white font-semibold mb-4">Hand Range Grid</h2>
            <RangeGrid />
          </div>
        </div>
        <div className="xl:w-72 space-y-4">
          <RangeStats />
          <PositionPresets />
          <RangeControls />
          <ImportExport />
          <SavedRangesList />
        </div>
      </div>
    </div>
  );
}
