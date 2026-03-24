import type React from 'react';
import { manufacturerDetails } from '@/data/stub/manufacturerData';
import { useParams } from '@tanstack/react-router';

export default function ManufacturerDetailComponent(): React.JSX.Element | null {
  const { manId } = useParams({ from: '/dashboard/manufacturers/$manId' });
  const manufacturer = manufacturerDetails.find((m) => m.id === manId);

  if (!manufacturer) return <div>Manufacturer not found.</div>;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground">ID</p>
        <p>{manufacturer.id}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Name</p>
        <p>{manufacturer.name}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Description</p>
        <p>{manufacturer.description}</p>
      </div>
    </div>
  );
}
