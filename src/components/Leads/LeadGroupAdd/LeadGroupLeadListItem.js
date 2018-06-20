/**
 * The purpose of this file is to provide a basic UI for the Lead List Item
 * for the Add Lead Group screen
 */

import React from 'react';
import { Plus } from 'react-feather';


const LeadGroupLeadListItem = ({ onClick, lead, adds }) => (
  <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
    style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
    <div className="flex w-100 items-center justify-between">
      <div className="w-30-ns">{lead.attributes.name}</div>
      {adds ?
        <div
          className="br-100 bg-brand-green white flex items-center justify-center dim"
          role="button"
          style={{ width: '2rem', height: '2rem' }}
          onClick={onClick}>
          <Plus />
        </div>
        :
        <div
          className="br-100 bg-brand-red white flex items-center justify-center dim"
          role="button"
          style={{ width: '2rem', height: '2rem' }}
          onClick={onClick}>
           X
        </div>
      }
    </div>
  </div>
);


export default LeadGroupLeadListItem;
