import React from 'react';

import { LeadNavCard } from '../';
import { LeadsList } from './';

const LeadsListView = ({ location }) => (
  <LeadNavCard location={location}>
    <LeadsList />
  </LeadNavCard>
);

export default LeadsListView;
