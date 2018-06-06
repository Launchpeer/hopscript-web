import React from 'react';
import { browserHistory } from 'react-router';
import { Colors } from '../../config/styles';

const navColor = (current, route) => route === current ? Colors.brandGreen : Colors.black;

const divider = (<div style={{ borderLeft: "2px solid", borderColor: Colors.lightGray }} />);

const LeadNavBar = ({ route }) => (
  <div className="flex flex-row">
    <div
      className="b pa2 pointer mr2"
      role="button"
      onClick={() => browserHistory.push('/add-leads')}
      style={{ color: navColor('/add-leads', route) }}>
      Add New Lead
    </div>
    {divider}
    <div
      className="b pa2 pointer ml2 mr2"
      role="button"
      onClick={() => browserHistory.push('/list-leads')}
      style={{ color: navColor('/list-leads', route) }}>
      My Leads
    </div>
    {divider}
    <div
      className="b pa2 pointer ml2 mr2"
      role="button"
      onClick={() => console.log('Will open lead groups list when built')}
      style={{ color: navColor('/list-lead-groups', route) }}>
      Lead Groups
    </div>
  </div>
);


export default LeadNavBar;
