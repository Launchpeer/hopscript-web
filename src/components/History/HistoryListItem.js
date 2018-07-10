import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Colors, BorderRadius } from '../../config/styles';
import { Button, ModalCard } from '../common';
import moment from 'moment';

class HistoryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const history = this.props.historyItem.attributes;
    const lead = this.props.historyItem.attributes.lead.attributes;
    const { expanded } = this.state;
    return (
      <div className="flex justify-between pointer list-hover pa3 list-alt-color-rows"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="flex flex-row justify-between items-center w-100 ">

          <div className="b w-25">{history.title}</div>
          <div className="w-25 tc">{lead.phone}</div>
          <div className="w-25 tc">{moment(history.endTime).format('h:mm A, MMM D Y')}</div>
          <div className="w-25">
            <div role="button" style={{ borderRadius: BorderRadius.all }}className="pointer ba b--brand-primary pv1 ph3 fr br" onClick={() => this.setState({ expanded: !expanded })}>more</div>
          </div>
        </div>
      </div>

    );
  }
}


export default HistoryListItem;
