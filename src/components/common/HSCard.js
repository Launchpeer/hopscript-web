import React from 'react';
import { CenterThis } from './';
import { BorderRadius } from '../../config/styles';

const HSCard = props => (
  <CenterThis>
    <div className="mt3 bg-white w-90" style={{ borderRadius: BorderRadius.all }}>
      {props.children}
    </div>
  </CenterThis>
);

export default HSCard;
