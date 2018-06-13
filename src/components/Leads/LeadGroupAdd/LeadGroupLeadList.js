import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Plus } from 'react-feather';
import { Colors } from '../../../config/styles';
import { fetchUser } from '../../UserActions';
import LeadGroupLeadListItem from './LeadGroupLeadListItem';
import { addLeadToGroup } from './LeadGroupAddActions';

class LeadGroupLeadList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      leadsToAdd: this.props.leadsToAdd
    };
  }
  handleClick(lead) {
    addLeadToGroup(lead);
    console.log('lead????', lead);
  }

  render() {
    const { leads } = this.props.user.attributes;
    const { onClick } = this.props;
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
