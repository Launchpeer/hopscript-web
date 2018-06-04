import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FullScreenContainer,
  SubHeader,
  CenterThis,
  Button,
  CardWithLabel,
  LoaderOrThis,
  ModalCard,
  SideBar,
  Card
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
    this.props.deleteBrokerProfile();
  }

  handleSignOut() {
    this.props.logOutUser();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { showModal } = this.state;
    const { loading, user } = this.props;
    return (

      <FullScreenContainer classOverrides="vh-100 bg-light-gray">
        <LoaderOrThis loading={loading}>
          <div className="dib mw4-ns w-10 vh-100 " style={{ position: 'fixed' }}>
            <div className="w-100" >
              <SideBar />
            </div>
          </div>
          <div className="w-90 absolute right-0" >

            <CenterThis>
              <div className="w-90 mt3 mb1 pa3 f4 flex justify-between" style={{ backgroundColor: Colors.white }} >
                <div className="b pa2">Broker Account</div>
                <div onClick={this.handleSignOut} className="pointer white pt2 pb2 pl4 pr4 f5" style={{ backgroundColor: Colors.brandGreen, borderRadius: '4px' }} role="button">
              Logout
                </div>

              </div>
            </CenterThis>
            <CenterThis>

              <div className="w-90" style={{ backgroundColor: Colors.white }} >

                <CenterThis>
                  <div className="w-50 mt5 mb4">
                    <BrokerProfileForm />
                  </div>
                </CenterThis>

                <CenterThis>
                  <div className="silver f5 tc w-50 mb3">
                    IMPORTANT! Please note that if you choose "Delete Account",
                    your account and information will be forever permanently deleted.
                    Think twice before deleting your account as it is an irreversable decision.
                  </div>
                </CenterThis>
                <CenterThis>
                  <div className="w-50 mb6">
                    <Button
                      classOverrides="w-100 f5 "
                      backgroundColor={Colors.white}
                      fontColor="silver"
                      borderRadius="10px"
                      borderColor="silver"
                      borderWidth="1px"
                      onClick={() => this.toggleModal()}
             >
               Permanently Delete Account
                    </Button>
                  </div>
                </CenterThis>

                {showModal && (
                <ModalCard header="Delete Account" onClick={this.toggleModal}>
                  <div className="pa4 pl5 pr5">
                    <div className="mb4">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                    </div>
                    <Button
                      onClick={() => this.toggleModal()}
                      classOverrides="w-100 mb3"
                      fontColor="silver"
                      borderRadius="10px"
                      borderColor="silver"
                      borderWidth="1px"
                >
                  Cancel
                    </Button>
                    <Button
                      borderWidth="1px"
                      borderColor="brand-red"
                      borderRadius="10px"
                      backgroundColor="white"
                      fontColor="brandRed"
                      classOverrides="w-100"
                      onClick={this.deleteBrokerProfile}
                >
                  Permanently Delete Account
                    </Button>
                  </div>
                </ModalCard>
          )}

              </div>


            </CenterThis>


          </div>


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
