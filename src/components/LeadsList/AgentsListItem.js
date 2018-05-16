/**
 * The purpose of this file is to provide a basic UI for the Lead List Item,
 * provide a confirmation modal when a user selects delete,
 * and on confirmation, trigger a function to remove and dissociate the Lead from the Brokerage
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Colors } from '../../config/styles';
import { Button, ModalCard } from '../common';
import { removeLead } from './LeadsListActions';

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
    this.props.removeLead(this.props.lead);
  }
  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    const { attributes } = this.props.lead;
    const { modalOpen } = this.state;
    return (
      <div
        className="flex justify-between items-center pointer list-hover pl2 pr2 bb bw1 b--moon-gray"
        style={{
          paddingTop: '1rem',
          paddingBottom: '1rem'
        }}
      >
        {modalOpen && (
          <ModalCard onClick={this.toggleModal}>
            <div className="pa4 tc">
              Are you sure you want to delete this lead?
              <div className="w-100 flex justify-between pl4 pr4 mt4">
                <Button
                  onClick={this.handleRemoveLead}
                  backgroundColor={Colors.darkRed}
                >
                  yes
                </Button>
                <Button
                  onClick={this.toggleModal}
                  backgroundColor={Colors.silver}
                >
                  cancel
                </Button>
              </div>
            </div>
          </ModalCard>
        )}
        <div className="flex w-100 items-center justify-between">
          <div className="w-30-ns black">{attributes.name}</div>
          <div className="w-30-ns black">{attributes.email}</div>
          <Button
            borderColor="red"
            fontColor="red"
            backgroundColor="white"
            borderWidth="1px"
            buttonPadding="pv2 ph3"
            borderRadius="small"
            onClick={this.toggleModal}
            classOverrides="mr1 dn flex-ns"
          >
            delete
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { removeLead })(LeadsListItem);
