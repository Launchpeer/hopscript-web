import React from 'react';
import { InputDropDown } from '../../common';

const SelectScript = ({ scripts, classOverrides }) => {
  return (
    <div className="mb4">
      <div
        className={`f3 brand-near-black mb4 pointer b ${classOverrides}`}>
        Select a Script
      </div>
      <div className="flex items-center">
        <div style={{ width: '9rem' }} className="mr2 f6">Script</div>
        <InputDropDown
          classOverrides="w-100"
          name="script"
          options={scripts.filter(script => script.attributes.name).map((filteredScript) => { return { value: filteredScript.id, id: filteredScript.id, display: filteredScript.attributes.name }})}
        />
      </div>
    </div>
  );
}

export default SelectScript;
