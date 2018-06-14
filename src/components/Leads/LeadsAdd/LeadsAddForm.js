/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to manually add a Lead.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { Colors } from '../../../config/styles';
import {
  InputText,
  InputDropDown,
  Button,
  LoaderOrThis,
  RenderAlert
} from '../../common';
import normalizePhone from '../../helpers/normalize';
import { createLead, clearError, fetchLeadGroups } from '../LeadsActions';

class LeadsAddForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
    this.props.fetchLeadGroups();
  }

  handleFormSubmit(data) {
    this.props.createLead(data);
    browserHistory.push('/list-leads');
  }

  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const {
      handleSubmit, loading, error, leadGroups
    } = this.props;
    const leadGroupOptions = leadGroups.map((group) => {
      group = {
        value: group.id,
        id: group.id,
        display: group.attributes.groupName
      };
      return group;
    });
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <div className="f3 b">Add a Single Lead</div>
          <div className="mb3">You can add a Lead manually</div>
          <form onSubmit={handleSubmit(this.handleFormSubmit)} onClick={this.clearError}>
            <div className="flex flex-row w-100">
              <div className="w-30 mt2 mb2 pt3 pb3">Client Name</div>
              <div className="w-70">
                <InputText
                  name="name"
                  type="text"
                  placeholder="Enter Client Name"
                  borderColor="lightGray"
                  height="50px"
                  classOverrides="mt2 mb2" />
              </div>
            </div>

            <div className="flex flex-row w-100">
              <div className="w-30 mt2 mb2 pt3 pb3 ">Phone Number</div>
              <div className="w-70">
                <InputText
                  name="phone"
                  type="text"
                  placeholder="(000) 000 0000"
                  borderColor="lightGray"
                  normalize={normalizePhone}
                  height="50px"
                  classOverrides="mt2 mb2"
            />
              </div>
            </div>

            <div className="flex flex-row w-100">
              <div className="w-30 mt2 mb2 pt3 pb3">Email</div>
              <div className="w-70">
                <InputText
                  name="email"
                  type="text"
                  placeholder="example@gmail.com"
                  borderColor="lightGray"
                  height="50px"
                  classOverrides="mt2 mb2"
            />
              </div>
            </div>

            <div className="flex flex-row w-100">
              <div className="w-30 mt2 mb2 pt3 pb3">Lead Type</div>
              <div className="w-70">
                <InputDropDown
                  name="leadType"
                  type="dropdown"
                  placeholder="Lead Type"
                  options={['New Lead', 'Qualify', 'Nurture', 'Appointment', 'Active', 'Pending', 'Closed', 'SOI', 'Archive', 'Watch', 'Trash']}
                  borderColor="lightGray"
              />
              </div>
            </div>

            {leadGroups &&
            <div className="flex flex-row w-100">
              <div className="w-30 mt2 mb2 pt3 pb3">Lead Group</div>
              <div className="w-70">
                <InputDropDown
                  name="leadGroup"
                  type="dropdown"
                  placeholder="Lead Group"
                  options={leadGroupOptions}
                  borderColor="lightGray"
            />
              </div>
            </div>}

            <div className="fr mt6 mb4">
              <Button borderRadius="4px" backgroundColor={Colors.brandGreen} classOverrides="pl5 pr5 pt3 pb3 f5">Add Lead</Button>
            </div>
            {error && <RenderAlert error={error} />}
          </form>
        </LoaderOrThis>
      </div>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { error, loading, leadGroups } = LeadsReducer;
  return {
    loading,
    error,
    leadGroups
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
  form: 'createLead',
  validate
})(connect(mapStateToProps, {
  createLead,
  clearError,
  fetchLeadGroups
})(LeadsAddForm));
