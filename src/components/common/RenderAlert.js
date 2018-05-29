import React from 'react';

const renderAlert = ({ error, classOverrides }) => (
  <div>
    {error &&
      <div className={`tc red ${classOverrides}`}>
        <strong>{error.message}</strong>
      </div>
    }
  </div>
);

export default renderAlert;
