import React from 'react';
import { EventCard } from './';

const EventDetailStatsView = (props) => {
  const { raffleStats } = props;
  return (
    <div className="mt4 w-100 pa4 pl2-ns pr5-ns ">
      <EventCard raffleStats={raffleStats} dataType="tickets" classOverrides="fl w-100 pv3" />
      <EventCard raffleStats={raffleStats} dataType="payments" classOverrides="fl w-100 pv3" />
      <EventCard raffleStats={raffleStats} dataType="beneficiaryPayments" classOverrides="fl w-100 pv3" />
    </div>
  );
};

export default EventDetailStatsView;
