import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, CenterThis, Button } from '../common';
import { LeadGroupList } from './';
import { Colors } from '../../config/styles';

const LeadGroupListView = () => (
  <FullScreenContainer>
    <CenterThis>
      <LeadGroupList />
    </CenterThis>
    <div className="pa3 tc">
      <Button
        backgroundColor={Colors.black}
        onClick={() => browserHistory.push('/add-lead-group')}
      >
        Add Lead Group
      </Button>
    </div>
  </FullScreenContainer>
);

export default LeadGroupListView;
