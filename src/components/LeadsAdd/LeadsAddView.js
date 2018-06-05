/**
 * The purpose of this file is to provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import { FullScreenContainer, CenterThis } from '../common';
import { LeadsAddForm, LeadsCSVForm, LeadNavBar } from './';
import { Colors } from '../../config/styles';

const LeadsAddView = ({ location }) => (
  <FullScreenContainer classOverrides="vh-100 bg-light-gray">
    <div className="w-100" style={{ paddingLeft: "100px" }}>
      <CenterThis>
        <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
          <LeadNavBar route={location.pathname} />
        </div>
      </CenterThis>

      <CenterThis>
        <div className="w-90 flex flex-row justify-around" style={{ backgroundColor: Colors.white }} >
          <div className="w-40 mt6 "><LeadsCSVForm /></div>
          <div className="w-40 mt6 mb5">  <LeadsAddForm /></div>
        </div>
      </CenterThis>

    </div>
  </FullScreenContainer>);


export default LeadsAddView;
