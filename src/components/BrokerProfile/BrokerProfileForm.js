import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Parse from 'parse';
import { Colors } from '../../config/styles';
import { EditInput } from '../common';
import { logOutUser } from '../Auth/AuthActions';

import { updateBrokerProfile } from './BrokerProfileActions';

class UpdateBrokerProfileFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: true
    };
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
      <div className="w-70">
        <form className="mv4">
          <EditInput
            name="username"
            type="text"
            borderColor={Colors.brandDeepGray}
            placeholder={user && user.get('username')}
            onSubmit={handleSubmit(this.handleFormSubmit)}
          />
          <EditInput
            name="email"
            type="text"
            borderColor={Colors.brandDeepGray}
            placeholder={user && user.get('email')}
            onSubmit={handleSubmit(this.handleFormSubmit)}
          />
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
