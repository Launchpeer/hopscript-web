import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Parse from 'parse';
import { Colors } from '../../config/styles';
import { EditInput, MCInput, RoundPhoto } from '../common';

import { updateProfile } from './ProfileActions';

class UpdateProfileFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoDragging: false,
      editText: true
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.resetPhoto = this.resetPhoto.bind(this);
    this.renderDropClass = this.renderDropClass.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(files) {
    if (files && files[0]) {
      const uploadedFile = files[0];
      const parseFile = new Parse.File('image', uploadedFile);
      parseFile.save();
      this.props.updateProfile({ image: parseFile });
      this.setState({ photoDragging: false });
    } else {
      this.setState({ photoDragging: false });
    }
  }

  resetPhoto() {
    this.setState({ editText: false });
  }
  renderDropClass() {
    if (this.state.dragging === true) {
      return 'bg-teal profile-image';
    }
    return 'bg-white profile-image hand bg-teal-hover';
  }
  renderProfileImage() {
    const { user } = this.props;
    if (
      user &&
      user.attributes &&
      user.attributes.logoImage &&
      this.state.editText
    ) {
      return (
        <RoundPhoto
          backgroundImage={`url(${user.attributes.logoImage._url})`}
          editImage={this.resetPhoto}
          editIcon={this.state.editText}
          editText={this.state.editText}
        />
      );
    }
    return (
      <MCInput
        name="logo"
        type="photo"
        pictureType="profilePhoto"
        editType="text"
        editText="Edit Logo"
        onDrop={this.onDrop}
        resetPhoto={this.resetPhoto}
        dropClass={
          this.state.photoDragging === true
            ? 'bg-brand-primary'
            : 'bg-moon-grey'
        }
        onDragOver={() => this.setState({ photoDragging: true })}
        onDragLeave={() => this.setState({ photoDragging: false })}
      />
    );
  }
  handleFormSubmit(data) {
    this.props.updateProfile(data);
  }

  render() {
    const { user, handleSubmit } = this.props;
    return (
      <div className="w-70">
        <form className="mv4">
          {this.renderProfileImage()}
          <EditInput
            name="name"
            type="text"
            label="Name"
            borderColor={Colors.brandDeepGray}
            placeholder={user && user.get('guideName')}
            onSubmit={handleSubmit(this.handleFormSubmit)}
          />
          <EditInput
            name="email"
            type="text"
            label="Email Address"
            borderColor={Colors.brandDeepGray}
            placeholder={user && user.get('email')}
            onSubmit={handleSubmit(this.handleFormSubmit)}
          />
          <EditInput
            name="mainContactName"
            type="text"
            label="Main Contact Name"
            borderColor={Colors.brandDeepGray}
            placeholder={user && user.get('mainContactName')}
            onSubmit={handleSubmit(this.handleFormSubmit)}
          />
          <EditInput
            name="mainContactPhone"
            type="text"
            label="Main Contact Phone"
            borderColor={Colors.brandDeepGray}
            placeholder={user && user.get('mainContactPhone')}
            onSubmit={handleSubmit(this.handleFormSubmit)}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ ProfileReducer, UserReducer }) => {
  const { error, profile, loading } = ProfileReducer;
  const { user } = UserReducer;
  return {
    error,
    profile,
    loading,
    user
  };
};

export default reduxForm({
  form: 'updateProfileForm'
})(connect(mapStateToProps, {
  updateProfile
})(UpdateProfileFormView));
