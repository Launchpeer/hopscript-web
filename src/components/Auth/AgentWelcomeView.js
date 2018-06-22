import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, Button, CenterThis } from '../common';
import { Colors, BorderRadius } from '../../config/styles';


const AgentWelcomeView = () => (
  <FullScreenContainer backgroundColor={Colors.brandPrimary}>
    <CenterThis>
      <div className="flex flex-column tc white mv4">
        <div className="mv3">
          <img alt="Welcome" style={{ height: '100px' }} src="/images/Welcome.png" />
        </div>

        <div className="mv4 mh6 flex flex-row">
          <div className="pt2 pb5 ph2 mh1" style={{ backgroundColor: Colors.white, borderRadius: BorderRadius.all }}>
            <img alt="Welcome" src="/images/illustration-02.png" />
            <div className="b f5 black mb1">STEP 1</div>
            <div className="b f4 black mb2">Create a Script</div>
            <div className="black">
              A script is an easy outline <br />
              to follow while calling your leads.
            </div>
          </div>

          <div className="pt2 pb5 ph2 mh1" style={{ backgroundColor: Colors.white, borderRadius: BorderRadius.all }}>
            <img alt="Welcome" src="/images/illustration-03.png" />
            <div className="b f5 black mb1">STEP 2</div>
            <div className="b f4 black mb2">Add new Leads</div>
            <div className="black">
              Add each lead individually, <br />
              or you can import a list of leads <br />
              using a CSV template.
            </div>
          </div>

          <div className="pt2 pb5 ph2 mh1" style={{ backgroundColor: Colors.white, borderRadius: BorderRadius.all }}>
            <img alt="Welcome" src="/images/illustration-04.png" />
            <div className="b f5 black mb1">STEP 3</div>
            <div className="b f4 black mb2">Create Groups</div>
            <div className="black">
              Let's say you want to create a list<br />
              of leads to call on Monday.
            </div>
          </div>
          <div className="pt2 pb5 ph2 mh1" style={{ backgroundColor: Colors.white, borderRadius: BorderRadius.all }}>
            <img alt="Welcome" src="/images/illustration-01.png" />
            <div className="b f5 black mb1">STEP 4</div>
            <div className="b f4 black mb2">Start a Call</div>
            <div className="black">
              During your call, take notes, <br />
              select the question <br />
              based on the lead's answer.
            </div>
          </div>


        </div>
        <div>
          <Button classOverrides="b ph6 pv3 shadow-3" fontColor={Colors.brandPrimary} borderRadius={BorderRadius.none} onClick={() => browserHistory.push('/dashboard')}> Get Started </Button>
        </div>
      </div>
    </CenterThis>
  </FullScreenContainer>
);

export default AgentWelcomeView;
