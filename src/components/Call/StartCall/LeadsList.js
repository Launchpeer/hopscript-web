import React from 'react';


const LeadsList = ({ leads, selectLead }) => (
  <div>
    {leads.map(lead => (
      <div
        role="button"
        className="flex w-100 items-center justify-between list-alt-color-rows pa3 pointer list-hover"
        onClick={() => { selectLead(lead); }} >
        <div className="w-30-ns brand-near-black">{lead.attributes.name}</div>
        <div
          className="br-100 bg-brand-near-black white flex items-center justify-center hov-green"
          role="button"
          style={{ width: '2rem', height: '2rem' }} >
          +
        </div>
      </div>
    ))}
  </div>
);

export default LeadsList;
