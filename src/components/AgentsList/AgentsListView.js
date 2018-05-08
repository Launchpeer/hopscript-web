/**
 * The purpose of this file is provide UI wrapping around AgentsList
 */

import React from 'react';
import {
  FullScreenContainer,
  CenterThis
} from '../common';
import { AgentsList } from './';

const AgentsListView = () => (
  <FullScreenContainer>
    <CenterThis>
      <AgentsList />
    </CenterThis>
  </FullScreenContainer>
)

export default AgentsListView;
