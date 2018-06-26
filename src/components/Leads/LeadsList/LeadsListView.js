import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchLeads, deleteLead } from '../LeadsActions';
import { LeadsListItem } from './';
import { LeadNavCard } from '../';

class LeadsListView extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.props.fetchLeads();
  }

  handleDelete(lead) {
    this.props.deleteLead(lead);
    browserHistory.push('/leads-list');
  }

  render() {
    const { leads, location } = this.props;
    return (
      <LeadNavCard location={location}>
        <div className="w-100">
          {leads && leads.length > 0 ?
            <div className="w-100 mb5">
              {leads.map(lead => <LeadsListItem lead={lead} key={lead.id} removeLead={() => this.handleDelete(lead.id)} />)}
            </div> :
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

export default connect(mapStateToProps, { fetchLeads, deleteLead })(LeadsListView);
