import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeadGroupLeadListItem from './LeadGroupLeadListItem';

class LeadGroupAddForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(lead) {
    console.log('This will remove the lead from the list of leads to add. The lead you just clicked is:', lead.attributes.name);
  }

  render() {
    const { leadsToAdd } = this.props;
    return (
      <div className="w-100">
        {leadsToAdd &&
          leadsToAdd.map(lead => <LeadGroupLeadListItem lead={lead} key={lead.id} onClick={() => this.handleClick(lead)} />)}
      </div>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { leadsToAdd } = LeadsReducer;
  return {
    leadsToAdd
  };
};

export default connect(mapStateToProps, null)(LeadGroupAddForm);
