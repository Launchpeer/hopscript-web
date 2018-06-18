import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLeadToGroup, fetchLeads } from '../LeadsActions';
import LeadGroupLeadListItem from './LeadGroupLeadListItem';

class LeadGroupLeadList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(lead) {
    this.props.addLeadToGroup(lead);
  }

  componentWillMount() {
    this.props.fetchLeads();
  }

  render() {
    const { leads } = this.props;
    return (
      <div className="w-100">
        {leads &&
          leads.map(lead => <LeadGroupLeadListItem lead={lead} key={lead.id} adds onClick={() => this.handleClick(lead)} />)}
      </div>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { leadsToAdd, leads } = LeadsReducer;
  return {
    leadsToAdd,
    leads
  };
};

export default connect(mapStateToProps, { fetchLeads, addLeadToGroup })(LeadGroupLeadList);
