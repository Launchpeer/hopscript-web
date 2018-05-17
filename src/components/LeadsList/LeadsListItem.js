import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../config/styles';
import { Button, ModalCard, InputDropDown } from '../common';
import { removeLead } from './LeadsListActions';
import { AddLeadToGroup } from './';

class LeadsListItem extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveLead = this.handleRemoveLead.bind(this);
    this.handleLeadRoute = this.handleLeadRoute.bind(this);
  }
  handleRemoveLead() {
    this.props.removeLead(this.props.lead.id);
  }

  handleLeadRoute() {
    browserHistory.push(`/list-leads/${this.props.lead.id}`);
  }

  render() {
    const { attributes } = this.props.lead;

    return (
      <div
        className="flex justify-between items-center pointer list-hover pl2 pr2 bb bw1 b--moon-gray"
        style={{
          paddingTop: '1rem',
          paddingBottom: '1rem'
        }}
      >
        <div className="flex w-100 items-center justify-between">
          <div className="w-30-ns black">{attributes.name}</div>
          <div>
            <Button
              borderColor="black"
              fontColor="black"
              backgroundColor="white"
              borderWidth="1px"
              buttonPadding="pv2 ph3"
              borderRadius="small"
              onClick={this.handleLeadRoute}
              classOverrides="mr1 dn flex-ns"
            >
              detail
            </Button>
          </div>
          <Button
            borderColor="red"
            fontColor="red"
            backgroundColor="white"
            borderWidth="1px"
            buttonPadding="pv2 ph3"
            borderRadius="small"
            onClick={this.handleRemoveLead}
            classOverrides="mr1 dn flex-ns"
          >
            delete
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { removeLead })(LeadsListItem);
