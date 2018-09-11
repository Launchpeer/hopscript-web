/**
 * The purpose of this file is to provide UI wrapping around CallForm
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  RenderAlert,
  HalfGrid,
  HSButton,
  CardRight,
  HSCardHeader,
  LoaderOrThis
} from '../../common';
import { SelectGroup, SelectLead, SelectScript, CallTitle } from './';
import { fetchLeads, fetchLeadGroups, fetchNextLeads, searchForLeads } from '../../Leads/LeadsActions';
import { fetchScripts } from '../../Scripts/ScriptsList/ScriptsListActions';
import { startCall, startLeadGroupCalls, fetchAndSetToken } from '../CallActions';


class StartCallView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedGroup: true, lead: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(d) {
    this.props.fetchAndSetToken();
    if (d.lead) {
      this.props.startCall(d);
    } else if (d.leadGroup) {
      this.props.startLeadGroupCalls(d);
    }
  }


  componentWillMount() {
    this.props.fetchLeads();
    this.props.fetchScripts();
    this.props.fetchLeadGroups();
  }

  render() {
    const {
      handleSubmit,
      leads,
      scripts,
      leadGroups,
      error,
      change,
      loading,
      moreLeads,
      moreLeadsLoading
    } = this.props;
    return (
      <LoaderOrThis loading={loading}>
        <CardRight>
          <HSCardHeader>Start a Call</HSCardHeader>
          <div className="pa3 mt4">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <HalfGrid classOverrides="pr3">
                <SelectGroup
                  leadGroups={leadGroups}
                  selectedGroup={this.state.selectedGroup}
                  onClick={() => { this.setState({ selectedGroup: true, lead: null }); change('lead', null); }}
                  classOverrides={!this.state.selectedGroup ? 'moon-gray' : 'brand-near-black'} />
                <SelectLead
                  leads={leads}
                  selectedGroup={!this.state.selectedGroup}
                  leadLoaded={this.state.lead}
                  moreLeads={moreLeads}
                  moreLeadsLoading={moreLeadsLoading}
                  fetchNextLeads={this.props.fetchNextLeads}
                  onClick={() => { this.setState({ selectedGroup: false }); change('leadGroup', null); }}
                  selectLead={(lead) => { change('lead', lead); this.setState({ lead }); }}
                  removeLead={() => { change('lead', null); this.setState({ lead: null }); this.props.fetchLeads(); }}
                  searchForLeads={this.props.searchForLeads}
                  classOverrides={this.state.selectedGroup ? 'moon-gray' : 'brand-near-black'} />
              </HalfGrid>
              <HalfGrid classOverrides="pl3 mb4">
                {scripts.length > 0 ?
                  <SelectScript scripts={scripts} /> :
                  <div className="mb4">
                    <div className="i brand-red">Script needed to start a call</div>
                    <div
                      className="mt2 b pointer"
                      role="button"
                      onClick={() => browserHistory.push('/scripts')}>
                        Create a script now!
                    </div>
                  </div>
                }
                <CallTitle />
              </HalfGrid>
              {error ?
                <HSButton onClick={(e) => { e.preventDefault(); this.setState({ showError: true }); }}>Start Call</HSButton> :
                <HSButton>Start Call</HSButton>
              }
              {this.state.showError && error &&
                <div className="pa2">
                  <RenderAlert error={{ message: error }} />
                </div>
              }
            </form>
          </div>
        </CardRight>
      </LoaderOrThis>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.leadGroup && !values.lead) {
    errors._error = 'All fields are required';
  } else if (!values.title || !values.script) {
    errors._error = 'All fields are required';
  }
  return errors;
}

const mapStateToProps = ({ LeadsReducer, ScriptsListReducer, CallReducer }) => {
  const {
    leads,
    leadGroups,
    moreLeads,
    moreLeadsLoading,
  } = LeadsReducer;
  const { scripts } = ScriptsListReducer;
  const { token, loading } = CallReducer;
  return {
    leadGroups,
    leads,
    loading,
    moreLeads,
    moreLeadsLoading,
    scripts,
    token,
  };
};

export default reduxForm({
  form: 'callForm',
  validate
})(connect(mapStateToProps, {
  fetchAndSetToken,
  fetchLeadGroups,
  fetchLeads,
  fetchNextLeads,
  fetchScripts,
  searchForLeads,
  startCall,
  startLeadGroupCalls,
})(StartCallView));
