import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';
import { Colors } from '../../config/styles';


const divider = (<div style={{ borderLeft: "2px solid", borderColor: Colors.lightGray }} />);

const leadGroupRoutes = ['/lead-groups-add', '/lead-groups-list'];

const navColor = (current, route) => {
  if (route === current) {
    return Colors.brandGreen;
  } else if (current === '/lead-groups-list' && (_.contains(leadGroupRoutes, route))) {
    return Colors.brandGreen;
  }
  return Colors.black;
};


const LeadNavBar = ({ route }) => (
  <div className="flex flex-row bb bw2 b--light-gray pa3 f4">
    <div
      className="b pa2 pointer mr2"
      role="button"
      onClick={() => browserHistory.push('/leads-add')}
      style={{ color: navColor('/leads-add', route) }}>
      Add New Lead
    </div>
    {divider}
    <div
      className="b pa2 pointer ml2 mr2"
      role="button"
      onClick={() => browserHistory.push('/leads-list')}
      style={{ color: navColor('/leads-list', route) }}>
      My Leads
    </div>
    {divider}
    <div
      className="b pa2 pointer ml2 mr2"
      role="button"
      onClick={() => browserHistory.push('/lead-groups-list')}
      style={{ color: navColor('/lead-groups-list', route) }}>
      Lead Groups
    </div>
  </div>
);


export default LeadNavBar;
