import type React from 'react';
import { useParams } from '@tanstack/react-router';

export default function ManufacturerEditComponent(): React.JSX.Element {
  const { manId } = useParams({ from: '/dashboard/manufacturers/$manId/edit' });
  return <div>Edit manufacturer {manId}</div>;
}
