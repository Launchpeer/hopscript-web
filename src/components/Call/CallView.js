/**
 * The purpose of this file is to provide UI wrapping around CallForm
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  FullScreenContainer,
  Title,
  HalfGrid,
  HSButton,
  Card,
  CardRight,
  HSCardHeader
} from '../common';
import { SelectGroup, SelectLead } from './';
import { Colors } from '../../config/styles';

class CallView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedGroup: true };
  }
  handleFormSubmit(d) {
    console.log(d);
  }
  render() {
    return (
      <CardRight>
        <HSCardHeader>Start a Call</HSCardHeader>
        <div className="pa3 mt4">
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <HalfGrid>
              <SelectGroup
                selectedGroup={this.state.selectedGroup}
                onClick={() => this.setState({ selectedGroup: true })}
                classOverrides={!this.state.selectedGroup && 'moon-gray'} />
              <SelectLead
                selectedGroup={!this.state.selectedGroup}
                onClick={() => this.setState({ selectedGroup: false })}
                classOverrides={this.state.selectedGroup && 'moon-gray'} />
            </HalfGrid>
            <HalfGrid>
              <div>SELECT A LEAD SCRIPT</div>
              <div>TITLE YOUR CALL</div>
            </HalfGrid>
            <HSButton>Start Call</HSButton>
          </form>
        </div>
      </CardRight>
    );
  }
}

export default reduxForm({
  form: 'callForm',
})(connect(null)(CallView));
