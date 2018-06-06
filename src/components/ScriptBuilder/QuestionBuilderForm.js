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
  InputCheckbox,
  InputAudio,
  LoaderOrThis,
  RenderAlert,
  Button,
  PlusIcon
} from '../common';

class QuestionBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    console.log('questionable data', data);
  }

  render() {
    const {
      handleSubmit, valid, loading, error, onSubmit
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
          >
            <div className="single-line-textarea">
              <InputTextArea name="name" placeholder="Write Question Here"/>
            </div>
            <div className="flex mt4">
              <div className="w-10">Description</div>
              <div className="w-90">
                <div className="block-textarea">
                  <InputTextArea name="description" placeholder="Optional Description" />
                </div>
              </div>
            </div>
            <div className="flex items-center mt4">
              <div className="w-10">Category</div>
              <div className="w-60">
                <InputDropDown
                  name="category"
                  type="dropdown"
                  placeholder="Choose category"
                  options={['Lead Type 1', 'Lead Type 2', 'Lead Type 3']}
                  borderColor={Colors.moonGray}
                />
              </div>
            <div className="flex items-center ml2">
                <InputCheckbox name="closing" />
                <div className="ml1">Closing Statement</div>
              </div>
            </div>
            <div className="flex">
              <div className="w-10">Audio</div>
              <div className="w-90">
                <InputAudio name="audio" />
              </div>
            </div>
            <div className="flex justify-end mt6">
              <Button
                onClick={(e) => { e.preventDefault() }}
                borderColor={Colors.brandGreen}
                borderWidth="1px"
                fontColor={Colors.brandGreen}
                classOverrides="flex items-center mr2"
              >
                <PlusIcon color={Colors.brandGreen} width="1.5rem" height="1.5rem"/>
                Add question
              </Button>
              <Button backgroundColor={Colors.brandGreen}>Save</Button>
            </div>
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
  if (!values.name) {
    errors._error = 'Name required';
  }

  return errors;
}

export default reduxForm({
  form: 'questionBuilder',
  validate
})(connect(mapStateToProps)(QuestionBuilderForm));
