import React from 'react';
// Tanstack Imports
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { manufacturerByIdQueryOptions } from '@/lib/queries/manufacturerQueries';
import ManufacturerEditForm from './ManufacturerEditForm';

export default function ManufacturerEditComponent(): React.JSX.Element {
  const { manId } = useParams({
    from: '/dashboard/manufacturers/$manId/edit',
  });
  const { data: manufacturer } = useQuery(manufacturerByIdQueryOptions(manId));

  if (!manufacturer) return <div>Manufacturer not found.</div>;

  return <ManufacturerEditForm manufacturer={manufacturer} />;
}
