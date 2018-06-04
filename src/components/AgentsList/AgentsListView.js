/**
 * The purpose of this file is to fetch the Brokerage,
 * subscribe to updates to the Brokerage,
 * and provide the Agent objects to a mapping function for generating list items
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../UserActions';
import { AgentsListItem} from './';
import { AgentsAddForm } from '../AgentsAdd';
import { Button, LoaderOrThis } from '../common';
import { Colors } from '../../config/styles';

class AgentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addAgentOpen: false
    }
    this.props.fetchUser();
    this.toggleAddAgent = this.toggleAddAgent.bind(this);
  }

  toggleAddAgent() {
    this.setState({ addAgentOpen: !this.state.addAgentOpen });
  }

  render() {
    const { agents } = this.props.user.attributes;
    const { addAgentOpen } = this.state;
    const { loading } = this.props;
    return (
      <div className="w-100">
        <LoaderOrThis loading={loading}>
          <div className="w-100 flex items-center justify-between pa4" style={{borderBottom: `2px solid ${Colors.moonGray}`}}>
            <div className="f3 brand-near-black b">Agents</div>
            <Button backgroundColor={Colors.brandGreen} onClick={this.toggleAddAgent} buttonPadding="pa2 pr4 pl4" classOverrides="f5">Add Agent</Button>
          </div>
          <div className="pa3">
            {addAgentOpen && <AgentsAddForm cancel={this.toggleAddAgent}/>}
            <div>
              {agents && agents.map(agent =>(<AgentsListItem agent={agent} key={agent.id} />))}
            </div>
          </div>
        </LoaderOrThis>
      </div>
    )
  }
}

const mapStateToProps = ({ UserReducer, AgentsListReducer }) => {
  const { user } = UserReducer;
  const { loading } = AgentsListReducer;
  return {
    user,
    loading
  };
};

export default connect(mapStateToProps, { fetchUser })(AgentsList);
