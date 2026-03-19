import React from 'react';
import ManufacturerTable from './ManufacturerTable';

export default function ManufacturerPage() {
  return (
    <React.Fragment>
      <h2>Manage Manufacturers</h2>
      <div>
        <ManufacturerTable />
      </div>
    </React.Fragment>
  );
}
