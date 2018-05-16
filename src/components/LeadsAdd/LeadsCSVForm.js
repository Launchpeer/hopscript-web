/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to batch import Leads
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { parseCSV } from './LeadsAddActions';
import { InputFile, Button } from '../common';

class LeadsAddForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(fields) {
    this.props.parseCSV(fields.csv[0]);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form className="mv4" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <InputFile
            name="csv"
            type="text"
        />
          <Button backgroundColor="red" classOverrides="w-100" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'batchLeads',
})(connect(null, {
  parseCSV
})(LeadsAddForm));
