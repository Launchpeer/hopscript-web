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
import { Colors } from '../../config/styles';
import { deleteProfile } from './ProfileActions';
import { ProfileForm } from './';

class GymDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.deleteProfile = this.deleteProfile.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  deleteProfile() {
    this.props.deleteProfile();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { showModal } = this.state;
    const { loading, user } = this.props;
    return (
      <FullScreenContainer classOverrides="mb4">
        <LoaderOrThis loading={loading}>
          <SubHeader
            label={user && user.attributes.guideName}
            route="profile"
          />
          <CenterThis>
            <ProfileForm />
          </CenterThis>
          <CenterThis>
            <div className="w-70 pa2">
              <a
                href="https://www.stripe.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button classOverrides="w-100" onClick={this.onButtonClick}>
                  Go To Stripe
                </Button>
              </a>
            </div>
          </CenterThis>
          <CenterThis>
            <div className="mw6 mb4 brand-deep-gray">
              IMPORTANT! Please note that if you choose Delete Account, your gym
              account and information will be forever permanently deleted. Think
              twice before deleting your account as it is an irreversable
              decision.
            </div>
          </CenterThis>
          <CenterThis>
            <Button
              borderWidth="1px"
              borderColor="brandDeepGray"
              backgroundColor="white"
              fontColor="brandDeepGray"
            >
              Permanently Delete Stubbin Account
            </Button>
          </CenterThis>
          {showModal && (
            <ModalCard header="Delete Gym" onClick={this.toggleModal}>
              <div className="pa4 pl5 pr5">
                <div className="pb4">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </div>
                <Button onClick={this.toggleModal} classOverrides="w-100 mb3">
                  Cancel
                </Button>
                <Button
                  borderWidth="1px"
                  borderColor="brandDeepGray"
                  backgroundColor="white"
                  fontColor="brandDeepGray"
                  classOverrides="w-100"
                  onClick={this.deleteProfile}
                >
                  Permanently Delete Stubbin Account
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
  deleteProfile
})(GymDetailView);
