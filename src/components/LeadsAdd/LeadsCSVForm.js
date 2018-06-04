/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to batch import Leads
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { parseCSV } from './LeadsAddActions';
import { InputFile, Button, CSVIcon } from '../common';
import { Colors } from '../../config/styles';


class LeadsCSVForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(fields) {
    this.props.parseCSV(fields.csv[0]);
  }

  render() {
    const { handleSubmit } = this.props;
    const DropZoneIcon = <CSVIcon fill={Colors.brandGreen} width="15%" />;
    return (
      <div>
        <div className="f3 b">Import a List of Leads</div>
        <div>You can add a list of leads</div>
        <form className="mv4" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <InputFile
            name="csv"
            type="text"
            dropzoneContents={DropZoneIcon}
        />
          <Button
            backgroundColor={Colors.brandGreen}
            borderRadius="4px"
            classOverrides="w-100 f4">
              Submit List
          </Button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'batchLeads',
})(connect(null, {
  parseCSV
})(LeadsCSVForm));
