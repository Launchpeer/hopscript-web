import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, CenterThis, Button, LoaderOrThis } from '../common';
import { LeadsList } from './';
import { LeadNavBar } from '../LeadsAdd';
import { Colors } from '../../config/styles';

const LeadsListView = () => (
  <FullScreenContainer classOverrides="bg-light-gray">
    <div className="w-100" style={{ paddingLeft: "100px" }}>
      <CenterThis>
        <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
          <LeadNavBar route={location.pathname} />
        </div>
      </CenterThis>

      <CenterThis>
        <div className="w-90 flex flex-row justify-around" style={{ backgroundColor: Colors.white }} >
          <LeadsList />
        </div>
      </CenterThis>
    </div>
  </FullScreenContainer>
);

export default LeadsListView;
