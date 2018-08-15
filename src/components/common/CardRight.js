import React from 'react';
import { FullScreenContainer, LoaderOrThis, HSCard } from './';

const CardRight = props => (
  <FullScreenContainer>
    <LoaderOrThis loading={props.loading}>
      <div className="w-100 mb4" >
        <HSCard>
          {props.children}
        </HSCard>
      </div>
    </LoaderOrThis>
  </FullScreenContainer>
);

export default CardRight;
