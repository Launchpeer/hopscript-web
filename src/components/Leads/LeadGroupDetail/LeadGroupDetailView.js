import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { HSButton } from '../../common';
import { fetchLeadGroup, deleteLeadGroup, } from '../LeadsActions';
import { LeadNavCard } from '../';
import { LGDetailListItem } from './';


class LeadGroupDetailView extends Component {
  componentWillMount() {
    this.props.fetchLeadGroup(this.props.params.id);
  }
  render() {
    const {
      leadGroup, location
    } = this.props;
    return (
      leadGroup &&
      <LeadNavCard leadDetailBar location={location} name={leadGroup.attributes.groupName} onClick={() => browserHistory.push('/lead-groups-list')}>
        <div className="flex flex-column w-100">
          <div className="w-100 pb3" >
            {leadGroup.attributes.leads.map(lead => <LGDetailListItem lead={lead} key={lead.id} />)}
          </div>
        </div>
      </LeadNavCard>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { leadGroup } = LeadsReducer;
  return {
    leadGroup
  };
};

export default connect(mapStateToProps, {
  fetchLeadGroup,
  deleteLeadGroup
})(LeadGroupDetailView);
