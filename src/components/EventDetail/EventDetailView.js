import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { BorderRadius, Colors } from '../../config/styles';
import { FullScreenContainer, SubHeader, ModalCard, Button } from '../common';
import { EventDetailFormView, EventDetailStatsView } from './';
import {
  fetchEvent,
  generateWinner,
  fetchMoneyRaised
} from './EventDetailActions';

class EventDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
    this.generateWinner();
  }

  componentWillMount() {
    this.props.fetchEvent(this.props.params.id);
    this.props.fetchMoneyRaised(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.currentEvent);
  }

  generateWinner() {
    this.props.generateWinner(
      this.props.currentEvent.id,
      this.props.currentEvent.attributes.eventName
    );
  }

  render() {
    const { modalOpen } = this.state;
    const {
      user, currentEvent, loading, ticketTotals
    } = this.props;
    console.log(ticketTotals);
    if (currentEvent.id) {
      return (
        <FullScreenContainer color="white">
          <SubHeader
            label={user && user.attributes.guideName}
            route="event-detail"
          />
          {moment(new Date()).isAfter(currentEvent.attributes.endTime) && (
            <div>
              {currentEvent.attributes.winner ? (
                <div
                  className="pa4 bg-near-white black tc f2 ma4"
                  style={{
                    borderRadius: BorderRadius['medium'].all
                  }}
                >
                  <div className="pa2">
                    Winner:{' '}
                    {currentEvent.attributes.winner.attributes.firstName}{' '}
                    {currentEvent.attributes.winner.attributes.lastName}
                  </div>
                  <div className="pa2">
                    Email:{' '}
                    {currentEvent.attributes.winner.attributes.email ||
                      currentEvent.attributes.winner.attributes.username}
                  </div>
                </div>
              ) : (
                <div>
                  {currentEvent.attributes.participants ? (
                    <div
                      className="pa4 bg-brand-purple white tc f2 ma4 pointer"
                      style={{
                        borderRadius: BorderRadius['medium'].all
                      }}
                      onClick={this.toggleModal}
                    >
                      Generate Winner
                    </div>
                  ) : (
                    <div>
                      <div
                        className="pa4 bg-silver white tc f2 ma4"
                        style={{
                          borderRadius: BorderRadius['medium'].all
                        }}
                      >
                        Generate Winner
                      </div>
                      <div className="pa4 dark-red">* No participants</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap mt1 center justify-center">
            <div className="fl w-100 w-50-ns pa4 mw7">
              {currentEvent && <EventDetailFormView raffle={currentEvent} />}
            </div>
            <div className="fl w-100 w-50-ns pa2 mw7">
              {!loading &&
                currentEvent && (
                  <EventDetailStatsView
                    loading={loading}
                    raffleStats={ticketTotals}
                  />
                )}
            </div>
          </div>
          {modalOpen && (
            <ModalCard onClick={this.toggleModal} noHeaderBorder>
              <div className="tc brand-primary f2">WINNER</div>
              {currentEvent.attributes.winner && (
                <div>
                  <div className="tc f3 black pa3">
                    {currentEvent.attributes.winner.attributes.firstName}{' '}
                    {currentEvent.attributes.winner.attributes.lastName}
                  </div>
                  <div className="tc f3 black pa3">
                    {currentEvent.attributes.winner.attributes.email}
                  </div>
                </div>
              )}
              <div className="w-100 pa3 bt bw1 b--near-white">
                <Button
                  backgroundColor="brandPurple"
                  classOverrides="w-100"
                  onClick={this.toggleModal}
                >
                  Cool, got it!
                </Button>
              </div>
            </ModalCard>
          )}
        </FullScreenContainer>
      );
    }
    return (
      <FullScreenContainer color="white">
        <SubHeader
          label={user && user.attributes.guideName}
          route="event-detail"
        />
        <div className="flex flex-wrap mt4">
          <div className="fl w-100 w-50-ns pa4" />
          <div className="fl w-100 w-50-ns pa2" />
        </div>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ UserReducer, EventDetailReducer }) => {
  const { user } = UserReducer;
  const { currentEvent, ticketTotals } = EventDetailReducer;
  return {
    user,
    currentEvent,
    ticketTotals
  };
};

export default connect(mapStateToProps, {
  fetchEvent,
  generateWinner,
  fetchMoneyRaised
})(EventDetailView);
