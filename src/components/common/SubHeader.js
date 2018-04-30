import React from 'react';
import { browserHistory } from 'react-router';
import { ChevronLeft } from 'react-feather';
import _ from 'underscore';

import { Colors } from '../../config/styles';

const chevronPaths = ['dashboard'];

const hasChevron = (route) => {
  if (_.contains(chevronPaths, route)) {
    return true;
  }
};

const SubHeader = ({ label, route }) => (
  <div
    className="h6 w-100 f2 pa3 pointer flex items-center bg-near-white"
    role="button"
    color={Colors.brandSubHeader}
    onKeyPress={() => browserHistory.push('/dashboard')}
    onClick={() => browserHistory.push('/dashboard')}
  >
    {hasChevron(route) && <ChevronLeft size={48} />}
    <div style={{ color: Colors.silver }} className="pl3">
      {label}
    </div>
  </div>
);

export default SubHeader;
