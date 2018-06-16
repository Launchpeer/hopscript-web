import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardRight, HSButton, HSCardHeader } from '../common';
import { Colors } from '../../config/styles';
import { createNewScript } from './ScriptBuilder/ScriptBuilderActions';

const ScriptsList = ({ createNewScript }) => (
  <div className="mt6 tc f4 pa3 silver">
    <div className="mb6">
    You currently do not have any scripts. <br />
    “Add New Script” to start building your first script!
    </div>
    <HSButton onClick={createNewScript}>Add New Script</HSButton>
  </div>
);


class ScriptsListView extends Component {
  constructor(props) {
    super(props);
    this.handleNewScript = this.handleNewScript.bind(this);
  }

  handleNewScript() {
    this.props.createNewScript();
  }

  render() {
    return (
      <CardRight loading={this.props.loading}>
        <HSCardHeader>My Scripts</HSCardHeader>
        <ScriptsList createNewScript={createNewScript} />
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

export default connect(mapStateToProps, { createNewScript })(ScriptsListView);
