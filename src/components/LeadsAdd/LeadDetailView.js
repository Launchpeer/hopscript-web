import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BorderRadius } from '../../config/styles';
import { FullScreenContainer, Button } from '../common';
import { fetchLead } from './LeadsAddActions';

class LeadDetailView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchLead(this.props.params.id);
  }

  render() {
    const { lead } = this.props;
    return (
      <FullScreenContainer color="white">
        <div>{lead && lead.attributes.name}</div>
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
