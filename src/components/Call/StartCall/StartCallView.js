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
  HSCardHeader,
  LoaderOrThis
} from '../../common';
import { SelectGroup, SelectLead, SelectScript, CallTitle } from './';
import { Colors } from '../../../config/styles';
import { fetchLeads, fetchLeadGroups } from '../../Leads/LeadsActions';
import { fetchScripts } from '../../Scripts/ScriptsList/ScriptsListActions';
import { startCall } from '../CallActions';

class StartCallView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedGroup: true, lead: null };
    this.props.fetchLeads();
    this.props.fetchScripts();
    this.props.fetchLeadGroups();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(d) {
    this.props.startCall(d);
  }

  render() {
    const {
      handleSubmit,
      leads,
      change,
      scripts,
      loading,
      leadGroups
    } = this.props;
    return (
      <CardRight>
        <LoaderOrThis loading={loading}>
          <HSCardHeader>Start a Call</HSCardHeader>
          <div className="pa3 mt4">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <HalfGrid classOverrides="pr3">
                <SelectGroup
                  leadGroups={leadGroups}
                  selectedGroup={this.state.selectedGroup}
                  onClick={() => this.setState({ selectedGroup: true })}
                  classOverrides={!this.state.selectedGroup ? 'moon-gray' : 'brand-near-black'} />
                <SelectLead
                  leads={leads}
                  selectedGroup={!this.state.selectedGroup}
                  leadLoaded={this.state.lead}
                  onClick={() => this.setState({ selectedGroup: false })}
                  selectLead={(lead) => { change('lead', lead); this.setState({ lead }); }}
                  removeLead={(lead) => { change('lead', null); this.setState({ lead: null }); }}
                  classOverrides={this.state.selectedGroup ? 'moon-gray' : 'brand-near-black'} />
              </HalfGrid>
              <HalfGrid classOverrides="pl3 mb4">
                {scripts.length > 0 && <SelectScript scripts={scripts} />}
                <CallTitle />
              </HalfGrid>
              <HSButton>Start Call</HSButton>
            </form>
          </div>
        </LoaderOrThis>
      </CardRight>
    );
  }
}

const mapStateToProps = ({ LeadsReducer, ScriptsListReducer, CallReducer }) => {
  const { leads, leadGroups } = LeadsReducer;
  const { scripts } = ScriptsListReducer;
  const { loading } = CallReducer;
  return {
    leads,
    scripts,
    loading,
    leadGroups
  };
};

export default reduxForm({
  form: 'callForm',
})(connect(mapStateToProps, {
  fetchLeads, fetchScripts, startCall, fetchLeadGroups
})(StartCallView));
