import React from 'react';
import ManufacturerTable from './ManufacturerTable';

export default function ManufacturerPage(): React.JSX.Element {
  return (
    <React.Fragment>
      <h2>Manage Manufacturers</h2>
      <div>
        <ManufacturerTable />
      </div>
    </React.Fragment>
  );
}
