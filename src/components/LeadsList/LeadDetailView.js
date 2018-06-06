import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArrowLeftCircle } from 'react-feather';
import { FullScreenContainer, CenterThis, HalfGrid } from '../common';
import { fetchLead } from '../LeadsAdd/LeadsAddActions';
import LeadDetailForm from './LeadDetailForm';
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
              <ArrowLeftCircle />
              <div className="pl3 b">{lead && lead.attributes.name}</div>
            </div>
          </CenterThis>

          <div className="flex flex-row w-90" style={{ paddingLeft: "100px" }}>
            <HalfGrid>
              <div>poop</div>
            </HalfGrid>

            <HalfGrid>
              <CenterThis>
                <div className="w-90 flex flex-row justify-around pa4" style={{ backgroundColor: Colors.white }} >
                  <LeadDetailForm lead={lead} />
                </div>
              </CenterThis>
            </HalfGrid>
          </div>

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
