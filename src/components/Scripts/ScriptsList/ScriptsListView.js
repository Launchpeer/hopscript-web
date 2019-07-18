import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardRight, HSButton, HSCardHeader, Button } from '../../common';
import { createNewScript } from '../ScriptBuilder/ScriptBuilderActions';
import { fetchScripts, removeScript } from './ScriptsListActions';
import { ScriptsListItem } from './';
import { Colors } from '../../../config/styles'

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
  }

  render() {
    const { scripts } = this.props;
    return (
      <CardRight loading={this.props.loading}>
        <HSCardHeader>My Scripts</HSCardHeader>
        <div className="pa3">
          <div className="mv4">
            {scripts && scripts.length > 0 ?
              scripts.map(script => (
                <ScriptsListItem script={script} key={script.id} removeScript={this.removeScript} />))
            :
              <div className="mt6 tc f4 pa3 silver">
                <div className="mb6">
             You currently do not have any scripts. <br />
             “Add New Script” to start building your first script!
                </div>
              </div>
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
  const { scripts, loading } = ScriptsListReducer;
  return {
    user,
    loading,
    scripts
  };
};

export default connect(mapStateToProps, { createNewScript, fetchScripts, removeScript })(ScriptsListView);
