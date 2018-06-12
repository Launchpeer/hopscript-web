/**
 * The purpose of this file is to provide UI wrapping around LeadGroupAddForm
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, CenterThis, Button, HalfGrid } from '../../common';
import { LeadGroupAddForm, LeadGroupLeadList } from './';
import { Colors, BorderRadius } from '../../../config/styles';
import { LeadNavBar } from '../LeadsCommon';

const LeadGroupAddView = () => (
  <FullScreenContainer classOverrides="vh-100 bg-light-gray">
    <div className="w-100" style={{ paddingLeft: "100px" }}>
      <CenterThis>
        <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
          <LeadNavBar route="/list-lead-groups" />
        </div>
      </CenterThis>

      <CenterThis>
        <div className="flex flex-column w-90" style={{ backgroundColor: Colors.white }}>
          <div className="items-center">
            <HalfGrid>
              <CenterThis>
                <div className="pa4 w-100" >
                  <div className="b mb3">All Leads</div>
                  <div className="ba pa3" style={{ borderColor: Colors.lightGray, borderRadius: BorderRadius.all }}>
                    <LeadGroupLeadList />
                  </div>
                </div>
              </CenterThis>
            </HalfGrid>

            <HalfGrid>
              <CenterThis>
                <div className="pa4 w-100" >
                  <div className="b mb3">Leads In Group</div>
                  <div className="ba pa3" style={{ borderColor: Colors.lightGray, borderRadius: BorderRadius.all }}>
                    <LeadGroupAddForm />
                  </div>
                </div>
              </CenterThis>
            </HalfGrid>
          </div>
          <div className="pv4 pr4">
            <Button classOverrides="fr f5 w4 pv2 mh2" borderColor={Colors.brandGreen} borderWidth="1px" backgroundColor={Colors.brandGreen} onClick={() => console.log("save")}>Save</Button>
            <Button classOverrides="fr f5 w4 pv2 mh2" borderColor={Colors.brandGreen} borderWidth="1px" fontColor={Colors.brandGreen} onClick={() => console.log("cancel")}>Cancel</Button>
          </div>
        </div>
      </CenterThis>
    </div>
  </FullScreenContainer>
);

export default LeadGroupAddView;
