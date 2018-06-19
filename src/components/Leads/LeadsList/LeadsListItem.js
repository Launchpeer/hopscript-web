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
import { removeLead } from '../LeadsActions';

class LeadsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.handleRemoveLead = this.handleRemoveLead.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  handleRemoveLead() {
    this.props.removeLead(this.props.lead.id);
  }
  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    const {
      attributes
    } = this.props.lead;
    const { modalOpen } = this.state;
    return (
      <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        {modalOpen &&
          <ModalCard onClick={this.toggleModal}>
            <div className="pa4 tc">
            Are you sure you want to delete this lead?
              <div className="w-100 flex justify-between pl4 pr4 mt4">
                <Button onClick={this.handleRemoveLead} backgroundColor={Colors.darkRed}>yes</Button>
                <Button onClick={this.toggleModal} backgroundColor={Colors.silver}>cancel</Button>
              </div>
            </div>
          </ModalCard>
        }
        <div className="flex w-100 items-center justify-between" role="button" onClick={() => browserHistory.push(`/leads-list/${this.props.lead.id}`)}>
          <div className="w-30-ns">{attributes.name}</div>
          <div className="w-30-ns">{attributes.phone}</div>
          <div className="w-30-ns">{attributes.email}</div>
          <div
            className="br-100 bg-brand-primary white flex items-center justify-center hov-danger"
            role="button"
            style={{ width: '2rem', height: '2rem' }}
            onClick={this.toggleModal}>
            X
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { removeLead })(LeadsListItem);
