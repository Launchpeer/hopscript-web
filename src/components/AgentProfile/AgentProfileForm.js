import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../config/styles';
import { InputTextEditable } from '../common';
import { logOutUser } from '../Auth/AuthActions';

import { updateAgentProfile, fetchBrokerage } from './AgentProfileActions';

class AgentProfileForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    if (this.props.user && this.props.user.attributes.brokerage) {
      this.props.fetchBrokerage(this.props.user.attributes.brokerage.id);
    }
  }

  handleFormSubmit(data) {
    this.props.updateAgentProfile(data);
  }

  handleSignOut() {
    this.props.logOutUser();
  }

  render() {
    const { user, handleSubmit, brokerage } = this.props;
    return (
      <form className="mv4">
        <InputTextEditable
          name="brokerage"
          type="text"
          label="Brokerage"
          borderColor={Colors.moonGray}
          placeholder={brokerage && brokerage.attributes.username}
          noEdit />
        <InputTextEditable
          name="username"
          type="text"
          label="Name"
          borderColor={Colors.moonGray}
          placeholder={user && user.get('username')}
          onSubmit={handleSubmit(this.handleFormSubmit)} />
        <InputTextEditable
          name="email"
          type="text"
          label="email"
          borderColor={Colors.moonGray}
          placeholder={user && user.get('email')}
          noEdit />
      </form>
    );
  }
}

const mapStateToProps = ({ AgentProfileReducer, UserReducer }) => {
  const {
    error, profile, loading, brokerage
  } = AgentProfileReducer;
  const { user } = UserReducer;
  return {
    profile,
    brokerage,
    loading,
    user,
    error
  };
};

export default reduxForm({
  form: 'updateAgentProfileForm'
})(connect(mapStateToProps, {
  updateAgentProfile,
  fetchBrokerage,
  logOutUser
})(AgentProfileForm));
