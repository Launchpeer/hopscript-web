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
    return (
      <FullScreenContainer color="white">
        <div className="flex flex-wrap justify-around mt4 mw9 center" />


        {user.attributes.role === 'agent' ? (
          <div>
            <div>You are an AGENT.</div>
            <div className="pa3">
              <Button
                backgroundColor={Colors.black}
                onClick={() => browserHistory.push('/agent-profile')}
      >
        Agent Profile
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
          </div>) : (
            <div>
              <div>You are a BROKER.</div>
              <div className="pa3">
                <Button
                  backgroundColor={Colors.black}
                  onClick={() => browserHistory.push('/brokerage-profile')}
      >
        Brokerage Profile
                </Button>
              </div>
            </div>

  )}


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
