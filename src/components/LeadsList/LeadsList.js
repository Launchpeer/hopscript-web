import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../UserActions';
import { LeadsListItem } from './';

class LeadsList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
  }
  render() {
    const { leads } = this.props.user.attributes;
    return (
      <div className="w-100">
        {leads &&
          leads.map(lead => <LeadsListItem lead={lead} key={lead.id} />)}
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

export default connect(mapStateToProps, { fetchUser })(LeadsList);
