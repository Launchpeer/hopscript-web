import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../UserActions';
import { AgentsListItem } from './';

class AgentsList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
  }
  render() {
    const { agents } = this.props.user.attributes;
    return (
      <div className="w-100">
        {agents && agents.map(agent =>(<AgentsListItem agent={agent} key={agent.id} />))}
      </div>
    )
  }
}

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps, { fetchUser })(AgentsList);
