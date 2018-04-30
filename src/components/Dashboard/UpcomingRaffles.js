// TODO: filter raffles by past and current

import React from 'react';
import { EventListItem } from './';

const UpcomingRaffles = ({ classOverrides, raffles }) => (
  <div className={`mw8 center mb4 ${classOverrides}`}>
    <div className="brand-primary mb4">Upcoming Raffles</div>
    {raffles && raffles.length > 0
        ? raffles.map(raffle => (
          <EventListItem raffle={raffle} key={raffle.id} type="upcoming" />
        ))
        : <div>No upcoming raffles</div>
    }
  </div>
);

export default UpcomingRaffles;
