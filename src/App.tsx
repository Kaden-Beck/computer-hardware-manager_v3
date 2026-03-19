import { Link } from '@tanstack/react-router';
import * as React from 'react';
import { Button } from './components/ui/button';

export default function App() {
  return (
    <React.Fragment>
      <h1>Hello World</h1>
      <Button>
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>
    </React.Fragment>
  );
}
