import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FullScreenContainer,
  SubHeader,
  CenterThis,
  Button,
  CardWithLabel,
  LoaderOrThis,
  ModalCard
} from '../common';
import { Colors, BorderRadius } from '../../config/styles';
import { deleteBrokerProfile } from './BrokerProfileActions';
import { BrokerProfileForm } from './';
import { logOutUser } from '../Auth/AuthActions';

class BrokerDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.deleteBrokerProfile = this.deleteBrokerProfile.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  deleteBrokerProfile() {
    this.props.deleteProfile();
  }

  handleSignOut() {
    this.props.logOutUser();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  // onClick={() => this.handleSignout}
  render() {
    const { showModal } = this.state;
    const { loading, user } = this.props;
    return (
      <FullScreenContainer classOverrides="mb4">
        <LoaderOrThis loading={loading}>
          <CenterThis>
            <BrokerProfileForm />
          </CenterThis>
          <CenterThis>
            <div className="w-70 pa2">
              <Button
                classOverrides="w-100"
                onClick={() => this.handleSignOut()}
                backgroundColor={Colors.black}
                fontColor="white"
                borderRadius={BorderRadius.all}
              >
                log out
              </Button>
            </div>
          </CenterThis>
          <CenterThis>
            <div className="w-70 pa2">
              <Button
                classOverrides="w-100"
                backgroundColor={Colors.mediumRed}
                fontColor="white"
                borderRadius={BorderRadius.all}
              >
                delete my account
              </Button>
            </div>
          </CenterThis>
          {showModal && (
            <ModalCard header="Delete Account" onClick={this.toggleModal}>
              <div className="pa4 pl5 pr5">
                <div className="pb4">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </div>
                <Button
                  onClick={() => this.toggleModal()}
                  classOverrides="w-100 mb3"
                >
                  Cancel
                </Button>
                <Button
                  borderWidth="1px"
                  borderColor="brandDeepGray"
                  backgroundColor="white"
                  fontColor="brandDeepGray"
                  classOverrides="w-100"
                  onClick={this.deleteBrokerProfile}
                >
                  Permanently Delete Account
                </Button>
              </div>
            </ModalCard>
          )}
        </LoaderOrThis>
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

export default connect(mapStateToProps, {
  deleteBrokerProfile,
  logOutUser
})(BrokerDetailView);
