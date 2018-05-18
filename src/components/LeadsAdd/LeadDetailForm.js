import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Parse from 'parse';
import { Colors } from '../../config/styles';
import { Button, InputDropDown, InputText, RenderAlert } from '../common';
import { fetchLeadGroups } from '../LeadGroupList/LeadGroupListActions';

class LeadDetailForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    console.log('handleformsubmit');
  }

  componentWillMount() {
    this.props.fetchLeadGroups();
  }

  render() {
    const {
      handleSubmit, loading, leadGroups, lead
    } = this.props;
    console.log('leadGroups', leadGroups);
    const leadGroupOptions = leadGroups.map(leadGroup => leadGroup.attributes.groupName);
    return (
      <div>
        <h1>Add Lead To Group</h1>
        {leadGroups && (
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <InputDropDown
              name="leadGroup"
              type="dropdown"
              label="Lead Group"
              placeholder="Lead Group"
              options={leadGroupOptions}
              borderColor="white"
              borderRadius="none"
            />

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
  fetchLeadGroups
})(LeadDetailForm));
