import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardRight, HSButton, HSCardHeader, LoaderOrThis } from '../../common';
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
    this.props.fetchBrokerScripts();
  }


  render() {
    const {
      scripts, brokerageScripts, user, loading
    } = this.props;
    return (
      <LoaderOrThis loading={loading}>
        <CardRight>
          <HSCardHeader>My Scripts</HSCardHeader>
          <div className="pa3">
            <div className="mv4">
              {brokerageScripts && user.attributes.role === 'brokerage' &&
              brokerageScripts.map(script => (
                <ScriptsListItem script={script} key={script.id} allowDelete removeScript={this.removeScript} />))
            }
              {brokerageScripts && user.attributes.role === 'agent' &&
            brokerageScripts.map(script => (
              <ScriptsListItem script={script} key={script.id} copyScript={this.handleScriptCopy} />))
            }
              { scripts &&
              scripts.map(script => (
                <ScriptsListItem script={script} key={script.id} allowDelete removeScript={this.removeScript} />))
            }
            </div>
            <HSButton onClick={this.handleNewScript}>Add New Script</HSButton>
          </div>
        </CardRight>
      </LoaderOrThis>
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
