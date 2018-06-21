/**
 * The purpose of this file is to provide a basic UI for the Lead List Item
 * within the Lead Group view. If a call has been made, the agent can click
 * "More" to expand the list item and see the details of the call.
 *
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button } from '../../common';
import { Colors } from '../../../config/styles';

class LGDetailListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandLead: false
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({ expandLead: !this.state.expandLead });
  }
  render() {
    const {
      lead
    } = this.props;
    const { expandLead } = this.state;
    return (
      expandLead ? (
        <div className="flex flex-column justify-between items-center pointer pa3 bg-brand-primary"
          style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <div className="flex w-100 items-center justify-between">
            <div className="w-30-ns white b">{lead.attributes.name}</div>
            <div className="w-30-ns white">{lead.attributes.phone}</div>
            <div className="w-30-ns white">1:18 pm, March 04 2018</div>
            <Button classOverrides="f5" buttonPadding="ph4 pv1" borderWidth="1px" backgroundColor={Colors.brandPrimary} borderColor={Colors.white} fontColor={Colors.white} onClick={() => this.toggleExpand()}>less</Button>
          </div>
          <div className="white items-start w-100 pv3">
            <div className="flex flex-row pv3"><div className="b pr2">Call Title:</div> <div>'A Friendly Call'</div></div>
            <div className="b pv3">Notes:</div>
            <div>Wow, what a friendly call that was.</div>
          </div>
        </div>
      ) :
        (
          <div className="flex justify-between items-center pointer list-hover pa3 list-alt-color-rows"
            style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <div className="flex w-100 items-center justify-between">
              <div className="w-30-ns b">{lead.attributes.name}</div>
              <div className="w-30-ns">{lead.attributes.phone}</div>
              <div className="w-30-ns silver">not contacted yet</div>
              <Button classOverrides="f5" buttonPadding="ph4 pv1" borderWidth="1px" borderColor={Colors.brandPrimary} fontColor={Colors.brandPrimary} onClick={() => this.toggleExpand()}>more</Button>
            </div>
          </div>
        )
    );
  }
}


export default LGDetailListItem;
