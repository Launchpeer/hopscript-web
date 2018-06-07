import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, CenterThis, Button } from '../../common';
import { LeadNavBar } from '../LeadsCommon';
import { LeadGroupList } from './';
import { Colors } from '../../../config/styles';

const LeadGroupListView = () => (
  <FullScreenContainer classOverrides="vh-100 bg-light-gray">
    <div className="w-100" style={{ paddingLeft: "100px" }}>
      <div className="w-100" style={{ paddingLeft: "100px" }}>
        <CenterThis>
          <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
            <LeadNavBar route={location.pathname} />
          </div>
        </CenterThis>

        <CenterThis>
          <div className="w-90 flex flex-row justify-around pa4" style={{ backgroundColor: Colors.white }} >
            <LeadGroupList />
          </div>
        </CenterThis>
      </div>
    </div>
  </FullScreenContainer>
);

export default LeadGroupListView;