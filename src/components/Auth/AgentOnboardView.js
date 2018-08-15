import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CenterThis, FullScreenContainer } from '../common';
import { Colors } from '../../config/styles';
import { AgentOnboardForm } from './';
import { clearError } from './AuthActions';
import { fetchUser } from '../UserActions';


class AgentOnboardView extends Component {
  constructor(props) {
    super(props);
    this.props.clearError();
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    const { user } = this.props;
    return (
      <FullScreenContainer color={Colors.nearWhite}>
        <div className="w-100">
          <CenterThis>
            <div className="w-40-l mw6 mt6 mb5">
              <img alt="hopscript logo" src="/images/HopscriptLogo.png" />
            </div>
          </CenterThis>
          <CenterThis>
            <div className="w-40-l mw6">
              <Card classOverrides="mb5 pl3 pr3 pt3 bg-white" boxShadow >
                {user && <AgentOnboardForm user={user} /> }
              </Card>
            </div>
          </CenterThis>
        </div>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user,
  };
};

export default connect(mapStateToProps, { clearError, fetchUser })(AgentOnboardView);
