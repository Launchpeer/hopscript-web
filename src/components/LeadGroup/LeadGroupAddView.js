/**
 * The purpose of this file is to provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import { FullScreenContainer, CenterThis } from '../common';
import { LeadGroupAddForm } from './';

const LeadGroupAddView = () => (
  <FullScreenContainer classOverrides="mb4">
    <CenterThis>
      <LeadGroupAddForm />
    </CenterThis>
  </FullScreenContainer>
);

export default LeadGroupAddView;
