import React from 'react';
import { InputDropDown } from '../../common';


const SelectGroup = ({
  leadGroups,
  selectedGroup,
  classOverrides,
  onClick
}) => (
  <div className="mb4">
    <div
      role="button"
      onClick={onClick}
      className={`f3 b mb4 pointer ${classOverrides}`}>
      Select a Lead Group
    </div>
    {(selectedGroup && leadGroups.length > 0) &&
      <div className="flex items-center">
        <div style={{ width: '9rem' }} className="mr2 f6">Lead Group</div>
        <InputDropDown
          classOverrides="w-100"
          name="leadGroup"
          options={leadGroups.map(({ id, attributes: { groupName } }) => ({ value: id, id, display: groupName }))}
        />
      </div>
    }
  </div>
);

export default SelectGroup;
