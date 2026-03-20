import type React from 'react';
import { InventoryGallery } from './InventoryGallery';

export default function RouteComponent(): React.JSX.Element {
  return (
    <div>
      <h2 className="mb-4">Browse Inventory</h2>
      <InventoryGallery />
    </div>
  );
}
