import React, { Component } from 'react';
import Parser from 'html-react-parser';
import { render } from 'react-dom';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { Colors, BorderRadius } from '../../config/styles';
import { Button, ModalCard } from '../common';

const notesConverter = notes => (
  React.createElement('div', {}, Parser(notes)));

const ExpandedItem = ({
  history, lead, onClick
}) => (
  <div className="flex flex-column w-100 bg-brand-primary pa3">
    <div className="flex flex-row justify-between items-center pb3">
      <div className="b w-25 white">{lead.name}</div>
      <div className="w-25 tc white">{lead.phone}</div>
      <div className="w-25 tc white">{moment(history.endTime).format('h:mm a, MMM D Y')}</div>
      <div className="w-25">
        <div role="button" style={{ borderRadius: BorderRadius.all }}className="pointer ba near-white bg-transparent b--near-white pv1 ph3 fr br" onClick={onClick}>less</div>
      </div>
    </div>
    <div className="flex flex-row pv3 white">
      <div className="b pr2">Call Title:</div>
      <div>{`'${history.title}'`}</div>
    </div>
    {history.leadGroup &&
    <div className="flex flex-row pv3 white">
      <div className="b pr2">Lead Group:</div>
      <div>{history.leadGroup}</div>
    </div>}
    {history.notes &&
      <div className="pv3 white">
        <div>
          <div className="b">Notes:</div>
        </div>
        <div className="pt2 white">
          <div>{notesConverter(history.notes.toString())}</div>
        </div>
      </div>}
  </div>);

const SmallItem = ({ history, lead, onClick }) => (
  <div className="flex flex-row justify-between items-center w-100 pa3">
    <div className="b w-25">{lead.name}</div>
    <div className="w-25 tc">{lead.phone}</div>
    <div className="w-25 tc">{moment(history.endTime).format('h:mm A, MMM D Y')}</div>
    <div className="w-25">
      <div role="button" style={{ borderRadius: BorderRadius.all }}className="pointer ba brand-primary bg-transparent b--brand-primary pv1 ph3 fr br" onClick={onClick}>more</div>
    </div>
  </div>);

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
      <div className="flex justify-between pointer list-hover list-alt-color-rows">
        {expanded ? <ExpandedItem history={history} lead={lead} onClick={() => this.setState({ expanded: !expanded })} /> : <SmallItem history={history} lead={lead} onClick={() => this.setState({ expanded: !expanded })} /> }
      </div>

    );
  }
}


export default HistoryListItem;
