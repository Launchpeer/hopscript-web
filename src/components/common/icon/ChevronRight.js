import React from 'react';

const ChevronRight = ({ width, height, color }) => (
  <svg
    width={width}
    height={height}
    style={{ width: width, height: height}}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default ChevronRight;
