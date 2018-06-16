import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
import { Colors } from '../../../config/styles';
import { Button, ModalCard } from '../../common';
import { removeLeadGroup } from '../LeadsActions';

class LeadGroupListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.handleRemoveLeadGroup = this.handleRemoveLeadGroup.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleRemoveLeadGroup() {
    this.props.removeLeadGroup(this.props.leadGroup.id);
  }
  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    const {
      attributes
    } = this.props.leadGroup;
    const { modalOpen } = this.state;
    return (
      <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        {modalOpen &&
          <ModalCard onClick={this.toggleModal}>
            <div className="pa4 tc">
            Are you sure you want to delete this Lead Group?
              <div className="w-100 flex justify-between pl4 pr4 mt4">
                <Button onClick={this.handleRemoveLeadGroup} backgroundColor={Colors.darkRed}>yes</Button>
                <Button onClick={this.toggleModal} backgroundColor={Colors.silver}>cancel</Button>
              </div>
            </div>
          </ModalCard>
        }
        <div className="flex w-100 items-center justify-between" role="button" onClick={() => console.log('leadgroup detail view')}>
          <div className="w-30-ns">{attributes.groupName}</div>
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


export default connect(null, { removeLeadGroup })(LeadGroupListItem);
