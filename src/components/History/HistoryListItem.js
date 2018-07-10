import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Colors } from '../../config/styles';
import { Button, ModalCard } from '../common';

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
    const {
      attributes
    } = this.props.historyItem;
    const { expanded } = this.state;
    return (
      <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="flex flex-row items-center w-100 ">
          <div className="w-100">{attributes.title}</div>
        </div>
      </div>

    );
  }
}


export default HistoryListItem;
