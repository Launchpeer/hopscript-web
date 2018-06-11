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
  Button,
  Card
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
    console.log("prop: ", this.props);
    return (
      <FullScreenContainer classOverrides="vh-100 bg-light-gray">
        <div className="flex justify-center" style={{ paddingLeft: '100px' }}>
          <div className="w-90 mt3">
            <Card classOverrides="bb b--light-gray ">
              <div className="brand-green f4">Start a Call</div>
            </Card>
            <Card>
              <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <HalfGrid>
                  <div style={{ marginTop: '90px' }}>
                    <SelectGroup
                      selectedGroup={this.state.selectedGroup}
                      onClick={() => this.setState({ selectedGroup: true })}
                      classOverrides={!this.state.selectedGroup && 'moon-gray'} />
                    <SelectLead
                      selectedGroup={!this.state.selectedGroup}
                      onClick={() => this.setState({ selectedGroup: false })}
                      classOverrides={this.state.selectedGroup && 'moon-gray'} />
                  </div>
                </HalfGrid>
                <HalfGrid>
                  <div style={{ marginTop: '90px' }}>
                    <div>SELECT A LEAD SCRIPT</div>
                    <div>TITLE YOUR CALL</div>
                  </div>
                </HalfGrid>
                <Button
                  borderRadius="4px"
                  backgroundColor={Colors.brandGreen}
                  classOverrides="fr pl5 pr5 pt3 pb3 f5" >
                  Add Lead
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </FullScreenContainer>
    );
  }
}

export default reduxForm({
  form: 'callForm',
})(connect(null)(CallView));
