// TODO: filter raffles by past and current

import React from 'react';

import { EventListItem } from './';

const PastRaffles = ({ raffles, classOverrides }) => (
  <div className={`mw8 center mb4 ${classOverrides}`}>
    <div className="brand-primary mb4">Past Raffles</div>
    {raffles && raffles.length > 0
        ? raffles.map(raffle => (
          <EventListItem raffle={raffle} key={raffle.id} past />
        ))
        : <div>No raffle history, yet</div>
    }
  </div>
);

export default PastRaffles;
