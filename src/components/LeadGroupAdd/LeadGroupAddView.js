/**
 * The purpose of this file is to provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import { FullScreenContainer, CenterThis, Button } from '../common';
import { LeadGroupAddForm } from './';
import { browserHistory } from 'react-router';
import { Colors } from '../../config/styles';

const LeadGroupAddView = () => (
  <FullScreenContainer classOverrides="vh-100 bg-light-gray">
    <CenterThis>
      <LeadGroupAddForm />
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

export default LeadGroupAddView;
