import React from 'react';

const PeopleIcon = props => (<div>
  <svg width={props.width} height={props.height} viewBox="0 0 34 34" version="1.1" style={{ width: props.width, height: props.height}}>

    <g id="People" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(2.000000, 2.000000)" stroke={props.color} strokeWidth="2">
        <path d="M19,8.001 C19,12.418 15.418,16 11.001,16 C6.582,16 3,12.418 3,8.001 C3,3.581 6.582,0 11.001,0 C15.418,0 19,3.581 19,8.001 Z" id="Stroke-16" />
        <path d="M22,4 C25.313,4 28,6.685 28,10 C28,13.313 25.313,16 22,16" id="Stroke-18" />
        <polyline id="Stroke-20" points="25 20 29 21.025 30 28.025 25 28.025" />
        <polyline id="Stroke-22" points="16.867 20 20.972 21.331 22 30 0 30 1.027 21.331 5.133 20" />
      </g>
    </g>
  </svg>
</div>);

export default PeopleIcon;
