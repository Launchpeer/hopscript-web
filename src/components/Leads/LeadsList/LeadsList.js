import React from 'react';
import { connect } from 'react-redux';
import { fetchLeads } from './LeadsListActions';
import { LeadsListItem } from './';

const LeadsList = ({ leads }) => (
  <div className="w-100">
    {leads &&
      leads.map(lead => <LeadsListItem lead={lead} key={lead.id} />)}
  </div>
);


const mapStateToProps = ({ LeadsListReducer }) => {
  const { leads } = LeadsListReducer;
  return {
    leads
  };
};

export default connect(mapStateToProps, { fetchLeads })(LeadsList);
