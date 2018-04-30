import React from 'react';

export default function renderSuccess(msg) {
  if (msg) {
    return (
      <div className="mt3 tc blue">
        <strong>{msg}</strong>
      </div>
    );
  }
}
