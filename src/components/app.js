import React from 'react';
import { Header } from './common';

const App = ({ children, location }) => (
  <div>
    <Header route={location.pathname} />
    {children}
  </div>
);

export default App;
