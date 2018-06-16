/**
 * The purpose of this file is to provide UI wrapping around LeadsCSVForm and LeadsAddForm
 * location is passed to the leads nav
 */

import React from 'react';
import { LeadNavCard } from '../';
import { LeadsCSVForm, LeadsAddForm } from './';

const LeadsAddView = ({ location }) => (
  <LeadNavCard location={location}>
    <div className="mt5 flex w-100">
      <div className="w-50">
        <LeadsCSVForm />
      </div>
      <div className="w-50 pl4">
        <LeadsAddForm />
      </div>
    </div>
  </LeadNavCard>
);


export default LeadsAddView;
