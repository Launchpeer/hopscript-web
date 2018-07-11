import React from 'react';
import { FullScreenContainer, LoaderOrThis, HSCard } from './';

const CardRight = props => (
  <FullScreenContainer>
    <LoaderOrThis loading={props.loading}>
      <div className="w-95 ml4 absolute right-1 mb4" styles={{ paddingLeft: '100px' }}>
        <HSCard>
          {props.children}
        </HSCard>
      </div>
    </LoaderOrThis>
  </FullScreenContainer>
);

export default CardRight;
