/**
 * The purpose of this file is provide UI wrapping around LeadsList
 */

import React from 'react';
import { FullScreenContainer, CenterThis } from '../common';
import { LeadsList } from './';

const LeadsListView = () => (
  <FullScreenContainer>
    <CenterThis>
      <LeadsList />
    </CenterThis>
  </FullScreenContainer>
);

export default LeadsListView;
