import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'underscore';

import { Colors } from '../../config/styles';
import { Button, ProfileDropDown } from './';

const PathsWithoutHeaderContent = [
  '/',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/brokerage-profile'
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

const headerContent = (route, user) => (
  <div
    className="pa2 flex justify-between items-center"
    style={{
      borderBottom: `5px solid ${Colors.brandSecondary}`
    }}
  >
    <div className="mw4 flex items-center">
      <div
        className="mw5 f1 ml3 mt1 mb1 b"
        style={{
          color: Colors.brandPrimary,
          size: 72
        }}
      >
        HopScript
      </div>
    </div>
    <div className="mr3">
      {_.contains(PathsWithHaveAccountButton, route)
        ? haveAccount()
        : showDropDown(user)}
    </div>
  </div>
);

const Header = ({ route, user }) => (
  <div
    className="w-100"
    style={{
      backgroundColor: _.contains(WhitePaths, route)
        ? Colors.white
        : Colors.brandOffWhite
    }}
  >
    {!_.contains(PathsWithoutHeaderContent, route) &&
      headerContent(route, user)}
  </div>
);

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(Header);
