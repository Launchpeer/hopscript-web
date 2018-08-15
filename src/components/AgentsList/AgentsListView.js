import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../UserActions';
import { AgentsListItem } from './';
import { AgentsAddForm } from '../AgentsAdd';
import { Button, CardRight } from '../common';
import { Colors } from '../../config/styles';


const InitialDisplay = () => (
  <div className="mt5 mb5 tc f4 silver">
    Welcome to Hopscript! <br /> <br />
    You currently do not have any agents. <br />
    “Add Agents” to invite your team to Hopscript! <br /> <br />
    Your agents will receive an email invitation <br />
    to set up their account, create scripts and call leads!
  </div>
);

const AgentsList = ({ toggleAddAgent, agents }) => (
  <div className="w-100" style={{ backgroundColor: Colors.white }} >
    <AgentsAddForm cancel={toggleAddAgent} />
    <div>
      {agents && agents.map(agent => (<AgentsListItem agent={agent} key={agent.id} />))}
    </div>
  </div>
);

class AgentsListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addAgentOpen: false
    };
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
      <CardRight loading={loading}>
        <div className="w-100 bb bw2 b--light-gray pa3 f4 flex justify-between" style={{ backgroundColor: Colors.white }} >
          <div className="b pt2 pb2 pl2">Agents</div>
          <Button backgroundColor={Colors.brandGreen} onClick={this.toggleAddAgent} buttonPadding="pa2 pr4 pl4" classOverrides="f5">Add Agents</Button>
        </div>
        <div className="pa3">
          {(agents || addAgentOpen)
            ? <AgentsList toggleAddAgent={this.toggleAddAgent} agents={agents} />
            : <InitialDisplay />
          }
        </div>
      </CardRight>
    );
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

export default connect(mapStateToProps, { fetchUser })(AgentsListView);
