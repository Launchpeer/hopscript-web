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
import { Button } from '../common';
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
    return (
      <div className="w-100">
        <div>
          <div className="w-100 flex items-center justify-between pa4" style={{borderBottom: `2px solid ${Colors.moonGray}`}}>
            <div className="f3 brand-near-black">Agents</div>
            <Button backgroundColor={Colors.brandGreen} onClick={this.toggleAddAgent} buttonPadding="pa2 pr4 pl4" classOverrides="f5">Add Agent</Button>
          </div>
          <div className="pa3">
            {addAgentOpen && <AgentsAddForm cancel={this.toggleAddAgent}/>}
            <div>
              {agents && agents.map(agent =>(<AgentsListItem agent={agent} key={agent.id} />))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  console.log(user);
  return {
    user
  };
};

export default connect(mapStateToProps, { fetchUser })(AgentsList);
