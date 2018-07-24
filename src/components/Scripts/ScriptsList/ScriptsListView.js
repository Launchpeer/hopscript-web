import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardRight, HSButton, HSCardHeader } from '../../common';
import { createNewScript } from '../ScriptBuilder/ScriptBuilderActions';
import { fetchScripts, fetchBrokerScripts, removeScript } from './ScriptsListActions';
import { ScriptsListItem } from './';

class ScriptsListView extends Component {
  constructor(props) {
    super(props);
    this.handleNewScript = this.handleNewScript.bind(this);
    this.removeScript = this.removeScript.bind(this);
  }

  handleNewScript() {
    this.props.createNewScript();
  }

  removeScript(id) {
    this.props.removeScript(id);
  }

  componentWillMount() {
    this.props.fetchScripts();
    this.props.fetchBrokerScripts();
  }

  render() {
    const { scripts, brokerageScripts } = this.props;
    return (
      <CardRight loading={this.props.loading}>
        <HSCardHeader>My Scripts</HSCardHeader>
        <div className="pa3">
          <div className="mv4">
            {brokerageScripts &&
              brokerageScripts.map(script => (
                <ScriptsListItem script={script} key={script.id} removeScript={this.removeScript} />))
            }
            {scripts &&
              scripts.map(script => (
                <ScriptsListItem script={script} key={script.id} removeScript={this.removeScript} />))
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
  createNewScript, fetchScripts, fetchBrokerScripts, removeScript
})(ScriptsListView);
