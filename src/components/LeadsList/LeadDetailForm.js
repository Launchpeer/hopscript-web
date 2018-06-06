import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../config/styles';
import { InputTextEditable, InputDropDown } from '../common';
import { fetchLeadGroups } from '../LeadGroupList/LeadGroupListActions';
import { reconcileLeadsAndGroups } from '../LeadsList/LeadsListActions';
import { updateLead } from '../LeadsAdd/LeadsAddActions';

class LeadDetailForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    const { lead } = this.props;
    this.props.updateLead(lead.id, data);
  }

  componentWillMount() {
    this.props.fetchLeadGroups();
  }

  render() {
    const { handleSubmit, lead } = this.props;
    return (
      <div>
        <form className="mv4" >

          <div className="flex flex-row w-100">
            <div className="w-30 mt2 mb2 pt3 pb3 b">Lead Name</div>
            <InputTextEditable
              name="name"
              type="text"
              borderColor={Colors.moonGray}
              placeholder={lead && lead.get('name')}
              onSubmit={handleSubmit(this.handleFormSubmit)} />
          </div>

          <div className="flex flex-row w-100">
            <div className="w-30 mt2 mb2 pt3 pb3 b">Phone</div>
            <InputTextEditable
              name="phone"
              type="text"
              borderColor={Colors.moonGray}
              placeholder={lead && lead.get('phone')}
              onSubmit={handleSubmit(this.handleFormSubmit)} />
          </div>

          <div className="flex flex-row w-100">
            <div className="w-30 mt2 mb2 pt3 pb3 b">Email</div>
            <InputTextEditable
              name="email"
              type="text"
              borderColor={Colors.moonGray}
              placeholder={lead && lead.get('email')}
              onSubmit={handleSubmit(this.handleFormSubmit)} />
          </div>

          <div className="flex flex-row w-100">
            <div className="w-30 mt2 mb2 pt3 pb3 b">Lead Type</div>
            <div className="w-70">
              <InputDropDown
                name="leadType"
                type="dropdown"
                placeholder={lead && lead.get('leadType')}
                options={['New Lead', 'Qualify', 'Nurture', 'Appointment', 'Active', 'Pending', 'Closed', 'SOI', 'Archive', 'Watch', 'Trash']}
                borderColor="lightGray" />
            </div>
          </div>

          <div
            className="pointer"
            style={{ color: Colors.stripe }}
            role="button"
            onClick={handleSubmit(this.handleFormSubmit)} >
            Save
          </div>

        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'LeadDetailForm'
})(connect(null, {
  fetchLeadGroups,
  updateLead,
  reconcileLeadsAndGroups
})(LeadDetailForm));
