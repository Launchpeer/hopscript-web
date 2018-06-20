import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { HSButton } from '../../common';
import { fetchLeadGroup, deleteLeadGroup } from '../LeadsActions';
import { LeadNavCard } from '../';

class LeadGroupDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          <div className="pa4 w-100" >
                Here she is
          </div>
          <HSButton onClick={() => console.log('this will take you to edit lead group')}>Edit Lead Group</HSButton>
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
