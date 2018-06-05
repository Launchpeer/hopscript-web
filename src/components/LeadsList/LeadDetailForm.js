import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../config/styles';
import { Button, InputDropDown } from '../common';
import { fetchLeadGroups } from '../LeadGroupList/LeadGroupListActions';
import { reconcileLeadsAndGroups } from '../LeadsList/LeadsListActions';

class LeadDetailForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    const { lead } = this.props;
    this.props.reconcileLeadsAndGroups(data, lead);
  }

  componentWillMount() {
    this.props.fetchLeadGroups();
  }

  render() {
    const { handleSubmit, leadGroups } = this.props;
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
        <h1>Add Lead To Group</h1>
        {leadGroups && (
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <InputDropDown
              name="leadGroup"
              type="dropdown"
              label="Lead Group"
              placeholder="Select a Group"
              options={leadGroupOptions}
              borderColor="black"
              borderRadius="none" />
            <Button backgroundColor={Colors.brandPrimary}>Add To Group</Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ LeadGroupListReducer }) => {
  const { leadGroups } = LeadGroupListReducer;
  return {
    leadGroups
  };
};

export default reduxForm({
  form: 'LeadDetailForm'
})(connect(mapStateToProps, {
  fetchLeadGroups,
  reconcileLeadsAndGroups
})(LeadDetailForm));
