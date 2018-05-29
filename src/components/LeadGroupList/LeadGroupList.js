import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../UserActions';
import { LeadGroupListItem } from './';

class LeadGroupList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
  }
  render() {
    const { leadGroups } = this.props.user.attributes;
    return (
      <div className="w-100">
        {leadGroups &&
          leadGroups.map(group => (
            <LeadGroupListItem leadGroups={group} key={group.id} />
          ))}
        {leadGroups.length === 0 && (
          <div className="tc">You haven't added any lead groups.</div>
        )}
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

export default connect(mapStateToProps, { fetchUser })(LeadGroupList);
