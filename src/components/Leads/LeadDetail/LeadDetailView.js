import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { ArrowLeftCircle } from 'react-feather';
import { FullScreenContainer, CenterThis, HalfGrid, Button } from '../../common';
import { fetchLead, fetchLeadGroups, deleteLead } from '../LeadsActions';
import { LeadDetailForm, LeadGroupForm } from './';
import { LeadNavBar } from '../LeadsCommon';
import { Colors } from '../../../config/styles';


class LeadDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.props.fetchLead(this.props.params.id);
    this.props.fetchLeadGroups();
  }

  handleDelete(lead) {
    this.props.deleteLead(lead);
    browserHistory.push('/list-leads');
  }

  render() {
    const { lead, myLeadGroups, leadGroups } = this.props;
    return (
      <FullScreenContainer classOverrides="vh-100 bg-light-gray">
        <div className="w-100" style={{ paddingLeft: "100px" }}>
          <CenterThis>
            <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
              <LeadNavBar route="/list-leads" />
            </div>
          </CenterThis>

          <CenterThis>
            <div className="w-90 mb1 pa3 f4 flex flex-row" style={{ backgroundColor: Colors.white }} >
              <div role="button" className="pointer" onClick={() => browserHistory.push('/list-leads')}>
                <ArrowLeftCircle />
              </div>
              <div className="pl3 b">{lead && lead.attributes.name}</div>
            </div>
          </CenterThis>

          <CenterThis>
            <div className="flex w-90 items-center" style={{ backgroundColor: Colors.white }}>
              <HalfGrid>
                <CenterThis>
                  <div className="pa4 w-100" >
                    { lead && <LeadDetailForm lead={lead} />}
                  </div>
                </CenterThis>
              </HalfGrid>

              <HalfGrid>
                <CenterThis>
                  <div className="pa4 w-100" >
                    {lead && leadGroups && <LeadGroupForm lead={lead} myLeadGroups={myLeadGroups} leadGroups={leadGroups} />}
                  </div>
                </CenterThis>
                <div className="ph4 fr"><Button classOverrides="f5" backgroundColor={Colors.brandRed} onClick={() => this.handleDelete(lead.id)}>Delete Lead</Button></div>
              </HalfGrid>
            </div>
          </CenterThis>
        </div>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { lead, myLeadGroups, leadGroups } = LeadsReducer;
  return {
    lead,
    myLeadGroups,
    leadGroups
  };
};

export default connect(mapStateToProps, {
  fetchLead,
  fetchLeadGroups,
  deleteLead
})(LeadDetailView);
