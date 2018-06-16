import React from 'react';

const TrashIcon = props => (
  <div>
    <svg width={props.width} height={props.height} viewBox="0 0 26 26">
      <g stroke="none" strokeQidth="1" fill="none" fillRule="evenodd">
          <g fill={props.color}>
              <g>
                  <polygon id="Fill-46" points="22 32 2 32 2 9 4 9 4 30 20 30 20 9 22 9"></polygon>
                  <polygon id="Fill-48" points="0 7 24 7 24 5 0 5"></polygon>
                  <path d="M9,5 L15,5 L15,2 L9,2 L9,5 Z M7,7 L17,7 L17,0 L7,0 L7,7 Z" id="Fill-50"></path>
                  <polygon id="Fill-51" points="8 26 10 26 10 12 8 12"></polygon>
                  <polygon id="Fill-52" points="14 26 16 26 16 12 14 12"></polygon>
              </g>
          </g>
      </g>
    </svg>
  </div>
);

export default TrashIcon;
