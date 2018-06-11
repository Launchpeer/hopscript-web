/**
 * The purpose of this file is to provide a basic UI for the Lead Group List Item,
 * provide delete button, and trigger a function to remove Lead Group
 */

import React from 'react';

const LeadGroupListItem = ({ onClick, leadGroup }) => (
  <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
    style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
    <div className="flex w-100 items-center justify-between" role="button" onClick={() => console.log('leadgroup detail view')}>
      <div className="w-30-ns">{leadGroup.attributes.groupName}</div>
      <div
        className="br-100 bg-brand-primary white flex items-center justify-center hov-danger"
        role="button"
        style={{ width: '2rem', height: '2rem' }}
        onClick={onClick}>
      X
      </div>
    </div>
  </div>
);


export default LeadGroupListItem;
