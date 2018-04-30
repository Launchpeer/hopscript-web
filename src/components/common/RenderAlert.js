import React from 'react';

const renderAlert = ({ error, classOverrides }) => (
  <div>
    {error &&
      <div className={`mt3 tc red ${classOverrides}`}>
        <strong>{error.message}</strong>
      </div>
    }
  </div>
);

export default renderAlert;
