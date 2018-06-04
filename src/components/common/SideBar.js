import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'underscore';
import { User } from 'react-feather';
import { Colors } from '../../config/styles';
import { Button, CenterThis, HeadphonesIcon, PeopleIcon, CallIcon, HistoryIcon, ScriptIcon } from './';

const divider = (
  <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />
);

const bgColor = (current, route) => {
  const color = route === current ? Colors.brandPrimaryShade : Colors.brandPrimary;
  return color;
};

const textColor = (current, route) => {
  const color = route === current ? Colors.white : Colors.brandSecondary;
  return color;
};


/* These are the different buttons that can go in the SideBar */
const Call = route => (
  <div className="pt4 pb4" style={{ backgroundColor: bgColor('call', route) }}>
    <div className="tc">
      <CallIcon width="20%" fill={textColor('call', route)} />
    </div>
    <div className="f5 tc" style={{ color: textColor('call', route) }}>
  Call
    </div>
  </div>
);

const Scripts = route => (
  <div className="pt4 pb4" style={{ backgroundColor: bgColor('script', route) }}>
    <div className="tc">
      <ScriptIcon width="20%" fill={textColor('script', route)} />
    </div>
    <div className="f5  tc" style={{ color: textColor('script', route) }}>
      Scripts
    </div>
  </div>
);

const Leads = fill => (
  <div className="pt4 pb4">
    <div className="tc">
      <PeopleIcon width="20%" fill={Colors.brandSecondary} />
    </div>
    <div className="f5 tc" >
          Leads
    </div>
  </div>
);

const Agents = route => (
  <div className="pt4 pb4" style={{ backgroundColor: bgColor('/add-agents', route) }}>
    <div className="tc">
      <PeopleIcon width="20%" fill={textColor('/add-agents', route)} />
    </div>
    <div className="f5  tc" style={{ color: textColor('/add-agents', route) }}>
            Agents
    </div>
  </div>
);

const History = route => (
  <div className="pt4 pb4">
    <div className="tc">
      <HistoryIcon width="20%" fill={textColor('/history', route)} />
    </div>
    <div className="f5 brand-secondary tc">
  History
    </div>
  </div>
);

const Profile = () => (
  <CenterThis>
    <div className="fixed bottom-1 mb2">
      <div
        className="bg-white br-100 flex items-center justify-center ml2 mr2"
        style={{
        width: '3rem',
        height: '3rem'
      }}
    >
        <User color={Colors.brandPrimary} size={30} scale={3} />
      </div>
    </div>
  </CenterThis>
);


/* This is the SideBar */
const SideBar = ({ route, user }) => (
  <div
    className="fl w-100"
    style={{
      backgroundColor: Colors.brandPrimary,
      height: '100vh'
    }}
  >
    <div
      className="flex flex-column mt4" >

      <div className="pb3" >
        <div className="tc">
          <HeadphonesIcon width="30%" fill={Colors.white} />
        </div>
        <div className="f5 white tc">
    BreezeBot
        </div>
      </div>
      <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />

      {user.attributes.role === 'agent' ? (
        <div>
          <div style={{ backgroundColor: bgColor('/call', route) }} role="button" onClick={() => console.log('you clicked call')}>
            <Call />
          </div>
          <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />

          <div style={{ backgroundColor: bgColor('/scripts', route) }} role="button" onClick={() => console.log('you clicked scripts')}>
            <Scripts />
          </div>
          <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />

          <div style={{ backgroundColor: bgColor('/add-leads', route), color: textColor('/add-leads', route) }} role="button" onClick={() => browserHistory.push('/add-leads')}>
            <Leads />
          </div>
          <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />

          <div style={{ backgroundColor: bgColor('/history', route) }} role="button" onClick={() => console.log('you clicked history')}>
            <History route={route} />
          </div>
          <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: bgColor('/add-agents', route), color: textColor('/add-agents', route) }} role="button" onClick={() => browserHistory.push('/add-agents')}>
            <Agents />
          </div>
          <div className="ba brand-primary-shade" style={{ backgroundColor: Colors.brandPrimaryShade }} />
        </div>
      )}


      <Profile />
    </div>
  </div>);


const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(SideBar);
