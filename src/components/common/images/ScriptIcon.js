import React from 'react';

const ScriptIcon = props => (<div>
  <svg width={props.width} height={props.height} viewBox="0 0 27 32" version="1.1" >

    <g id="Script" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(0.000000, 1.000000)" stroke={props.color} strokeWidth="2">
        <path d="M20,14 L7,14" id="Stroke-1" />
        <path d="M20,18 L7,18" id="Stroke-2" />
        <path d="M20,22 L7,22" id="Stroke-3" />
        <path d="M13,8 L7,8" id="Stroke-4" />
        <polyline id="Stroke-5" points="1 3 1 30 26 30 26 0 0 0" />
      </g>
    </g>
  </svg>
</div>);

export default ScriptIcon;
