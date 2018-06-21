import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { HSButton } from '../../common';
import { LeadNavCard } from '../';
import { fetchLeadGroups, deleteLeadGroup } from '../LeadsActions';
import { LeadGroupListItem } from './';

class LeadGroupListView extends Component {
  componentWillMount() {
    this.props.fetchLeadGroups();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(leadGroup) {
    this.props.deleteLeadGroup(leadGroup);
    browserHistory.push('/lead-groups-list');
  }

  render() {
    const { leadGroups, location } = this.props;
    return (
      <LeadNavCard location={location}>
        <div className="w-100">
          {leadGroups && leadGroups.length > 0 ?
            <div className="w-100 mb5">
              {leadGroups.map(group => <LeadGroupListItem removeGroup={() => this.handleDelete(group.id)} leadGroup={group} key={group.id} />)}
            </div> :
            <div className="mt6 tc f4 pa3 silver">
              <div className="mb6">
            You currently do not have any Lead Groups. <br />
            “New Lead Group” to start adding some Lead Groups!
              </div>
            </div>}
          <HSButton onClick={() => browserHistory.push('/lead-groups-add')}>New Lead Group</HSButton>
        </div>
      </LeadNavCard>
    );
  }
}


const mapStateToProps = ({ LeadsReducer }) => {
  const { leadGroups } = LeadsReducer;
  return {
    leadGroups
  };
};

export default connect(mapStateToProps, { fetchLeadGroups, deleteLeadGroup })(LeadGroupListView);
