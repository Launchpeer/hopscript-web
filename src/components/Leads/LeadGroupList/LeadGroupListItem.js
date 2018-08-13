import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Colors } from '../../../config/styles';
import { Button, ModalCard } from '../../common';

class LeadGroupListItem extends Component {
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
    } = this.props.leadGroup;
    const { removeGroup } = this.props;
    const { modalOpen } = this.state;
    return (
      <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        {modalOpen &&
          <ModalCard onClick={this.toggleModal}>
            <div className="pa4 tc">
            Are you sure you want to remove this Lead Group?
              <div className="w-100 flex justify-between pl4 pr4 mt4">
                <Button onClick={removeGroup} backgroundColor={Colors.darkRed}>Yes</Button>
                <Button onClick={this.toggleModal} backgroundColor={Colors.silver}>Cancel</Button>
              </div>
            </div>
          </ModalCard>
        }
        <div className="flex flex-row items-center w-100 ">
          <div className="w-100" role="button" onClick={() => browserHistory.push(`/lead-groups-list/${this.props.leadGroup.id}`)}>{attributes.groupName}</div>
          <div
            className="br-100 bg-brand-secondary white flex items-center justify-center hov-danger"
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


export default LeadGroupListItem;
