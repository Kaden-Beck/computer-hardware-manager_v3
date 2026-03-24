import React from 'react';
import ProductTable from './ProductTable';

export default function ProductPage(): React.JSX.Element {
  return (
    <React.Fragment>
      <h2>Manage Products</h2>
      <div>
        <ProductTable />
      </div>
    </React.Fragment>
  );
}
