import React from 'react';
import { SideBar } from './common';

const App = ({ children, location }) => (
  <div>
    <div className="dib mw4-ns vh-100 " style={{ position: 'fixed', width: "100px" }}>
      <div className="w-100" >
        <SideBar route={location.pathname} />
      </div>
    </div>
    {children}
  </div>
);

export default App;
