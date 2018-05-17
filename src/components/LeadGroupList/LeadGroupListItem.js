import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Colors } from '../../config/styles';
import { Button, ModalCard } from '../common';
import { removeLeadGroup } from './LeadGroupListActions';

class LeadGroupListItem extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveLeadGroup = this.handleRemoveLeadGroup.bind(this);
  }
  handleRemoveLeadGroup() {
    this.props.removeLeadGroup(this.props.leadGroup.id);
  }

  render() {
    const { attributes } = this.props.leadGroups;

    return (
      <div
        className="flex justify-between items-center pointer list-hover pl2 pr2 bb bw1 b--moon-gray"
        style={{
          paddingTop: '1rem',
          paddingBottom: '1rem'
        }}
      >
        <div className="flex w-100 items-center justify-between">
          <div className="w-30-ns black">{attributes.groupName}</div>
          <Button
            borderColor="red"
            fontColor="red"
            backgroundColor="white"
            borderWidth="1px"
            buttonPadding="pv2 ph3"
            borderRadius="small"
            onClick={this.handleRemoveLeadGroup}
            classOverrides="mr1 dn flex-ns"
          >
            delete
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { removeLeadGroup })(LeadGroupListItem);
