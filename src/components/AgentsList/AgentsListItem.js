/**
 * The purpose of this file is to provide a basic UI for the Agent List Item,
 * provide a confirmation modal when a user selects delete,
 * and on confirmation, trigger a function to remove and dissociate the Agent from the Brokerage
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Colors } from '../../config/styles';
import { Button, ModalCard } from '../common';
import { removeAgent } from './AgentsListActions';

class AgentsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
    this.handleRemoveAgent = this.handleRemoveAgent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  handleRemoveAgent() {
    this.props.removeAgent(this.props.agent);
  }
  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    const {
      attributes
    } = this.props.agent;
    const { modalOpen } = this.state;
    return (
      <div className={`flex justify-between items-center pointer list-hover pa3 list-alt-color-rows`}
        style={{
          paddingTop: '1rem',
          paddingBottom: '1rem'
        }}
      >
        {modalOpen &&
          <ModalCard onClick={this.toggleModal}>
            <div className="pa4 tc">
            Are you sure you want to delete this agent?
            <div className="w-100 flex justify-between pl4 pr4 mt4">
              <Button onClick={this.handleRemoveAgent} backgroundColor={Colors.darkRed}>yes</Button>
              <Button onClick={this.toggleModal} backgroundColor={Colors.silver}>cancel</Button>
            </div>
            </div>
          </ModalCard>
        }
        <div
          className="flex w-100 items-center justify-between"
        >
          <div className="w-30-ns brand-near-black">{attributes.name}</div>
          <div className="w-30-ns silver">{attributes.email}</div>
          <div
            className="br-100 bg-brand-primary white flex items-center justify-center hov-danger"
            style={{width: '2rem', height: '2rem'}}
            onClick={this.toggleModal}>
            X
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { removeAgent })(AgentsListItem);
