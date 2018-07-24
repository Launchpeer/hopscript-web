import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardRight, HSButton, HSCardHeader } from '../../common';
import { createNewScript, copyScript } from '../ScriptBuilder/ScriptBuilderActions';
import { fetchScripts, fetchBrokerScripts, removeScript } from './ScriptsListActions';
import { ScriptsListItem } from './';

class ScriptsListView extends Component {
  constructor(props) {
    super(props);
    this.handleNewScript = this.handleNewScript.bind(this);
    this.handleScriptCopy = this.handleScriptCopy.bind(this);
    this.removeScript = this.removeScript.bind(this);
  }

  handleNewScript() {
    this.props.createNewScript();
  }

  handleScriptCopy(id) {
    this.props.copyScript(id);
  }

  removeScript(id) {
    this.props.removeScript(id);
  }

  componentWillMount() {
    this.props.fetchScripts();
    this.props.fetchBrokerScripts(this.props.user);
  }

  render() {
    const { scripts, brokerageScripts, user } = this.props;
    return (
      <CardRight loading={this.props.loading}>
        <HSCardHeader>My Scripts</HSCardHeader>
        <div className="pa3">
          <div className="mv4">
            {user.attributes.role === 'broker' && brokerageScripts &&
              brokerageScripts.map(script => (
                <ScriptsListItem script={script} key={script.id} allowDelete removeScript={this.removeScript} />))
            }
            {user.attributes.role === 'agent' && brokerageScripts &&
              brokerageScripts.map(script => (
                <ScriptsListItem script={script} key={script.id} copyScript={this.handleScriptCopy} removeScript={this.removeScript} />))
            }
            { user.attributes.role === 'agent' && scripts &&
              scripts.map(script => (
                <ScriptsListItem script={script} key={script.id} allowDelete removeScript={this.removeScript} />))
            }
          </div>
          <HSButton onClick={this.handleNewScript}>Add New Script</HSButton>
        </div>
      </CardRight>
    );
  }
}

const mapStateToProps = ({ UserReducer, ScriptsListReducer }) => {
  const { user } = UserReducer;
  const { scripts, loading, brokerageScripts } = ScriptsListReducer;
  return {
    user,
    loading,
    scripts,
    brokerageScripts
  };
};

export default connect(mapStateToProps, {
  createNewScript, fetchScripts, fetchBrokerScripts, removeScript, copyScript
})(ScriptsListView);
