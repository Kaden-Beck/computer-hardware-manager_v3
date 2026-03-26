import React from 'react';
// Tanstack Imports
import { useParams } from '@tanstack/react-router';
// Stub Data
import { manufacturerDetails } from '@/data/stub/manufacturerData';
import ManufacturerEditForm from './ManufacturerEditForm';

export default function ManufacturerEditComponent(): React.JSX.Element {
  const { manId } = useParams({
    from: '/dashboard/manufacturers/$manId/edit',
  });
  const manufacturer = manufacturerDetails.find((m) => m.id === manId);

  if (!manufacturer) return <div>Manufacturer not found.</div>;

  return <ManufacturerEditForm manufacturer={manufacturer} />;
}
