import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import moment from 'moment';
import Parse from 'parse';
import { Button, RenderAlert, MCInput, HalfGrid, CenterThis, TwoColumnRows, LoaderOrThis } from '../common';
import { createRaffle } from './CreateRaffleActions';

const ticketNums = [1, 5, 10, 20, 25];

class CreateRaffleForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleFormSubmit({
    location, start, end, ...fields
  }) {
    const formattedAddress = {
      lat: '',
      lng: '',
      location
    };
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        formattedAddress.lat = latLng.lat;
        formattedAddress.lng = latLng.lng;
        const coordinates = new Parse.GeoPoint({ latitude: latLng.lat, longitude: latLng.lng });
        this.props.createRaffle({
          location: formattedAddress,
          coordinates,
          startTime: moment(start._d).valueOf(),
          endTime: moment(end._d).valueOf(),
          ...fields
        });
        this.props.toggleModal();
      })
      .catch(error => console.error('Error', error));
  }

  render() {
    const {
      handleSubmit, error, initialValues, loading
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <LoaderOrThis loading={loading}>
          <div className="pt4 pl5 pr5 bb b--silver">
            <MCInput
              name="eventName"
              type="text"
              label="Event Name"
              placeholder="Event Name"
            />
            <CenterThis>
              <MCInput type="photo" name="beneficiaryLogo" dropClass="bg-moon-grey" />
            </CenterThis>
            <CenterThis>
              <div className="brand-primary mt2">beneficiary logo</div>
            </CenterThis>
            <MCInput
              name="beneficiaryName"
              type="text"
              label="Beneficiary Name"
              placeholder="Beneficiary Name"
            />
            <MCInput
              name="location"
              type="address"
              label="Address"
              placeholder="Address"
            />
            <HalfGrid>
              <MCInput
                name="start"
                type="datetime"
                label="start"
            />
            </HalfGrid>
            <HalfGrid>
              <MCInput
                name="end"
                type="datetime"
                label="end"
              />
            </HalfGrid>
            <div className="pa2">
              <TwoColumnRows ticketNums={ticketNums} initialValues={initialValues} leftLabel="# of Tickets" rightLabel="Rate" />
            </div>
            {(this.props.anyTouched && this.props.invalid) &&
              <div className="mb4">
                <RenderAlert error={{ message: '*All Fields Required' }} />
              </div>
            }
            <RenderAlert error={error} classOverrides="mb4" />
          </div>
          <div className="w-100 pa2">
            <Button classOverrides="w-100" backgroundColor="brandPurple">Create Raffle</Button>
          </div>
        </LoaderOrThis>
      </form>
    );
  }
}

const selector = formValueSelector('createRaffle');

const mapStateToProps = (state) => {
  const { currentRaffle, loading } = state.CreateRaffleReducer;
  const beneficiaryLogo = selector(state, 'beneficiaryLogo');
  return {
    currentRaffle,
    loading,
    initialValues: currentRaffle || {},
    beneficiaryLogo
  };
};

function validate(values) {
  const errors = {};
  if (!values.eventName || !values.location || !values.rate1Ticket || !values.rate5Ticket || !values.rate10Ticket || !values.rate20Ticket || !values.rate25Ticket) {
    errors._error = '*All Fields Required';
  }
  return errors;
}

export default reduxForm({
  form: 'createRaffle',
  validate
})(connect(mapStateToProps, {
  createRaffle
})(CreateRaffleForm));
