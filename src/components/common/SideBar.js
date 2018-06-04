import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'underscore';
import { User } from 'react-feather';
import { Colors } from '../../config/styles';
import { Button, ProfileDropDown, CenterThis, HeadphonesIcon, PeopleIcon } from './';


const showDropDown = (user) => {
  if (user) {
    return <ProfileDropDown user={user} />;
  }
  return '';
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
      className="pa2 flex flex-column mt3" >
      <div className="tc mb2">
        <HeadphonesIcon width="30%" fill={Colors.white} />
      </div>
      <div className="f5 white tc mb4">
    BreezeBot
      </div>
      <div>
        <div className="tc">
          <PeopleIcon width="35%" fill={Colors.brandSecondary} />
        </div>
        <div className="f5 brand-secondary tc mb3">
  Agents
        </div>
      </div>
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