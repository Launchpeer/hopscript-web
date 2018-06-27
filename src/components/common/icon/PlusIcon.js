import React from 'react';

const MicrophoneIcon = props => (
  <svg width={props.width} height={props.height} viewBox="0 0  26">
    <g stroke="none" strokeWidth="1" fillRule="evenodd">
        <g fill={props.color}>
            <path d="M13.066,11.2 L11.2,11.2 L11.2,13.066 C11.2,13.754 10.642,14.31 9.955,14.31 C9.268,14.31 8.711,13.754 8.711,13.066 L8.711,11.2 L6.844,11.2 C6.157,11.2 5.599,10.642 5.599,9.955 C5.599,9.268 6.157,8.711 6.844,8.711 L8.711,8.711 L8.711,6.844 C8.711,6.157 9.268,5.599 9.955,5.599 C10.642,5.599 11.2,6.157 11.2,6.844 L11.2,8.711 L13.066,8.711 C13.753,8.711 14.311,9.268 14.311,9.955 C14.311,10.642 13.753,11.2 13.066,11.2 M9.955,0 C4.457,0 0,4.457 0,9.955 C0,15.454 4.457,19.911 9.955,19.911 C15.454,19.911 19.911,15.454 19.911,9.955 C19.911,4.457 15.454,0 9.955,0"></path>
        </g>
    </g>
  </svg>
);

export default MicrophoneIcon;
