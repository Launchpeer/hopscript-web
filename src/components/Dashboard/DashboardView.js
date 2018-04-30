import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullScreenContainer, SubHeader } from '../common';

class DashboardView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, location } = this.props;
    return (
      <FullScreenContainer color="white">
        {user && (
          <SubHeader
            label={user && user.attributes.guideName}
            route={location.pathname}
          />
        )}
        <div className="flex flex-wrap justify-around mt4 mw9 center" />
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(DashboardView);
