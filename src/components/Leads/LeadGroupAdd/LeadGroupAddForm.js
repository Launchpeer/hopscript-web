import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeadGroupLeadListItem from './LeadGroupLeadListItem';
import { updateLeadsToAdd } from '../LeadsActions';

class LeadGroupAddForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(lead) {
    const newLeadsList = this.props.leadsToAdd.filter(leads => leads !== lead);
    this.props.updateLeadsToAdd(newLeadsList);
  }

  render() {
    const { leadsToAdd } = this.props;
    return (
      <div className="w-100">
        {leadsToAdd &&
          leadsToAdd.map(lead => <LeadGroupLeadListItem lead={lead} key={lead.id} removeLead={() => this.handleClick(lead)} />)}
      </div>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { leadsToAdd } = LeadsReducer;
  return {
    leadsToAdd
  };
};

export default connect(mapStateToProps, { updateLeadsToAdd })(LeadGroupAddForm);
