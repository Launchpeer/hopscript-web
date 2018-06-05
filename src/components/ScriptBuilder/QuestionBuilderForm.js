/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to create a question
 * question, description, category, audio, boolean for closing statement
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../config/styles';
import {
  InputTextArea,
  InputDropDown,
  Button,
  LoaderOrThis,
  RenderAlert
} from '../common';

class QuestionBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    console.log('questionable data');
  }

  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const {
      handleSubmit, valid, loading, error
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
            onClick={this.clearError}
          >
            <InputTextArea
              name="body"
              label="Name"
              placeholder="Full Name"
            />
            <InputDropDown
              name="leadType"
              type="dropdown"
              label="Type of Lead"
              placeholder="Type of Lead"
              options={['Lead Type 1', 'Lead Type 2', 'Lead Type 3']}
              borderColor="white"
              borderRadius="none"
            />

            {valid && (
              <Button backgroundColor={Colors.brandPrimary}>Add Lead</Button>
            )}
            {error && <RenderAlert error={error} />}
          </form>
        </LoaderOrThis>
      </div>
    );
  }
}

const mapStateToProps = ({ LeadsAddReducer }) => {
  const { error, loading } = LeadsAddReducer;
  return {
    loading,
    error
  };
};

function validate(values) {
  const errors = {};
  if (!values.name || !values.phone || !values.leadType || !values.leadGroup) {
    errors._error = 'All fields required';
  }

  return errors;
}

export default reduxForm({
  form: 'questionBuilder',
  validate
})(connect(mapStateToProps)(QuestionBuilderForm));
