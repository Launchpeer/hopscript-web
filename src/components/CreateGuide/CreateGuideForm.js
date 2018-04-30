import { connect } from 'react-redux';
import Parse from 'parse';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Colors, BorderRadius } from '../../config/styles';

import { createGuide } from './CreateGuideActions';
import { fetchLocales } from '../Locales/LocaleActions';
import {
  Button,
  RenderAlert,
  MCInput,
  SubHeader,
  HalfGrid,
  FullScreenContainer
} from '../common';

class CreateGuideForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      photoDragging: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.resetPhoto = this.resetPhoto.bind(this);
    this.props.fetchLocales();
  }

  handleFormSubmit(fields) {
    this.props.createGuide(fields);
  }

  onDrop(files) {
    if (files && files[0]) {
      const uploadedFile = files[0];
      const parseFile = new Parse.File('image', uploadedFile);
      parseFile.save();
      this.setState({ image: parseFile, photoDragging: false });
    } else {
      this.setState({ photoDragging: false });
    }
  }

  resetPhoto() {
    this.setState({ image: undefined });
  }

  render() {
    const { handleSubmit, user, locales } = this.props;
    return (
      <FullScreenContainer>
        <SubHeader
          route="dashboard"
          hasChevron
          label={user && user.attributes.username}
        />
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="flex flex-wrap">
            <HalfGrid classOverrides="pa1 pa5-ns">
              <div className="f1 brand-primary mb4"> NEW GUIDE </div>
              <MCInput
                label="Profile Photo*"
                name="profilePhoto"
                type="photo"
                pictureType="profile photo"
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
              <MCInput
                borderRadius="none"
                name="guideName"
                type="text"
                label="Name*"
                placeholder="Name"
              />
              <MCInput
                borderRadius="none"
                name="location"
                type="dropdown"
                label="Location*"
                placeholder="Location"
                options={locales}
              />
              <MCInput
                borderRadius="none"
                name="profession"
                type="text"
                label="Profession*"
                placeholder="Profession"
              />
              <MCInput
                borderRadius="none"
                name="facebook"
                type="text"
                label="Facebook"
                placeholder="Facebook"
              />
              <MCInput
                borderRadius="none"
                name="twitter"
                type="text"
                label="Twitter"
                placeholder="Twitter"
              />
              <MCInput
                borderRadius="none"
                name="instagram"
                type="text"
                label="Instagram"
                placeholder="Instagram"
              />
            </HalfGrid>
            <HalfGrid classOverrides="pa1 pa5-ns">
              <MCInput
                borderRadius="none"
                name="travelLikes"
                type="textarea"
                label="Travel Likes*"
                placeholder="When I travel, I like..."
              />
              <MCInput
                borderRadius="none"
                name="travelDislikes"
                type="textarea"
                label="Travel Dislikes*"
                placeholder="When I travel, I do not like..."
              />
              <MCInput
                borderRadius="none"
                name="travelPhilosophy"
                type="textarea"
                label="Travel Philosophy*"
                placeholder="Travel philosophy..."
              />
              {this.props.invalid &&
                this.state.showError && (
                  <div className="mb4">
                    <RenderAlert
                      error={{ message: '*Missing Required Fields' }}
                    />
                  </div>
                )}
              <div className="pa2">
                {this.props.valid ? (
                  <Button
                    classOverrides="w-100"
                    backgroundColor={Colors.brandSecondary}
                  >
                    CREATE GUIDE
                  </Button>
                ) : (
                  <div
                    style={{
                      color: Colors.brandOffWhite,
                      backgroundColor: Colors.brandSecondary
                    }}
                    role="button"
                    className="pa3 tc bn w-100 f3 pointer"
                    onClick={() => this.setState({ showError: true })}
                  >
                    CREATE GUIDE
                  </div>
                )}
              </div>
            </HalfGrid>
          </div>
        </form>
      </FullScreenContainer>
    );
  }
}

function validate(values) {
  const errors = {};
  const numReg = /\d/;
  if (!values.profilePhoto) {
    errors._error = '*Required';
  }
  if (!values.guideName) {
    errors._error = '*Required';
  }
  if (!values.location) {
    errors._error = '*Required';
  }
  if (!values.profession) {
    errors._error = '*Required';
  }
  if (!values.travelLikes) {
    errors._error = '*Required';
  }
  if (!values.travelDislikes) {
    errors._error = '*Required';
  }
  if (!values.travelPhilosophy) {
    errors._error = '*Required';
  }
  return errors;
}

const mapStateToProps = ({
  CreateGuideReducer,
  LocaleReducer,
  UserReducer
}) => {
  const { error } = CreateGuideReducer;
  const { locales } = LocaleReducer;
  const { user } = UserReducer;
  return {
    error,
    locales,
    user
  };
};

export default reduxForm({
  form: 'createGuide',
  validate
})(connect(mapStateToProps, {
  createGuide,
  fetchLocales
})(CreateGuideForm));
