/**
 * The purpose of this file is to provide a basic UI for the Scripts List Item,
 * provide a confirmation modal when a user selects delete,
 * and on confirmation, trigger a function to remove the Script
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Colors } from '../../../config/styles';
import { Button, ModalCard } from '../../common';

class ScriptsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    const {
      attributes
    } = this.props.script;
    const { modalOpen } = this.state;
    const { removeScript } = this.props;
    return (
      <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        {modalOpen &&
          <ModalCard onClick={this.toggleModal}>
            <div className="pa4 tc">
            Are you sure you want to delete this script?
              <div className="w-100 flex justify-between pl4 pr4 mt4">
                <Button onClick={() => removeScript(this.props.script.id)} backgroundColor={Colors.darkRed}>yes</Button>
                <Button onClick={this.toggleModal} backgroundColor={Colors.silver}>cancel</Button>
              </div>
            </div>
          </ModalCard>
        }
        <div className="flex w-100 items-center justify-between">
          <div
            className="w-90"
            role="button"
            onClick={() => browserHistory.push(`/script-builder/${this.props.script.id}`)}
            >
            {attributes.name || 'Unnamed Script'}
          </div>
          <div className="w-10 flex items-end flex-column">
            <div
              className="br-100 bg-brand-primary white flex items-center justify-center hov-danger"
              role="button"
              style={{ width: '2rem', height: '2rem' }}
              onClick={this.toggleModal}>
              X
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScriptsListItem;
