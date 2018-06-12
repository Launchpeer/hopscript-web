import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Plus } from 'react-feather';
import { Colors } from '../../../config/styles';
import { fetchUser } from '../../UserActions';
import { LeadsListItem } from '../LeadsList';

class LeadGroupLeadList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
  }
  render() {
    const { leads } = this.props.user.attributes;
    return (
      <div className="w-100">
        {leads &&
          leads.map(lead => <LeadsListItem lead={lead} key={lead.id} classOverrides="bg-brand-green" buttonContent={<Plus backgroundColor={Colors.brandGreen} />} />)}
      </div>
    );
  }
}

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps, { fetchUser })(LeadGroupLeadList);
