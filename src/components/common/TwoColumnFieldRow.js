import React from 'react';
import { CenterThis, HalfGrid, MCInput, EditInput } from './';
import { Colors } from '../../config/styles';

const TwoColFieldRow = (props) => {
  const {
    leftLabel, initialValue, name, edit, ticketSubmit, noEdit
  } = props;
  if (edit) {
    return (
      <CenterThis classOverrides="items-center">
        <HalfGrid>
          <div>{leftLabel}</div>
        </HalfGrid>
        <HalfGrid>
          <EditInput
            name={name}
            type="number"
            inputValue={initialValue}
            placeholder={`$ ${initialValue}`}
            onSubmit={() => ticketSubmit()}
            borderColor={Colors.moonGray}
            noEdit={noEdit} />
        </HalfGrid>
      </CenterThis>
    );
  }
  return (
    <CenterThis classOverrides="items-center">
      <HalfGrid>
        <div>{leftLabel}</div>
      </HalfGrid>
      <HalfGrid>
        <MCInput
          name={name}
          type="number"
          placeholder="$ Rate"
          inputValue={initialValue}
          noEdit={noEdit} />
      </HalfGrid>
    </CenterThis>
  );
};

export default TwoColFieldRow;
