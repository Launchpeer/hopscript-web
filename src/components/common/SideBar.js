import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'underscore';
import { User } from 'react-feather';
import { Colors } from '../../config/styles';
import { CenterThis, HeadphonesIcon, CallIcon, PeopleIcon, HistoryIcon, ScriptIcon } from './';

const PathsWithoutSideBarContent = [
  '/',
  '/signup',
  '/sign-in',
  '/forgot-password',
  '/reset-password',
];

const agentItems = [
  {
    route: '/call',
    label: 'CALL',
    icon: (item, route) => <CallIcon width="25px" height="25px" color={textColor(item, route)} />
  },
  {
    route: '/scripts',
    label: 'SCRIPTS',
    icon: (item, route) => <ScriptIcon width="25px" height="25px" color={textColor(item, route)} />
  },
  {
    route: '/add-leads',
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
    route: '/list-agents',
    label: 'AGENTS',
    icon: (item, route) => <PeopleIcon width="25px" height="25px" color={textColor(item, route)} />
  },
];

const bgColor = (current, route) => route === current ? Colors.brandPrimaryShade : Colors.brandPrimary;
const textColor = (current, route) => route === current ? Colors.white : Colors.brandSecondary;

const mapSidebarContent = (user, route) => {
  const items = user === 'agent' ? agentItems : brokerItems;
  return (
    items.map(item => (
      <div
        className="pointer"
        key={item.label}
        role="button"
        style={{ backgroundColor: bgColor(item.route, route), color: textColor(item.route, route) }}
        onClick={() => browserHistory.push(item.route)} >
        <div style={{ paddingTop: '23px', paddingBottom: '23px' }}>
          <div className="tc">
            {item.icon(item.route, route)}
          </div>
          <div className="f5 tc mt1">{item.label}</div>
        </div>
        <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />
      </div>
    ))
  );
};

const SideBar = ({ route, user }) => (
  <div>
    {!(_.contains(PathsWithoutSideBarContent, route)) &&
      <div className="fl w-100" style={{ backgroundColor: Colors.brandPrimary, height: '100vh' }} >
        <div className="flex flex-column mt4" >
          <div className="pb3" >
            <div className="tc">
              <HeadphonesIcon width="30px" height="30px" color={Colors.white} />
            </div>
            <div className="f5 white tc">
              Hopscript
            </div>
          </div>
          <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />
          {mapSidebarContent(user.attributes.role, route)}
          <CenterThis>
            <div className="fixed bottom-1 mb2">
              <div
                className="bg-white br-100 flex items-center justify-center ml2 mr2"
                style={{
                  width: '3rem',
                  height: '3rem'
                }} >
                <User color={Colors.brandPrimary} size={30} scale={3} />
              </div>
            </div>
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
