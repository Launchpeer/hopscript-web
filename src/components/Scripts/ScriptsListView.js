import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardRight } from '../common';
import { Colors } from '../../config/styles';

const ScriptsList = () => (
  <div className="mt6 mb6 tc f4" style={{ color: Colors.silver }}>
  You currently do not have any scripts <br />
  “Add New Script” to start building your first script! <br /> <br />
  </div>
);


class ScriptsListView extends Component {
  render() {
    return (
      <CardRight loading={this.props.loading}>
        <ScriptsList />
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

export default connect(mapStateToProps)(ScriptsListView);
