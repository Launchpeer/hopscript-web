import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../config/styles';
import { InputTextEditable } from '../common';
import { logOutUser } from '../Auth/AuthActions';

import { updateBrokerProfile } from './BrokerProfileActions';

class UpdateBrokerProfileFormView extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleFormSubmit(data) {
    this.props.updateBrokerProfile(data);
  }

  handleSignOut() {
    this.props.logOutUser();
  }

  render() {
    const { user, handleSubmit } = this.props;
    return (
      <div>
        <form className="mv4 vh-50">
          <div className="mv4">
            <InputTextEditable
              name="username"
              type="text"
              label="Company Name"
              borderColor={Colors.moonGray}
              placeholder={user && user.get('username')}
              onSubmit={handleSubmit(this.handleFormSubmit)}
          />
          </div>

          <div className="mv4">
            <InputTextEditable
              name="email"
              type="text"
              label="Email Address"
              borderColor={Colors.moonGray}
              placeholder={user && user.get('email')}
              onSubmit={handleSubmit(this.handleFormSubmit)}
          />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ BrokerProfileReducer, UserReducer }) => {
  const { error, profile, loading } = BrokerProfileReducer;
  const { user } = UserReducer;
  return {
    profile,
    loading,
    user,
    error
  };
};

export default reduxForm({
  form: 'updateBrokerProfileForm'
})(connect(mapStateToProps, {
  updateBrokerProfile,
  logOutUser
})(UpdateBrokerProfileFormView));
