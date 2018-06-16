import React from 'react';

import { LeadNavCard } from '../';
import { LeadGroupList } from './';

const LeadGroupListView = ({ location }) => (
  <LeadNavCard location={location}>
    <LeadGroupList />
  </LeadNavCard>
);

export default LeadGroupListView;
