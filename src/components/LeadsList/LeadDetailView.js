import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullScreenContainer } from '../common';
import { fetchLead } from '../LeadsAdd';
import LeadDetailForm from './LeadDetailForm';

class LeadDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchLead(this.props.params.id);
  }

  render() {
    const { lead } = this.props;
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
