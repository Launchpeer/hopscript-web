import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { FullScreenContainer, CenterThis, Button, HalfGrid, InputText } from '../../common';
import { LeadGroupAddForm, LeadGroupLeadList } from './';
import { createLeadGroup, clearError } from './LeadGroupAddActions';
import { Colors, BorderRadius } from '../../../config/styles';
import { LeadNavBar } from '../LeadsCommon';


class LeadGroupAddView extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    this.props.createLeadGroup(data);
    // browserHistory.push('/list-lead-groups');
  }

  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const { leadsToAdd, handleSubmit } = this.props;
    return (
      <FullScreenContainer classOverrides="vh-100 bg-light-gray">
        <div className="w-100" style={{ paddingLeft: "100px" }}>
          <CenterThis>
            <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
              <LeadNavBar route="/list-lead-groups" />
            </div>
          </CenterThis>
          <form>
            <CenterThis>
              <div className="flex flex-column w-90" style={{ backgroundColor: Colors.white }}>
                <div className="items-center vh-75">
                  <div className="flex flex-row items-center ml4 mt4">
                    <div className="b mr3">Lead Group Name</div>
                    <InputText
                      name="groupName"
                      type="text"
                      placeholder="Enter Lead Group Name"
                      borderColor="lightGray"
                  />
                  </div>
                  <HalfGrid>
                    <CenterThis>
                      <div className="pa4 w-100" >
                        <div className="b mb3">All Leads</div>
                        <div className="ba pa3 overflow-x-auto vh-50" style={{ borderColor: Colors.lightGray, borderRadius: BorderRadius.all }}>
                          <LeadGroupLeadList />
                        </div>
                      </div>
                    </CenterThis>
                  </HalfGrid>

                  <HalfGrid>
                    <CenterThis>
                      <div className="pa4 w-100" >
                        <div className="b mb3">Leads In Group</div>
                        <div className="ba pa3" style={{ borderColor: Colors.lightGray, borderRadius: BorderRadius.all }}>
                          <LeadGroupAddForm leadsToAdd={leadsToAdd} />
                        </div>
                      </div>
                    </CenterThis>
                  </HalfGrid>
                </div>
                <div className="pv4 pr4">
                  <Button classOverrides="fr f5 w4 pv2 mh2" borderColor={Colors.brandGreen} borderWidth="1px" backgroundColor={Colors.brandGreen} onClick={() => handleSubmit(this.handleFormSubmit)}>Save</Button>
                  <Button classOverrides="fr f5 w4 pv2 mh2" borderColor={Colors.brandGreen} borderWidth="1px" fontColor={Colors.brandGreen} onClick={() => console.log("cancel")}>Cancel</Button>
                </div>
              </div>
            </CenterThis>
          </form>
        </div>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ LeadGroupAddReducer }) => {
  const { error, loading, leadsToAdd } = LeadGroupAddReducer;
  return {
    loading,
    error,
    leadsToAdd
  };
};

function validate(values) {
  const errors = {};
  if (!values.groupName) {
    errors._error = 'All fields required';
  }

  return errors;
}

export default reduxForm({
  form: 'createLeadGroup',
  validate
})(connect(mapStateToProps, {
  createLeadGroup,
  clearError
})(LeadGroupAddView));
