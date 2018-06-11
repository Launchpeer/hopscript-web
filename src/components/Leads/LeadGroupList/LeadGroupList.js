import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../UserActions';
import { LeadGroupListItem } from './';
import { removeLeadGroup } from './LeadGroupListActions';

class LeadGroupList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.handleRemoveLeadGroup = this.handleRemoveLeadGroup.bind(this);
  }

  handleRemoveLeadGroup(id) {
    this.props.removeLeadGroup(id);
  }

  render() {
    const { leadGroups } = this.props.user.attributes;
    return (
      <div className="w-100">
        {leadGroups &&
          leadGroups.map(group => (
            <LeadGroupListItem leadGroup={group} key={group.id} onClick={() => this.handleRemoveLeadGroup(group.id)} />
          ))}
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

export default connect(mapStateToProps, { fetchUser, removeLeadGroup })(LeadGroupList);
