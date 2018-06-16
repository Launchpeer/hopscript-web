/**
 * The purpose of this file is to provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import { CardRight } from '../common';
import { LeadNavBar } from './';

const LeadNavCard = ({ location, children }) => (
  <CardRight>
    <LeadNavBar route={location.pathname} />
    <div className="pa3 flex flex-row justify-around">
      {children}
    </div>
  </CardRight>
);


export default LeadNavCard;
