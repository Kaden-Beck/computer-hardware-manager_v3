import React from 'react';
import UserTable from './UserTable';

export default function UsersPage(): React.JSX.Element {
  return (
    <React.Fragment>
      <h2>Manage Users</h2>
      <div>
        <UserTable />
      </div>
    </React.Fragment>
  );
}
