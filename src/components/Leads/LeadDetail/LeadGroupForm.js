import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchLeadGroups } from '../LeadGroupList/LeadGroupListActions';
import { reconcileLeadsAndGroups } from '../LeadsList/LeadsListActions';
import { LeadGroupListItem } from '../LeadGroupList';


class LeadGroupForm extends Component {
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
        <div>Lead Groups</div>
        <div>
          {leadGroups &&
          leadGroups.map(group => (
            <LeadGroupListItem leadGroup={group} key={group.id} />
          ))}
        </div>
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
  form: 'LeadGroupForm'
})(connect(mapStateToProps, {
  fetchLeadGroups,
  reconcileLeadsAndGroups
})(LeadGroupForm));


/*
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
*/
