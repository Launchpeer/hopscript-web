import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../UserActions';
import LeadGroupLeadListItem from './LeadGroupLeadListItem';
import { addLeadToGroup } from './LeadGroupAddActions';

class LeadGroupLeadList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(lead) {
    this.props.addLeadToGroup(lead);
  }

  render() {
    const { leads } = this.props.user.attributes;
    return (
      <div className="w-100">
        {leads &&
          leads.map(lead => <LeadGroupLeadListItem lead={lead} key={lead.id} onClick={() => this.handleClick(lead)} />)}
      </div>
    );
  }
}

const mapStateToProps = ({ UserReducer, LeadGroupAddReducer }) => {
  const { user } = UserReducer;
  const { leadsToAdd } = LeadGroupAddReducer;
  return {
    user,
    leadsToAdd
  };
};

export default connect(mapStateToProps, { fetchUser, addLeadToGroup })(LeadGroupLeadList);
