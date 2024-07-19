'use client';

import { HeaderContent } from '@/components/HeaderContent';
import { DestinationComponent } from '@/components/cruise/Destination';
import { useState } from 'react';

export function CruiseManageSection(): JSX.Element {
  const [showDestination, setShowDestination] = useState(false);
  const [showDetailLocation, setShowDetailLocation] = useState(false);

  return (
    <main className="relative min-h-full">
      <HeaderContent path="cruise" title="Manage Cruise" />
      <div className="p-3 ">
        <h2 className="font-medium text-base">Manage Config Cruise</h2>
        <div className="mt-2">
          <button onClick={() => setShowDestination(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
            List of destinations
          </button>
          <button onClick={() => setShowDetailLocation(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
            List of detail destination
          </button>
        </div>
        {showDestination ? <DestinationComponent onCancel={() => setShowDestination(false)} /> : <></>}
      </div>
    </main>
  );
}
