import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Colors } from '../../../config/styles';
import { HSButton, CardRight } from '../../common';

class NextCallView extends Component {
  constructor(props) {
    super(props);
    this.handleNextCall = this.handleNextCall.bind(this);
  }

  handleNextCall(e) {
    e.preventDefault();
    browserHistory.push(`/in-call/${this.props.leadGroup.attributes.leads[this.props.leadGroupIndex].id}`);
  }

  render() {
    return (
      <CardRight>
        {this.props.leadGroup &&
          <div>
            <div className="f3 tc mt4">start next call with</div>
            <div className="f1 tc mt4">{this.props.leadGroup.attributes.leads[this.props.leadGroupIndex].attributes.name || 'biff baff'}</div>
          </div>}
        <HSButton
          classOverrides="items-center mt4 mb4"
          backgroundColor={Colors.brandGreen}
          onClick={e => this.handleNextCall(e)}>
          Start Call
        </HSButton>
      </CardRight>
    );
  }
}

const mapStateToProps = ({ CallReducer }) => {
  const { leadGroup, leadGroupIndex } = CallReducer;
  return {
    leadGroup,
    leadGroupIndex
  }
}

export default connect(mapStateToProps)(NextCallView);
