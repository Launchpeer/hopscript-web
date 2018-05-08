/**
 * The purpose of this file is provide UI wrapping around AgentsAddForm
 */

import React from 'react';
import {
  FullScreenContainer,
  CenterThis,
  LoaderOrThis
} from '../common';
import { AgentsAddForm } from './';

const AgentsAddView = () => (
  <FullScreenContainer classOverrides="mb4">
    <CenterThis>
      <AgentsAddForm />
    </CenterThis>
  </FullScreenContainer>
)

export default AgentsAddView;
