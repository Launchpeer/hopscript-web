import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Colors } from '../../config/styles';
import { Button } from '../common';

class ActiveRaffleListItem extends Component {
  constructor(props) {
    super(props);
    this.handleEventRoute = this.handleEventRoute.bind(this);
  }
  handleEventRoute() {
    browserHistory.push(`/event-detail/${this.props.raffle.id}`);
  }

  render() {
    const {
      raffle, classOverrides
    } = this.props;
    return (
      <div className={`mh3 flex justify-between items-center pointer list-hover bb bw1 b--moon-gray ${classOverrides}`}
        style={{
          paddingTop: '1rem',
          paddingBottom: '1rem'
        }}>
        <div
          onClick={this.handleEventRoute}
          onKeyPress={this.handleEventRoute}
          role="button"
          className="flex w-100 items-center justify-between"
          >
          <div className="ml2 brand-deep-gray">{raffle && raffle.attributes ? raffle.attributes.eventName : ''}</div>
          <Button
            borderColor="brandPurple"
            fontColor="brandPurple"
            backgroundColor="white"
            borderWidth="1px"
            buttonPadding="pv2 ph3"
            borderRadius="small"
            classOverrides="hov-purple">manage
          </Button>
        </div>
      </div>
    );
  }
}

export default ActiveRaffleListItem;
