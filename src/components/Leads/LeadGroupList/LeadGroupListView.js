import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { FullScreenContainer, CenterThis, Button } from '../../common';
import { LeadNavBar } from '../LeadsCommon';
import { LeadGroupListItem } from './';
import { fetchLeadGroups } from '../LeadsActions';
import { Colors } from '../../../config/styles';

class LeadGroupListView extends Component {
  componentWillMount() {
    this.props.fetchLeadGroups();
  }

  render() {
    const { leadGroups } = this.props;
    return (
      <FullScreenContainer classOverrides="vh-100 bg-light-gray">
        <div className="w-100" style={{ paddingLeft: "100px" }}>
          <div className="w-100">
            <CenterThis>
              <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
                <LeadNavBar route="/list-lead-groups" />
              </div>
            </CenterThis>

            <CenterThis>
              <div className="w-90 flex flex-column pa4" style={{ backgroundColor: Colors.white }} >
                {leadGroups &&
                  leadGroups.map(group => (
                    <LeadGroupListItem leadGroup={group} key={group.id} />
                  ))}
                <div className="pv4">
                  <Button classOverrides="fr f5 ph4" backgroundColor={Colors.brandGreen} onClick={() => browserHistory.push('/add-lead-group')}>
                      New Lead Group
                  </Button>
                </div>
              </div>
            </CenterThis>
          </div>
        </div>
      </FullScreenContainer>

    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const { leadGroups } = LeadsReducer;
  return {
    leadGroups
  };
};

export default connect(mapStateToProps, { fetchLeadGroups })(LeadGroupListView);
