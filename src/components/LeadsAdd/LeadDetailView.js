import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BorderRadius } from '../../config/styles';
import { FullScreenContainer, Button } from '../common';
import { fetchLead } from './LeadsAddActions';
import LeadDetailForm from './LeadDetailForm';

class LeadDetailView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchLead(this.props.params.id);
  }

  render() {
    const { lead, leadGroups } = this.props;
    return (
      <FullScreenContainer color="white">
        <div>
          <div className="tc f4">{lead && lead.attributes.name}</div>
          <div>
            <LeadDetailForm lead={lead} />
          </div>
        </div>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ LeadsAddReducer }) => {
  const { lead } = LeadsAddReducer;
  return {
    lead
  };
};

export default connect(mapStateToProps, {
  fetchLead
})(LeadDetailView);
