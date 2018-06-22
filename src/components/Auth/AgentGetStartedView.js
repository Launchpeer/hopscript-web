import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, Button, CenterThis } from '../common';
import { Colors } from '../../config/styles';


const AgentGetStartedView = () => (
  <FullScreenContainer backgroundColor={Colors.brandPrimary}>
    <CenterThis>
      <div className="flex flex-column mv6">
        <div className="tc white mv3"> Welcome, agent! </div>
        <Button fontColor={Colors.brandPrimary} onClick={() => browserHistory.push('/dashboard')}> Get Started! </Button>
      </div>
    </CenterThis>
  </FullScreenContainer>
);

export default AgentGetStartedView;
