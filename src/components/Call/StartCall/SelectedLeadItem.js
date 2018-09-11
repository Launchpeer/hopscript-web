import React from 'react';

const SelectedLeadItem = ({ lead, removeLead }) => {
  const { name } = lead.attributes;
  return (
    <div className="flex w-100 items-center justify-between list-alt-color-rows pa3 pointer list-hover">
      <div className="w-30-ns brand-near-black">{name}</div>
      <div
        className="br-100 bg-brand-near-black white flex items-center justify-center hov-danger"
        role="button"
        style={{ width: '2rem', height: '2rem' }}
        onClick={removeLead}>
        X
      </div>
    </div>
  );
};

export default SelectedLeadItem;
