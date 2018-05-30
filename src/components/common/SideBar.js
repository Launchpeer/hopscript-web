import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'underscore';

import { Colors } from '../../config/styles';
import { Button, ProfileDropDown, CenterThis, HeadphonesIcon } from './';

const PathsWithoutSidebarContent = [
  '/',
  '/signup',
  '/forgot-password',
  '/reset-password'
];

const PathsWithHaveAccountButton = ['/stripe'];

const WhitePaths = ['/dashboard', '/profile'];

const haveAccount = () => (
  <div className="flex items-center">
    <div
      className="mr3 dn di-ns"
      style={{
        color: Colors.brandPrimary
      }}
    >
      Already have an account ?
    </div>
    <Button fontColor="brandPrimary" onClick={() => browserHistory.push('/')}>
      Log In
    </Button>
  </div>
);

const showDropDown = (user) => {
  if (user) {
    return <ProfileDropDown user={user} />;
  }
  return '';
};

const sidebarContent = (route, user) => (
  <div
    className="pa2 flex flex-column" >
    <div className="tc mb2">
      <HeadphonesIcon width="40%" fill={Colors.white} />
    </div>
    <div className="f5 white tc">
    BreezeBot
    </div>
    <CenterThis>
      <div className="fixed bottom-1 mb2">
        {_.contains(PathsWithHaveAccountButton, route)
        ? haveAccount()
        : showDropDown(user)}
      </div>
    </CenterThis>
  </div>
);

const SideBar = ({ route, user }) => (
  <div
    className="fl w-100 "
    style={{
      backgroundColor: Colors.brandPrimary,
      height: '100vh'
    }}
  >
    {!_.contains(PathsWithoutSidebarContent, route) &&
      sidebarContent(route, user)}
  </div>
);

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(SideBar);
