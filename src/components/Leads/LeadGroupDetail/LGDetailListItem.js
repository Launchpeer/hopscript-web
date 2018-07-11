/**
 * The purpose of this file is to provide a basic UI for the Lead List Item
 * within the Lead Group view. If a call has been made, the agent can click
 * "More" to expand the list item and see the details of the call.
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import moment from 'moment';
import { BorderRadius } from '../../../config/styles';
import { fetchLastLeadCall } from '../LeadsActions';

const notesConverter = notes => (
  React.createElement('div', {}, Parser(notes)));

const ExpandedItem = ({
  lead, onClick
}) => (
  <div className="flex flex-column w-100 bg-brand-primary pa3">
    <div className="flex flex-row justify-between items-center pb3">
      <div className="b w-25 white">{lead.name}</div>
      <div className="w-25 tc white">{lead.phone}</div>
      <div className="w-25 tc white">{moment(lead.lastContact).format('h:mm a, MMM D Y')}</div>

      <div className="w-25">
        <div role="button" style={{ borderRadius: BorderRadius.all }} className="pointer ba near-white bg-transparent b--near-white pv1 ph3 fr br" onClick={onClick}>less</div>
      </div>
    </div>
    <div className="flex flex-row pv3 white">
      <div className="b pr2">Call Title:</div>
      <div>{lead.lastCallTitle}</div>
    </div>

    <div className="pv3 white">
      <div>
        <div className="b">Notes:</div>
      </div>
      <div className="pt2 white">
        <div>{notesConverter(lead.lastCallNotes.toString())}</div>
      </div>
    </div>
  </div>);

const SmallItem = ({ lead, onClick }) => (
  <div className="flex flex-row justify-between items-center w-100 pa3">
    <div className="b w-25">{lead.name}</div>
    <div className="w-25 tc">{lead.phone}</div>
    { lead.lastContact ? <div className="w-25 tc">{moment(lead.lastContact).format('h:mm a, MMM D Y')}</div> : <div className="w-25 tc i silver">Not contacted yet</div> }
    <div className="w-25">
      {lead.lastContact && <div role="button" style={{ borderRadius: BorderRadius.all }}className="pointer ba brand-primary bg-transparent b--brand-primary pv1 ph3 fr br" onClick={onClick}>more</div>}
    </div>
  </div>);


class LGDetailListItem extends Component {
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

  componentWillMount() {
    this.props.fetchLastLeadCall(this.props.lead.id);
  }

  render() {
    const lead = this.props.lead.attributes;
    const { expanded } = this.state;
    return (
      <div className="flex justify-between pointer list-hover list-alt-color-rows">

        {expanded ? <ExpandedItem lead={lead} onClick={() => this.toggleExpand()} /> : <SmallItem lead={lead} onClick={() => this.toggleExpand()} /> }

      </div>


    );
  }
}


export default connect(null, {
  fetchLastLeadCall
})(LGDetailListItem);
