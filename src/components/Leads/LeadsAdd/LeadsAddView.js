/**
 * The purpose of this file is to provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import { FullScreenContainer, CenterThis, HalfGrid } from '../../common';
import { LeadsAddForm, LeadsCSVForm } from './';
import { LeadNavBar } from '../LeadsCommon';
import { Colors } from '../../../config/styles';

const LeadsAddView = () => (
  <FullScreenContainer classOverrides="vh-100 bg-light-gray">
    <div className="w-100" style={{ paddingLeft: "100px" }}>
      <CenterThis>
        <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
          <LeadNavBar route="/add-leads" />
        </div>
      </CenterThis>

      <CenterThis>
        <div className="flex flex-column w-90" style={{ backgroundColor: Colors.white }}>
          <div className="items-center vh-75 mt5">
            <HalfGrid>
              <CenterThis>
                <div className="pa4 w-100" >
                  <LeadsCSVForm />
                </div>
              </CenterThis>
            </HalfGrid>
            <HalfGrid>
              <CenterThis>
                <div className="pa4 w-100" >
                  <LeadsAddForm />
                </div>
              </CenterThis>
            </HalfGrid>
          </div>
        </div>
      </CenterThis>

    </div>
  </FullScreenContainer>);


export default LeadsAddView;
