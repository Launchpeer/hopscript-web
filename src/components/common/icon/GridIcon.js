import React from 'react';

const GridIcon = ({ width, height, color }) => (
  <svg
    width={width}
    height={height}
    style={{ width: width, height: height}}
  	viewBox="0 0 8 13">
    <g>
    	<path
        fill={color}
        d="M0,0h3v3H0V0z M0,5h3v3H0V5z M0,10h3v3H0V10z M5,0h3v3H5V0z M5,5h3v3H5V5z M5,10h3v3H5V10z"/>
    </g>
  </svg>
)

export default GridIcon;
