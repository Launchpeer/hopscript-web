/**
 * The purpose of this file is provide UI wrapping around AgentsAddForm
 */

import React from 'react';
import { FullScreenContainer, CenterThis, LoaderOrThis } from '../common';
import { LeadsAddForm } from './';

const LeadsAddView = () => (
  <FullScreenContainer classOverrides="mb4">
    <CenterThis>
      <LeadsAddForm />
    </CenterThis>
  </FullScreenContainer>
);

export default LeadsAddView;
