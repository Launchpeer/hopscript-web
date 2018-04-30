import React, { Component } from 'react';
import { ModalCard } from '../common';
import { CreateRaffleForm } from './';

class CreateRaffleCard extends Component {
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
    const { modalOpen } = this.state;
    const { classOverrides } = this.props;

    return (
      <div>
        <div className={`mb6 bg-brand-purple white flex justify-center items-center br3 f2 pointer hov-transparent ${classOverrides}`}
          style={{
              width: '450px',
              height: '200px'
            }}
          onClick={this.toggleModal}
          onKeyPress={this.toggleModal}
          role="button"
          >
            + Create New Raffle
        </div>
        {modalOpen &&
          <ModalCard header="Create Raffle" onClick={this.toggleModal}>
            <CreateRaffleForm toggleModal={this.toggleModal} />
          </ModalCard>}
      </div>
    );
  }
}

export default CreateRaffleCard;
