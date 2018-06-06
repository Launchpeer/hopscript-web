import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { ArrowLeftCircle } from 'react-feather';
import { FullScreenContainer, CenterThis, HalfGrid } from '../common';
import { fetchLead } from '../LeadsAdd/LeadsAddActions';
import { LeadDetailForm, LeadGroupForm } from './';
import { LeadNavBar } from '../LeadsAdd';
import { Colors } from '../../config/styles';


class LeadDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchLead(this.props.params.id);
  }

  render() {
    const { lead } = this.props;
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
            <div className="flex w-90 items-center tc" style={{ backgroundColor: Colors.white }}>
              <HalfGrid>
                <CenterThis>
                  <div className="pa4 w-100" >
                    <LeadDetailForm lead={lead} />
                  </div>
                </CenterThis>
              </HalfGrid>

              <HalfGrid>
                <CenterThis>
                  <div className="pa4" >
                    <LeadGroupForm lead={lead} />
                  </div>
                </CenterThis>
              </HalfGrid>
            </div>
          </CenterThis>

        </div>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ LeadsAddReducer }) => {
  const { lead } = LeadsAddReducer;
  return {
    lead
  };
};

export default connect(mapStateToProps, {
  fetchLead
})(LeadDetailView);
