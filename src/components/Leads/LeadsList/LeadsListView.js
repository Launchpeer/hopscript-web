import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullScreenContainer, CenterThis } from '../../common';
import { fetchLeads } from '../LeadsActions';
import { LeadsListItem } from './';
import { LeadNavBar } from '../LeadsCommon';
import { Colors } from '../../../config/styles';

class LeadsListView extends Component {
  constructor(props) {
    super(props);
    this.props.fetchLeads();
  }

  render() {
    const { leads } = this.props;
    return (
      <FullScreenContainer classOverrides="bg-light-gray vh-100">
        <div className="w-100" style={{ paddingLeft: "100px" }}>
          <CenterThis>
            <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
              <LeadNavBar route="/list-leads" />
            </div>
          </CenterThis>

          <CenterThis>
            <div className="w-90 vh-75 flex flex-row justify-around pa4" style={{ backgroundColor: Colors.white }} >
              <div className="w-100">
                {leads && leads.map(lead => (
                  <LeadsListItem lead={lead} key={lead.id} />))}
              </div>
            </div>
          </CenterThis>
        </div>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { leads } = LeadsReducer;
  return {
    leads
  };
};

export default connect(mapStateToProps, { fetchLeads })(LeadsListView);
