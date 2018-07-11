import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { HSButton } from '../../common';
import { fetchLeadGroup, deleteLeadGroup, fetchLastLeadCall } from '../LeadsActions';
import { LeadNavCard } from '../';
import { LGDetailListItem } from './';


class LeadGroupDetailView extends Component {
  componentWillMount() {
    this.props.fetchLeadGroup(this.props.params.id);
  }


  render() {
    const {
      leadGroup, location, latestCall
    } = this.props;
    return (
      leadGroup &&
      <LeadNavCard leadDetailBar location={location} name={leadGroup.attributes.groupName} onClick={() => browserHistory.push('/lead-groups-list')}>
        <div className="flex flex-column w-100">
          <div className="w-100 pb3" >
            {leadGroup.attributes.leads.map(lead => <LGDetailListItem lead={lead} key={lead.id} call={latestCall} />)}
          </div>
          <HSButton onClick={() => console.log('this will take you to edit lead group')}>Edit Lead Group</HSButton>
        </div>
      </LeadNavCard>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { leadGroup, latestCall } = LeadsReducer;
  return {
    leadGroup,
    latestCall
  };
};

export default connect(mapStateToProps, {
  fetchLeadGroup,
  deleteLeadGroup,
  fetchLastLeadCall
})(LeadGroupDetailView);
