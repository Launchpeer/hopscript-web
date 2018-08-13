import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'underscore';
import { User } from 'react-feather';
import { Colors } from '../../config/styles';
import { CenterThis, KangarooIcon, CallIcon, PeopleIcon, HistoryIcon, ScriptIcon } from './';

const PathsWithoutSideBarContent = [
  '/',
  '/signup',
  '/sign-in',
  '/forgot-password',
  '/reset-password',
  '/welcome',
  '/agent-onboard',
  '/stripe',
];

const agentItems = [
  {
    route: '/start-call',
    label: 'CALL',
    icon: (item, route) => <CallIcon width="25px" height="25px" color={textColor(item, route)} />
  },
  {
    route: '/scripts',
    label: 'SCRIPTS',
    icon: (item, route) => <ScriptIcon width="25px" height="25px" color={textColor(item, route)} />
  },
  {
    route: '/leads-add',
    label: 'LEADS',
    icon: (item, route) => <PeopleIcon width="25px" height="25px" color={textColor(item, route)} />
  },
  {
    route: '/history',
    label: 'HISTORY',
    icon: (item, route) => <HistoryIcon width="25px" height="25px" color={textColor(item, route)} />
  },
];

const brokerItems = [
  {
    route: '/agents-list',
    label: 'AGENTS',
    icon: (item, route) => <PeopleIcon width="25px" height="25px" color={textColor(item, route)} />
  },
];

const leadsRoutes = ['/leads-add', '/leads-list', '/lead-groups-list'];

const bgColor = (current, route) => {
  if (route === current) {
    return Colors.brandPrimaryShade;
  } else if (current === '/leads-add' && (_.contains(leadsRoutes, route))) {
    return Colors.brandPrimaryShade;
  }
  return Colors.brandPrimary;
};
const textColor = (current, route) => {
  if (route === current) {
    return Colors.white;
  } else if (current === '/leads-add' && (_.contains(leadsRoutes, route))) {
    return Colors.white;
  }
  return Colors.brandSecondary;
};

const userButton = (user, route) => (
  <div
    role="button"
    style={{ cursor: route.includes('in-call') ? 'not-allowed' : 'pointer' }}
    className="fixed bottom-1 mb2"
    onClick={() => !route.includes('in-call') && (user.attributes.role === 'agent' ? browserHistory.push('agent-profile') : browserHistory.push('brokerage-profile'))}>
    <div
      className="bg-white br-100 flex items-center justify-center ml2 mr2"
      style={{
          width: '3rem',
          height: '3rem'
}} >
      <User color={Colors.brandPrimary} size={30} scale={3} />
    </div>
  </div>
);

const mapSidebarContent = (user, route) => {
  const items = user === 'agent' ? agentItems : brokerItems;
  return (
    items.map(item => (
      <div
        key={item.label}
        role="button"
        style={{ backgroundColor: bgColor(item.route, route), color: textColor(item.route, route), cursor: route.includes('in-call') ? 'not-allowed' : 'pointer' }}
        onClick={() =>
        !route.includes('in-call') && browserHistory.push(item.route)
        } >
        <div style={{ paddingTop: '23px', paddingBottom: '23px' }}>
          <div className="tc">
            {item.icon(item.route, route)}
          </div>
          <div className="f5 tc mt1">{item.label}</div>
        </div>
        <div className="ba brand-primary-shade" />
      </div>
    ))
  );
};


const SideBar = ({ route, user }) => (
  <div>
    {!(_.contains(PathsWithoutSideBarContent, route)) &&
      <div className="fl w-100" style={{ backgroundColor: Colors.brandPrimary, height: '100vh' }} >
        <div className="flex flex-column mt4" >
          <div className="pb3">
            <div className="tc">
              <KangarooIcon width="60px" height="60px" color={Colors.white} />
            </div>
          </div>
          <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />
          {mapSidebarContent(user.attributes.role, route)}
          <CenterThis>
            {userButton(user, route)}
          </CenterThis>
        </div>
      </div>
    }
  </div>
);

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(SideBar);
