import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../config/styles';
import { InputTextEditable, InputPhoto } from '../common';
import { logOutUser } from '../Auth/AuthActions';
import Parse from 'parse';

import { uploadPhoto, updateAgentProfile, fetchBrokerage } from './AgentProfileActions';

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

  handlePhotoUpload = files => {
    uploadPhoto(files[0])
      .then(parseFile => {
        this.props.updateAgentProfile({
          photo: parseFile._url
        });
      });
  }

  handleSignOut() {
    this.props.logOutUser();
  }

  render() {
    const { user, handleSubmit, brokerage } = this.props;
    return (
      <form className="mv4 vh-50">
        <InputPhoto
          name="photo"
          displayText="Profile Photo"
          onSubmit={this.handlePhotoUpload}
        />
        <InputTextEditable
          name="brokerage"
          type="text"
          label="Brokerage"
          borderColor={Colors.moonGray}
          classOverrides="mb3 pa2"
          placeholder={brokerage && brokerage.attributes.username}
          noEdit />
        <InputTextEditable
          name="name"
          type="text"
          label="Name"
          classOverrides="mb3 pa2"
          borderColor={Colors.moonGray}
          placeholder={user && user.get('name')}
          onSubmit={handleSubmit(this.handleFormSubmit)} />
        <InputTextEditable
          name="email"
          type="text"
          label="Email"
          classOverrides="mb3 pa2"
          borderColor={Colors.moonGray}
          placeholder={user && user.get('email')}
          noEdit />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { AgentProfileReducer, UserReducer } = state;
  const {
    error, profile, loading, brokerage
  } = AgentProfileReducer;
  const { user } = UserReducer;
  return {
    profile,
    brokerage,
    loading,
    user,
    error,
    initialValues: {
      photo: user.get('photo')
    }
  };
};

const mapDispatchToProps = {
  updateAgentProfile,
  fetchBrokerage,
  logOutUser
};

let ThisForm = reduxForm({
  form: 'updateAgentProfileForm',
})(AgentProfileForm)

ThisForm = connect(mapStateToProps, mapDispatchToProps)(ThisForm)

export default ThisForm;
