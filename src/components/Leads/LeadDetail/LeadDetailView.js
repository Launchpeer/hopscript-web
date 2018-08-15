import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { CenterThis, HalfGrid, HSButton } from '../../common';
import { fetchLead, fetchLeadGroups, deleteLead } from '../LeadsActions';
import { LeadDetailForm, LeadGroupForm } from './';
import { LeadNavCard } from '../';
import { Colors } from '../../../config/styles';

class LeadDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.props.fetchLead(this.props.params.id);
    this.props.fetchLeadGroups();
  }

  handleDelete(lead) {
    this.props.deleteLead(lead);
    browserHistory.push('/leads-list');
  }

  render() {
    const {
      lead, myLeadGroups, leadGroups, location
    } = this.props;

    return (
      lead &&
      <LeadNavCard leadDetailBar location={location} name={lead.attributes.name} onClick={() => browserHistory.push('/leads-list')}>
        <div className="flex flex-column w-100">
          <div className="flex flex-row">
            <HalfGrid>
              <CenterThis>
                <div className="pa4 w-100" >
                  { lead && <LeadDetailForm lead={lead} />}
                </div>
              </CenterThis>
            </HalfGrid>


            <HalfGrid>
              <CenterThis>
                <div className="pa4 w-100" >
                  {lead && leadGroups && leadGroups.length > 0 ?
                    <LeadGroupForm lead={lead} myLeadGroups={myLeadGroups} leadGroups={leadGroups} />
                    :
                    <div role="button" className="underline pointer tc mt6" onClick={() => browserHistory.push('/lead-groups-add')}>
                      Create a lead group
                    </div>}
                </div>
              </CenterThis>
            </HalfGrid>

          </div>
          <HSButton backgroundColor={Colors.brandRed} onClick={() => this.handleDelete(lead.id)}>Delete Lead</HSButton>
        </div>
      </LeadNavCard>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { lead, myLeadGroups, leadGroups } = LeadsReducer;
  return {
    lead,
    myLeadGroups,
    leadGroups
  };
};

export default connect(mapStateToProps, {
  fetchLead,
  fetchLeadGroups,
  deleteLead
})(LeadDetailView);
