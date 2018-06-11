/**
 * The purpose of this file is to provide a basic UI for the Lead List Item,
 * provide a confirmation modal when a user selects delete,
 * and on confirmation, trigger a function to remove the Lead
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Colors } from '../../../config/styles';
import { Button, ModalCard } from '../../common';
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
    const {
      attributes
    } = this.props.leadGroup;
    console.log('attributes', this.props.leadGroup);
    return (
      <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="flex w-100 items-center justify-between" role="button" onClick={() => console.log('leadgroup detail view')}>
          <div className="w-30-ns">{attributes.groupName}</div>
          <div
            className="br-100 bg-brand-primary white flex items-center justify-center hov-danger"
            role="button"
            style={{ width: '2rem', height: '2rem' }}
            onClick={this.handleRemoveLeadGroup}>
            X
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { removeLeadGroup })(LeadGroupListItem);
