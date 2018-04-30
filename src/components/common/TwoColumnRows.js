import React from 'react';

import { TwoColumnFieldRow, CenterThis, HalfGrid } from './';

const TwoColumnRows = (props) => {
  const {
    ticketNums,
    classOverrides,
    initialValues,
    leftLabel,
    rightLabel,
    edit,
    ticketSubmit,
    noEdit
  } = props;
  return (
    <div className={`${classOverrides}`}>
      <CenterThis classOverrides="mb2">
        <HalfGrid>
          <div>{leftLabel}</div>
        </HalfGrid>
        <HalfGrid>
          <div>{rightLabel}</div>
        </HalfGrid>
      </CenterThis>
      {ticketNums && ticketNums.length > 0 &&
        ticketNums.map((ticketNum) => {
          const name = `rate${ticketNum}Ticket`;
          return (<TwoColumnFieldRow
            ticketSubmit={ticketSubmit}
            edit={edit}
            leftLabel={ticketNum}
            initialValue={initialValues[name]}
            key={ticketNum}
            noEdit={noEdit}
            name={name} />);
        })
    }
    </div>
  );
};

export default TwoColumnRows;
