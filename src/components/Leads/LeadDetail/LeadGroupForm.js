import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { InputDropDown } from '../../common';
import { Colors } from '../../../config/styles';
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
    const { handleSubmit, leadGroups, dirty } = this.props;
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
        <div className="b mb4">Lead Groups</div>
        <div className="ba pa2" style={{ borderColor: Colors.lightGray, borderRadius: '4px' }}>
          {leadGroups && (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="flex flex-row w-100 items-center">
                <div className="w-30 mt2 mb2 pt3 pb3">Add To Group</div>
                <div className="w-100 pa2">
                  <InputDropDown
                    name="leadGroup"
                    type="dropdown"
                    placeholder="Select a Group"
                    options={leadGroupOptions}
                    borderColor="lightGray" />
                </div>
                {dirty &&
                  <div
                    className="pointer fr"
                    style={{ color: Colors.stripe }}
                    role="button"
                    onClick={handleSubmit(this.handleFormSubmit)} >
                    Add
                  </div>}
              </div>
            </form>
          )}
          <div>
            {leadGroups &&
          leadGroups.map(group => (
            <LeadGroupListItem leadGroup={group} key={group.id} onClick={() => console.log('this will remove the leadgroup from the lead')} />
          ))}
          </div>
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
