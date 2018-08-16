import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors } from '../../../config/styles';
import { HSButton, CardRight } from '../../common';
import { nextLeadGroupCall, fetchAndSetToken, } from '../CallActions';
import { fetchLead } from '../../Leads/LeadsActions';

class NextCallView extends Component {
  constructor(props) {
    super(props);
    this.handleNextCall = this.handleNextCall.bind(this);
  }

  componentDidMount() {
    this.props.fetchLead(this.props.params.id);
  }

  handleNextCall(e) {
    e.preventDefault();
    this.props.fetchAndSetToken()
      .then(() => {
        this.props.nextLeadGroupCall({
          lead: { id: this.props.params.id },
          leadGroup: this.props.params.lgid,
          script: this.props.params.sid,
          title: this.props.params.title
        });
      });
  }

  render() {
    return (
      <CardRight>
        {this.props.lead &&
          <div>
            <div className="f3 tc mt4">start next call with</div>
            <div className="f1 tc mt4">{this.props.lead.attributes.name || 'Lead Name'}</div>
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

const mapStateToProps = ({ LeadsReducer }) => {
  const {
    lead
  } = LeadsReducer;
  return {
    lead
  };
};

export default connect(mapStateToProps, { nextLeadGroupCall, fetchAndSetToken, fetchLead })(NextCallView);
