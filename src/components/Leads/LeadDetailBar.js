import React from 'react';
import { ArrowLeftCircle } from 'react-feather';

const LeadDetailBar = ({ name, onClick }) => (
  <div className="flex flex-row bb bw1 b--light-gray pa3 f4 mt2">
    <div role="button" className="pointer" onClick={onClick}>
      <ArrowLeftCircle />
    </div>
    <div className="pl3 b">{name}</div>
  </div>

);


export default LeadDetailBar;
