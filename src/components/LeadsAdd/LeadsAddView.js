/**
 * The purpose of this file is provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import {
  FullScreenContainer,
  CenterThis,
} from '../common';
import { LeadsAddForm } from './';

const LeadsAddView = () => (
  <FullScreenContainer classOverrides="mb4">
    <CenterThis>
      <LeadsAddForm />
    </CenterThis>
  </FullScreenContainer>
);

export default LeadsAddView;
