import React from 'react';
import { InputText } from '../../common';
import { Colors, BorderRadius } from '../../../config/styles';

const CallTitle = ({ classOverrides }) => (
  <div className="mb4">
    <div
      className={`f3 mb2 brand-near-black b ${classOverrides}`}>
      Title Your Call
    </div>
    <div className="flex items-center pr4 ba b--silver bg-transparent" style={{ borderRadius: BorderRadius.all }}>
      <InputText
        classOverrides="w-100"
        name="title"
        placeholder="Call Title Here"
      />
    </div>
  </div>
);

export default CallTitle;
