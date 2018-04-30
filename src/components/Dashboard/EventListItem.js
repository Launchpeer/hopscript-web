import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

import { Colors } from '../../config/styles';
import { Button } from '../common';

class EventListItem extends Component {
  constructor(props) {
    super(props);
    this.handleEventRoute = this.handleEventRoute.bind(this);
  }
  handleEventRoute() {
    browserHistory.push(`/event-detail/${this.props.raffle.id}`);
  }
  getTicketTotal(tickets) {
    let total = 0;
    tickets.forEach((ticket) => {
      const type = ticket.get("type");
      const amount = ticket.get("amount") / 100;
      if (type === "donation") {
        total += amount;
      } else {
        const applicationFee = ticket.get("applicationFee");
        total += (amount - (amount * applicationFee));
      }
    });
    return Math.round(total);
  }

  render() {
    const {
      raffle, classOverrides, type
    } = this.props;
    const { attributes } = raffle;
    if (attributes) {
      return (
        <div className={`flex justify-between items-center pointer list-hover pl2 pr2 bb bw1 b--moon-gray ${classOverrides}`}
          style={{
          paddingTop: '1rem',
          paddingBottom: '1rem'
        }}
        >
          <div
            onClick={this.handleEventRoute}
            onKeyPress={this.handleEventRoute}
            role="button"
            className="flex w-100 items-center justify-between"
          >
            <div className="w-30-ns brand-deep-gray">{attributes.eventName || ''}</div>
            <div className="moon-gray  w-30-ns">{moment(raffle.attributes.startTime).format('MMMM DD, YYYY') || ''}</div>
            {type === 'upcoming' ?
              <Button
                borderColor="brandPurple"
                fontColor="brandPurple"
                backgroundColor="white"
                borderWidth="1px"
                buttonPadding="pv2 ph3"
                borderRadius="small"
                classOverrides="hov-purple mr1 dn flex-ns">manage
              </Button>
          :
              <div className="dn flex-ns moon-gray mr4">$ {attributes.tickets ? this.getTicketTotal(attributes.tickets) : "0"}</div>
        }
          </div>
        </div>
      );
    } return <div />;
  }
}

export default EventListItem;
