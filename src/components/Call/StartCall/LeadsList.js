import React from 'react';

const LeadsListItem = ({ lead, selectLead }) => {
  const { name } = lead.attributes;
  return (
    <div
      className="flex w-100 items-center justify-between list-alt-color-rows pa3 pointer list-hover"
    >
      <div className="w-30-ns brand-near-black">{name}</div>
      <div
        className="br-100 bg-brand-near-black white flex items-center justify-center hov-green"
        role="button"
        style={{ width: '2rem', height: '2rem' }}
        onClick={() => {selectLead(lead)}}>
        +
      </div>
    </div>
  )
}
const LeadsList = ({ leads, search, selectLead }) => {
  return (
    <div>
    {search.length > 0
      ?
        leads.filter(lead => lead.attributes.name.includes(search)).map(filteredLead => (<LeadsListItem lead={filteredLead} key={filteredLead.id} selectLead={selectLead} />))
      :
        leads.map(lead => (<LeadsListItem lead={lead} key={lead.id} selectLead={selectLead} />))
    }
    </div>
  );
}

export default LeadsList;
