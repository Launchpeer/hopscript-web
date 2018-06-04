import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullScreenContainer, SubHeader, Button } from '../common';
import { Colors } from '../../config/styles';
import { browserHistory } from 'react-router';

class DashboardView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, location } = this.props;
    console.log('user', user);
    return (
      <FullScreenContainer color="white">
        {user && (
          <SubHeader
            label={user && user.attributes.guideName}
            route={location.pathname}
          />
        )}
        <div className="flex flex-wrap justify-around mt4 mw9 center" />
        <div className="pa3">
          <Button
            backgroundColor={Colors.black}
            onClick={() => browserHistory.push('/brokerage-profile')}
          >
            {' '}
            Brokerage Profile{' '}
          </Button>
        </div>
        <div className="pa3">
          <Button
            backgroundColor={Colors.black}
            onClick={() => browserHistory.push('/add-leads')}
          >
            Add Leads
          </Button>
        </div>
        <div className="pa3">
          <Button
            backgroundColor={Colors.black}
            onClick={() => browserHistory.push('/list-leads')}
          >
            Leads List
          </Button>
        </div>
        <div className="pa3">
          <Button
            backgroundColor={Colors.black}
            onClick={() => browserHistory.push('/add-lead-group')}
          >
            Add Lead Group
          </Button>
        </div>
        <div className="pa3">
          <Button
            backgroundColor={Colors.black}
            onClick={() => browserHistory.push('/list-lead-groups')}
          >
            Lead Groups List
          </Button>
        </div>


        {user.attributes.role === "brokerage" ? (<div>You are a Broker</div>) : (<div>You are an Agent</div>) }

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
