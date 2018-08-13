import React from 'react';
import { InputDropDown } from '../../common';

const SelectScript = ({ scripts, classOverrides }) => (
  <div className="mb4">
    <div
      className={`f3 brand-near-black mb2 pointer b ${classOverrides}`}>
        Select a Script
    </div>
    <div className="flex items-center">
      <InputDropDown
        classOverrides="w-100"
        name="script"
        options={scripts.filter(script => script.attributes.name).map(filteredScript => ({ value: filteredScript.id, id: filteredScript.id, display: filteredScript.attributes.name }))}
        />
    </div>
  </div>
);

export default SelectScript;
