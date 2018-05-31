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
  const color = route.includes(current) ? Colors.brandPrimaryShade : Colors.brandPrimary;
  return color;
};

const textColor = (current, route) => {
  const color = route.includes(current) ? Colors.white : Colors.brandSecondary;
  return color;
};

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

      <div className="pt4 pb4" style={{ backgroundColor: bgColor('call', route) }}>
        <div className="tc">
          <CallIcon width="20%" fill={textColor('call', route)} />
        </div>
        <div className="f5 tc" style={{ color: textColor('call', route) }}>
      Call
        </div>
      </div>

      {divider}

      <div className="pt4 pb4" style={{ backgroundColor: bgColor('script', route) }}>
        <div className="tc">
          <ScriptIcon width="20%" fill={textColor('script', route)} />
        </div>
        <div className="f5  tc" style={{ color: textColor('script', route) }}>
      Scripts
        </div>
      </div>


      {divider}

      {user.attributes.role === 'brokerage' ?
        (
          <div className="pt4 pb4" style={{ backgroundColor: bgColor('agent', route) }}>
            <div className="tc">
              <PeopleIcon width="20%" fill={textColor('agent', route)} />
            </div>
            <div className="f5 tc" style={{ color: textColor('agent', route) }}>
              Agents
            </div>
          </div>
  ) : (
    <div className="pt4 pb4" style={{ backgroundColor: bgColor('lead', route) }}>
      <div className="tc">
        <PeopleIcon width="20%" fill={textColor('lead', route)} />
      </div>
      <div className="f5  tc" style={{ color: textColor('lead', route) }}>
              Leads
      </div>
    </div>
        )}


      {divider}

      <div className="pt4 pb4">
        <div className="tc">
          <HistoryIcon width="20%" fill={Colors.brandSecondary} />
        </div>
        <div className="f5 brand-secondary tc">
      History
        </div>
      </div>

      {divider}

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
    </div>


  </div>);


const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(SideBar);
