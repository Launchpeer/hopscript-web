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
  RenderAlert
} from '../../common';
import normalizePhone from '../../helpers/normalize';
import { createLead, clearError, fetchLeadGroups } from '../LeadsActions';

class LeadsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { showError: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.leadsListSuccess) {
      browserHistory.push('/leads-list');
    }
  }

  componentWillMount() {
    this.props.fetchLeadGroups();
  }

  handleFormSubmit(data) {
    this.props.createLead(data);
    browserHistory.push('/leads-list');
  }

  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const {
      handleSubmit, error, leadGroups
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
        <div className="f3 b">Add a Single Lead</div>
        <div className="mb3">You can add a Lead manually</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
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

          {leadGroups && leadGroups.length > 0 ?
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
            </div> : null}

          <div className="fr mt6 mb4">
            <Button
              borderRadius="4px"
              backgroundColor={Colors.brandGreen}
              classOverrides="pl5 pr5 pt3 pb3 f5"
              onClick={(e) => {
                if (error) { e.preventDefault(); this.setState({ showError: true }); }
              }}>Add Lead
            </Button>
          </div>

          {this.state.showError && error &&
            <div className="pa2">
              <RenderAlert error={{ message: error }} />
            </div>
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { error, leadGroups, leadsListSuccess } = LeadsReducer;
  return {
    error,
    leadGroups,
    leadsListSuccess
  };
};

const Form = reduxForm({
  form: 'leadsAdd',
  validate
})(LeadsAddForm);

function validate(values) {
  const errors = {};
  if (!values.name || !values.phone || !values.leadType) {
    errors._error = 'All fields required';
  }

  return errors;
}

export default connect(mapStateToProps, {
  createLead,
  clearError,
  fetchLeadGroups
})(Form);
