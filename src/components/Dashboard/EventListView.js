import React from 'react';

import { Colors } from '../../config/styles';
import { Card, FullScreenCenter } from '../common';
import { EventListCat } from './';

const EventListView = ({ user }) => (
  <div>
    <FullScreenCenter color={Colors.white}>
      <Card classOverrides="mw9" borderRadius="none">
        <div className="w-100 flex justify-between items-center mb4">
          <EventListCat type="upcoming" raffles={user.attributes.raffles} title="Upcoming Events" />
          <EventListCat type="past" raffles={user.attributes.raffles} title="Past Events" />
        </div>
      </Card>
    </FullScreenCenter>
  </div>
);

export default EventListView;
