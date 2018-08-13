import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { CenterThis, Button, HalfGrid, InputText, RenderAlert } from '../../common';
import { LeadGroupAddForm, LeadGroupLeadsList } from './';
import { createLeadGroup, clearError, fetchLeads } from '../LeadsActions';
import { Colors, BorderRadius } from '../../../config/styles';
import { LeadNavCard } from '../';

const NoLeadsView = () => (
  <div className="mt6 tc f4 pa3 silver">
    <div className="mb6">
    You currently do not have any Leads. <br />
  You must create a Lead before you can create you first Lead Group. <br />
"Add New Lead" to get started!
    </div>
  </div>);


class LeadGroupAddView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    const { leadsToAdd } = this.props;
    const leadsToAddId = leadsToAdd.map(lead => lead.id);
    this.props.createLeadGroup(data, leadsToAddId);
    browserHistory.push('/lead-groups-list');
  }

  componentWillMount() {
    this.props.fetchLeads();
  }

  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const {
      leadsToAdd, handleSubmit, location, leads, error
    } = this.props;
    return (
      <LeadNavCard location={location}>
        {leads && leads.length > 0 ?
          <div className="w-100 flex flex-column">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="flex flex-row mv3 w-100 pl4">
                <div className="b mr3 mv3">Lead Group Name</div>
                <div className="w-40">
                  <InputText
                    name="groupName"
                    type="text"
                    placeholder="Enter Lead Group Name"
                    borderColor="lightGray" />
                </div>
              </div>

              <div className="flex flex-row">
                <HalfGrid>
                  <CenterThis>
                    <div className="pa4 w-100" >
                      <div className="b mb3">All Leads</div>
                      <div className="ba pa3 overflow-x-auto vh-50" style={{ borderColor: Colors.lightGray, borderRadius: BorderRadius.all }}>
                        <LeadGroupLeadsList />
                      </div>
                    </div>
                  </CenterThis>
                </HalfGrid>

                <HalfGrid>
                  <CenterThis>
                    <div className="pa4 w-100" >
                      <div className="b mb3">Leads In Group</div>
                      <div className="ba pa3" style={{ borderColor: Colors.lightGray, borderRadius: BorderRadius.all }}>
                        {leadsToAdd ? <LeadGroupAddForm leadsToAdd={leadsToAdd} /> : <div>You have not added any leads to the group.</div>}
                      </div>
                    </div>
                  </CenterThis>
                </HalfGrid>
              </div>

              <div className="w-100 flex items-end flex-column">
                <div className="flex flex-row">
                  <Button classOverrides="f5 ph5 mh2 b"
                    borderColor={Colors.brandGreen}
                    borderRadius="4px"
                    borderWidth="1px"
                    fontColor={Colors.brandGreen}
                    onClick={() => browserHistory.push('/lead-groups-list')}>
                Cancel
                  </Button>


                  {leadsToAdd.length > 0 &&
                  <Button borderRadius="4px"
                    backgroundColor={Colors.brandGreen}
                    classOverrides="f5 ph5 mh2">
                  Save
                  </Button>
                  }

                  {leadsToAdd.length === 0 &&
                  <Button borderRadius="4px"
                    backgroundColor={Colors.brandGreen}
                    classOverrides="f5 ph5 mh2"
                    onClick={(e) => { e.preventDefault(); this.setState({ showError: true }); }}>
                  Save
                  </Button>
                  }

                </div>
                {this.state.showError &&
                  <div className="pa2">
                    <RenderAlert error={{ message: "You must include a group name and at least one lead to save a lead group." }} />
                  </div>
                }
              </div>
            </form>
          </div>
        : <NoLeadsView /> }

      </LeadNavCard>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const {
    loading, leadsToAdd, leads
  } = LeadsReducer;
  return {
    loading,
    leadsToAdd,
    leads
  };
};

function validate(values) {
  const errors = {};
  if (!values.groupName) {
    errors._error = 'Missing lead group name';
  }
  return errors;
}

export default reduxForm({
  form: 'createLeadGroup',
  validate
})(connect(mapStateToProps, {
  createLeadGroup,
  fetchLeads,
  clearError
})(LeadGroupAddView));
