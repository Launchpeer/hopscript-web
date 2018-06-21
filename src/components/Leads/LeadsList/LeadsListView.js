import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeads } from '../LeadsActions';
import { LeadsListItem } from './';
import { LeadNavCard } from '../';

const LeadsList = ({ leads }) => (
  <div>
    {leads.map(lead => (
      <LeadsListItem lead={lead} key={lead.id} />))
    }
  </div>
);

class LeadsListView extends Component {
  componentWillMount() {
    this.props.fetchLeads();
  }

  render() {
    const { leads, location } = this.props;
    return (
      <LeadNavCard location={location}>
        <div className="w-100">
          {leads && leads.length > 0 ?
            <LeadsList leads={leads} /> :
            <div className="mt6 tc f4 pa3 silver">
              <div className="mb6">
          You currently do not have any Leads. <br />
          “Add New Lead” to start adding some leads!
              </div>
            </div>}
        </div>
      </LeadNavCard>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { leads } = LeadsReducer;
  return {
    leads
  };
};

export default connect(mapStateToProps, { fetchLeads })(LeadsListView);
