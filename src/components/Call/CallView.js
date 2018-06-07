/**
 * The purpose of this file is to provide UI wrapping around CallForm
 */

import React from 'react';
import { FullScreenContainer, CenterThis } from '../common';
import { CallForm } from './';


const CallView = () => (
  <FullScreenContainer classOverrides="vh-100 bg-light-gray">
    <CenterThis>
      <CallForm />
    </CenterThis>
  </FullScreenContainer>
);

export default CallView;
