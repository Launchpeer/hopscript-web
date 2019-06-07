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

const leadsRoutes = ['leads-add', 'leads-list', 'lead-groups-list', 'lead-groups-add'];

const bgColor = (current, route) => {
  if (route === current) {
    return Colors.brandPrimaryShade;
  } else if (current === '/leads-add' && (leadsRoutes.includes(route.split('/')[1]))) {
    return Colors.brandPrimaryShade;
  }
  return Colors.brandPrimary;
};
const textColor = (current, route) => {
  if (route === current) {
    return Colors.white;
  } else if (current === '/leads-add' && (leadsRoutes.includes(route.split('/')[1]))) {
    return Colors.white;
  }
  return Colors.brandSecondary;
};

const userButton = (user, route, disableGlossary) => (
  <div
    role="button"
    style={{ cursor: route.includes('in-call') || disableGlossary === true ? 'not-allowed' : 'pointer' }}
    className="fixed bottom-1 mb2"
    onClick={() => !route.includes('in-call') && disableGlossary === false && (user.attributes.role === 'agent' ? browserHistory.push('agent-profile') : browserHistory.push('brokerage-profile'))}>
    <div
      className="bg-white br-100 flex items-center justify-center ml2 mr2"
      style={{
        width: '3rem',
        height: '3rem'
      }} >
      {user.get('photo') ? (
        <img src={user.get('photo')} style={{width: 30, height: 30, borderRadius: 15}} />
      ) : (
        <User color={Colors.brandPrimary} size={30} scale={3} />
      )}
    </div>
  </div>
);

const mapSidebarContent = (user, route, disableGlossary) => {
  const items = user === 'agent' ? agentItems : brokerItems;
  return (
    items.map(item => (
      <div
        key={item.label}
        role="button"
        style={{ backgroundColor: bgColor(item.route, route), color: textColor(item.route, route), cursor: route.includes('in-call') || disableGlossary === true ? 'not-allowed' : 'pointer' }}
        onClick={() =>
          !route.includes('in-call') && disableGlossary === false &&
          browserHistory.push(item.route)
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


const SideBar = ({ route, user, disableGlossary }) => (
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
          {mapSidebarContent(user.attributes.role, route, disableGlossary)}
          <CenterThis>
            {userButton(user, route, disableGlossary)}
          </CenterThis>
        </div>
      </div>
    }
  </div>
);

const mapStateToProps = ({ UserReducer, ScriptBuilderReducer }) => {
  const { user } = UserReducer;
  const { disableGlossary } = ScriptBuilderReducer;
  return {
    user,
    disableGlossary
  };
};

export default connect(mapStateToProps)(SideBar);
