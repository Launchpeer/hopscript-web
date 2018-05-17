import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Parse from 'parse';
import { Colors } from '../../config/styles';
import { Button, InputDropDown, RenderAlert } from '../common';

import { fetchLeadGroups } from '../LeadGroupList/LeadGroupListActions';
import { reconcileLeadsAndGroups } from './LeadsListActions';

class AddLeadToGroupForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    this.props.reconcileLeadsAndGroups(data);
  }

  render() {
    const { leadGroups, handleSubmit, lead } = this.props;
    return (
      <div>
        <h1>Add To Group</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit(lead))}>
          <InputDropDown
            name="leadGroups"
            type="dropdown"
            placeholder="Lead Groups"
            borderColor="black"
            options={leadGroups}
          />
          <Button backgroundColor={Colors.brandPrimary}>Add To Group</Button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'AddLeadToGroup'
})(connect(null, {
  fetchLeadGroups,
  reconcileLeadsAndGroups
})(AddLeadToGroupForm));
