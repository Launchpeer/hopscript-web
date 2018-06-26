/**
 * The purpose of this file is to provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import { CardRight } from '../common';
import { LeadNavBar, LeadDetailBar } from './';

const LeadNavCard = ({
  location, children, leadDetailBar, name, onClick
}) => (
  <CardRight>
    <LeadNavBar route={location.pathname} />
    {leadDetailBar && <LeadDetailBar name={name} onClick={onClick} /> }
    <div className="pa3 flex flex-row justify-around">
      {children}
    </div>
  </CardRight>
);


export default LeadNavCard;
