import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../../config/styles';
import {
  InputText,
  Button,
  LoaderOrThis,
  RenderAlert
} from '../../common';


const LeadGroupAddForm = ({ leadsToAdd }) => (
  <div>
    {leadsToAdd && leadsToAdd.map(lead => <div key={lead}>{lead}</div>)}
  </div>
);


export default LeadGroupAddForm;
