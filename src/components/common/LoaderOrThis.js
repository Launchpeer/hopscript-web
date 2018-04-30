import React from 'react';

import { Loader } from './';

const LoaderOrThis = ({ loading, children }) => (
  <div>
    {loading
    ? <Loader />
    : <div>{ children }</div>
    }
  </div>
);

export default LoaderOrThis;
