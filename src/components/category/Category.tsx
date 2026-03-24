import React from 'react';
import CategoryTable from './CategoryTable';

export default function CategoryPage(): React.JSX.Element {
  return (
    <React.Fragment>
      <h2>Manage Categories</h2>
      <div>
        <CategoryTable />
      </div>
    </React.Fragment>
  );
}
