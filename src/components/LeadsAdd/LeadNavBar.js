import React from 'react';
import { browserHistory, Route } from 'react-router';
import { Colors } from '../../config/styles';

const navColor = (current, route) => {
  const color = route == current ? Colors.brandGreen : Colors.black;
  return color;
};

const divider = (
  <div className="ml2 mr2 ba light-gray" style={{ height: '100h', width: '3px', backgroundColor: Colors.lightGray }} />
);

const LeadNavBar = ({ route }) => (
  <div className="flex flex-row">
    <div
      className="b pa2 pointer"
      role="button"
      onClick={() => browserHistory.push('/add-leads')}
      style={{ color: navColor('/add-leads', route) }}

      >

      Add New Lead
    </div>
    {divider}
    <div
      className="b pa2 pointer"
      role="button"
      onClick={() => browserHistory.push('/list-leads')}
      style={{ color: navColor('/list-leads', route) }}
    >

      My Leads
    </div>
    {divider}
    <div
      className="b pa2 pointer"
      role="button"
      onClick={() => alert('Will open lead groups list when built')}
      style={{ color: navColor('/list-lead-groups', route) }}
      >

      Lead Groups
    </div>
  </div>

);


export default LeadNavBar;
