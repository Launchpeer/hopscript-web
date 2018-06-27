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
} from '../../common';
import { SelectGroup, SelectLead } from './';
import { Colors } from '../../../config/styles';
import { fetchLeads } from '../../Leads/LeadsActions';

class StartCallView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedGroup: true };
    console.log('call view');
    this.props.fetchLeads();
  }
  handleFormSubmit(d) {
    console.log(d);
  }

  render() {
    const { handleSubmit, leads } = this.props;
    return (
      <CardRight>
        <HSCardHeader>Start a Call</HSCardHeader>
        <div className="pa3 mt4">
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
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

const mapStateToProps = ({ LeadsReducer }) => {
  const { leads } = LeadsReducer;
  console.log('leads', leads);
  return {
    leads
  }
}

export default reduxForm({
  form: 'callForm',
})(connect(mapStateToProps, { fetchLeads })(StartCallView));
