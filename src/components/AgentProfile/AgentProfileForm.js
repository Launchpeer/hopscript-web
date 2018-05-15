/**
 * The purpose of this file is provide a ReduxForm component that allows an Agent to update their profile
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Parse from 'parse';

import { Colors } from '../../config/styles';
import { EditInput } from '../common';
import { updateAgentProfile } from './AgentProfileActions';

class UpdateAgentProfileFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: true
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    this.props.updateAgentProfile(data);
  }

  render() {
    const { user, handleSubmit } = this.props;
    return (
      <div className="w-70">
        <form className="mv4">
          <EditInput
            name="name"
            type="text"
            borderColor={Colors.brandDeepGray}
            placeholder={user && user.get('name')}
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

const mapStateToProps = ({ AgentProfileReducer, UserReducer }) => {
  const { error, profile, loading } = AgentProfileReducer;
  const { user } = UserReducer;
  return {
    profile,
    loading,
    user,
    error
  };
};

export default reduxForm({
  form: 'updateAgentProfileForm'
})(connect(mapStateToProps, {
  updateAgentProfile
})(UpdateAgentProfileFormView));
