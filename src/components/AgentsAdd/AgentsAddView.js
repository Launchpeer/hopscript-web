/**
 * The purpose of this file is provide UI wrapping around AgentsAddForm
 */

import React from 'react';
import { AgentsAddForm } from './';

const AgentsAddView = props => (
  <div>
    <AgentsAddForm cancel={props.cancel} />
  </div>

);

export default AgentsAddView;
