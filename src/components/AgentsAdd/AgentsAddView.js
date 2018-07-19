/**
 * The purpose of this file is provide UI wrapping around AgentsAddForm
 */

import React from 'react';
import { HSCardHeader, CardRight } from '../common';
import { AgentsAddForm } from './';

const AgentsAddView = props => (
  <CardRight>
    <HSCardHeader>Add Agents</HSCardHeader>
    <AgentsAddForm cancel={props.cancel} />
  </CardRight>

);

export default AgentsAddView;
