/*
This is the Dashboard View component.
If the user is an agent, they will see the agent dashboard.
If the user is a Brokerage, they'll see the Brokerage dashboard display.
If the Brokerage has any agents, the dashboard will show a list of agents.
If the Brokerage does not have agents, it will display a "get started" message.
*/

import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { FullScreenContainer, CenterThis } from '../common';
import { AgentsListView } from '../AgentsList';
import { Colors } from '../../config/styles';

const BrokerageDisplay = ({ user }) => {
  if (user.attributes.agents) { return <AgentsListView />; } return (
    <div>
      <CenterThis>
        <div className="w-90 mt3 mb1 pa3 f4 flex justify-between" style={{ backgroundColor: Colors.white }} >
          <div className="b pt3 pb3 pl2">Agents</div>
          <div onClick={() => browserHistory.push('/add-agents')} className="pointer white pt3 pb3 pl4 pr4 f5" style={{ backgroundColor: Colors.brandGreen, borderRadius: '4px' }} role="button">
            Add Agent
          </div>

        </div>
      </CenterThis>
      <CenterThis>
        <div className="w-90 flex flex-row justify-around" style={{ backgroundColor: Colors.white, height: "85vh" }} >
          <div className="w-75 mt6 mb6 tc f4" style={{ color: Colors.silver }}>
            Welcome to Breeze Bot! <br /> <br />
            You currently do not have any agents. <br />
            “Add Agents” to invite your team to Breeze Bot! <br /> <br />
            Your agents will receive an email invitation<br />
            to set up their account, create scripts and call leads!
          </div>

        </div>
      </CenterThis>
    </div>
  );
};


const DashboardView = ({ user }) => (
  <FullScreenContainer classOverrides="vh-100 bg-light-gray">
    <div className="w-100" style={{ paddingLeft: "100px" }}>
      {user.attributes.role === 'agent' ? (<div>Agent Dashboard</div>) : (<BrokerageDisplay user={user} />) }
    </div>
  </FullScreenContainer>
);


const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(DashboardView);
