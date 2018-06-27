/**
 * The purpose of this file is to provide UI wrapping around CallForm
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, Field } from 'redux-form';
import {
  FullScreenContainer,
  Title,
  HalfGrid,
  HSButton,
  Card,
  CardRight,
  HSCardHeader
} from '../../common';
import { SelectGroup, SelectLead, SelectScript, CallTitle } from './';
import { Colors } from '../../../config/styles';
import { fetchLeads } from '../../Leads/LeadsActions';
import { fetchScripts } from '../../Scripts/ScriptsList/ScriptsListActions';

class StartCallView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedGroup: true, lead: null };
    this.props.fetchLeads();
    this.props.fetchScripts();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(d) {
    console.log('data', d);
  }

  render() {
    const {
      handleSubmit,
      leads,
      change,
      scripts } = this.props;
    return (
      <CardRight>
        <HSCardHeader>Start a Call</HSCardHeader>
        <div className="pa3 mt4">
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <HalfGrid classOverrides="pr3">
              <SelectGroup
                selectedGroup={this.state.selectedGroup}
                onClick={() => this.setState({ selectedGroup: true })}
                classOverrides={!this.state.selectedGroup ? 'moon-gray' : 'brand-near-black'} />
              <SelectLead
                leads={leads}
                selectedGroup={!this.state.selectedGroup}
                leadLoaded={this.state.lead}
                onClick={() => this.setState({ selectedGroup: false })}
                selectLead={(lead) => {change('lead', lead); this.setState({ lead })}}
                removeLead={(lead) => {change('lead', null); this.setState({ lead: null })}}
                classOverrides={this.state.selectedGroup ? 'moon-gray' : 'brand-near-black'} />
            </HalfGrid>
            <HalfGrid classOverrides="pl3 mb4">
              {scripts.length > 0 && <SelectScript scripts={scripts} />}
              <CallTitle />
            </HalfGrid>
            <HSButton>Start Call</HSButton>
          </form>
        </div>
      </CardRight>
    );
  }
}

const mapStateToProps = ({ LeadsReducer, ScriptsListReducer }) => {
  const { leads } = LeadsReducer;
  const { scripts } = ScriptsListReducer;
  return {
    leads,
    scripts
  }
}

export default reduxForm({
  form: 'callForm',
})(connect(mapStateToProps, { fetchLeads, fetchScripts })(StartCallView));
