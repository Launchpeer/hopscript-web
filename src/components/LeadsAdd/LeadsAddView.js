/**
 * The purpose of this file is to provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, CenterThis, Button } from '../common';
import { LeadsAddForm, LeadsCSVForm } from './';
import { Colors } from '../../config/styles';

const LeadsAddView = () => (
  <FullScreenContainer classOverrides="mb4">
    <CenterThis>
      <LeadsAddForm />
      <LeadsCSVForm />
    </CenterThis>
    <div className="pa3">
      <Button
        backgroundColor={Colors.black}
        onClick={() => browserHistory.push('/dashboard')}
      >
        Back to dashboard
      </Button>
    </div>
  </FullScreenContainer>
);

export default LeadsAddView;
