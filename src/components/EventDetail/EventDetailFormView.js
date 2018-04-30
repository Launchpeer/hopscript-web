import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Parse from 'parse';
import moment from 'moment';

import { Colors } from '../../config/styles';
import {
  Button, RenderAlert, EditInput, HalfGrid, CenterThis, TwoColumnRows, LoaderOrThis, RoundPhoto, MCInput, GoogleAutocomplete,
  DatetimePicker
} from '../common';
import { updateRaffle, deleteRaffle } from './EventDetailActions';

const ticketNums = [1, 5, 10, 20, 25];

class EventDetailFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoDragging: false,
      editText: true
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.resetPhoto = this.resetPhoto.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.deleteRaffle = this.deleteRaffle.bind(this);
  }
  deleteRaffle() {
    if (this.props.currentEvent) {
      this.props.deleteRaffle(this.props.currentEvent.id);
    }
  }
  resetPhoto() {
    this.setState({ editText: false });
  }
  onDrop(files) {
    if (files && files[0]) {
      const uploadedFile = files[0];
      const parseFile = new Parse.File('image', uploadedFile);
      parseFile.save();
      this.props.updateRaffle({ beneficiaryLogo: parseFile }, this.props.currentEvent);
      this.setState({ photoDragging: false });
    } else {
      this.setState({ photoDragging: false });
    }
  }
  handleFormSubmit(values) {
    if (values.location) {
      const formattedAddress = {
        lat: '',
        lng: '',
        location: values.location
      };
      geocodeByAddress(values.location)
        .then(results => getLatLng(results[0]))
        .then((latLng) => {
          const coordinates = new Parse.GeoPoint({ latitude: latLng.lat, longitude: latLng.lng });
          formattedAddress.lat = latLng.lat;
          formattedAddress.lng = latLng.lng;
          this.props.updateRaffle({
            coordinates,
            location: formattedAddress,
          }, this.props.currentEvent);
        });
    } else if (values.startTime) {
      this.props.updateRaffle({ startTime: moment(values.startTime._d).valueOf() }, this.props.currentEvent);
    } else if (values.endTime) {
      this.props.updateRaffle({ endTime: moment(values.endTime._d).valueOf() }, this.props.currentEvent);
    } else {
      this.props.updateRaffle(values, this.props.currentEvent);
    }
  }
  renderProfileImage() {
    const { currentEvent } = this.props;
    const { attributes } = currentEvent;
    const noEdit = attributes && (attributes.totalTickets || moment(currentEvent.attributes.startTime) < new Date());
    if (attributes && attributes.beneficiaryLogo && (this.state.editText || noEdit)) {
      return (
        <RoundPhoto
          backgroundImage={`url(${attributes.beneficiaryLogo._url})`}
          editImage={this.resetPhoto}
          editText={this.state.editText && !noEdit} />
      );
    } return (
      <MCInput
        name="beneficiaryLogo"
        type="photo"
        pictureType="Beneficiary Logo"
        editType="icon"
        editText={this.state.editText}
        onDrop={this.onDrop}
        resetPhoto={this.resetPhoto}
        dropClass={this.state.photoDragging === true ? "bg-brand-primary" : "bg-moon-grey"}
        onDragOver={() => this.setState({ photoDragging: true })}
        onDragLeave={() => this.setState({ photoDragging: false })}
        noEdit={noEdit} />
    );
  }
  render() {
    const {
      handleSubmit, error, currentEvent, loading
    } = this.props;
    const ticketValues = currentEvent && currentEvent.attributes ? {
      rate1Ticket: currentEvent.attributes.rate1Ticket,
      rate5Ticket: currentEvent.attributes.rate5Ticket,
      rate10Ticket: currentEvent.attributes.rate10Ticket,
      rate20Ticket: currentEvent.attributes.rate20Ticket,
      rate25Ticket: currentEvent.attributes.rate25Ticket,
    } : {};
    const { attributes } = currentEvent;
    const noEdit = attributes && (attributes.totalTickets || moment(currentEvent.attributes.startTime) < new Date());
    return (
      <form className="pa3 pl5-ns pr2-ns ">
        <LoaderOrThis loading={loading}>
          <div className="pt4">
            <EditInput
              name="eventName"
              type="text"
              label="Event Name"
              noEdit={noEdit}
              placeholder={attributes ? attributes.eventName : ""}
              onSubmit={handleSubmit(this.handleFormSubmit)}
              borderColor={Colors.moonGray}
            />
            <CenterThis>
              {this.renderProfileImage()}
            </CenterThis>
            <CenterThis>
              <div className="brand-primary mt2">Beneficiary Logo</div>
            </CenterThis>
            <EditInput
              name="beneficiaryName"
              type="text"
              label="Beneficiary Name"
              placeholder={attributes ? attributes.beneficiaryName : ""}
              onSubmit={handleSubmit(this.handleFormSubmit)}
              borderColor={Colors.moonGray}
              noEdit={noEdit}
            />
            <EditInput
              name="location"
              type="address"
              label="Address"
              component={GoogleAutocomplete}
              placeholder={attributes && attributes.location ? attributes.location.location : ""}
              onSubmit={handleSubmit(this.handleFormSubmit)}
              borderColor={Colors.moonGray}
              noEdit={noEdit}
            />
            <HalfGrid>
              <EditInput
                name="startTime"
                type="datetime"
                label="Start"
                component={DatetimePicker}
                placeholder={attributes ? moment(attributes.startTime).format('MM/DD/YYYY hh:mm A') : ""}
                onSubmit={handleSubmit(this.handleFormSubmit)}
                borderColor={Colors.moonGray}
                noEdit={noEdit}
            />
            </HalfGrid>
            <HalfGrid>
              <EditInput
                name="endTime"
                type="datetime"
                label="End"
                component={DatetimePicker}
                placeholder={attributes ? moment(attributes.endTime).format('MM/DD/YYYY hh:mm A') : ""}
                onSubmit={handleSubmit(this.handleFormSubmit)}
                borderColor={Colors.moonGray}
                noEdit={noEdit}
              />
            </HalfGrid>
            <div className="pa2">
              <TwoColumnRows
                ticketNums={ticketNums}
                initialValues={ticketValues}
                leftLabel="# of Tickets"
                rightLabel="Rate"
                edit
                ticketSubmit={handleSubmit(this.handleFormSubmit)}
                noEdit={noEdit} />
            </div>
            {(this.props.anyTouched && this.props.invalid) &&
              <div className="mb4">
                <RenderAlert error={{ message: '*All Fields Required' }} />
              </div>
            }
            <RenderAlert error={error} classOverrides="mb4" />
          </div>
          {!noEdit && (
          <div className="w-100 pa2 bt b--silver">
            <Button
              classOverrides="w-100"
              type="button"
              onClick={this.deleteRaffle}
              backgroundColor="darkRed">Delete Raffle
            </Button>
          </div>
        )}
        </LoaderOrThis>
      </form>
    );
  }
}

const selector = formValueSelector('updateRaffle');

const mapStateToProps = (state) => {
  const { user } = state.UserReducer;
  const { currentRaffle } = state.CreateRaffleReducer;
  const { currentEvent, loading } = state.EventDetailReducer;
  const beneficiaryLogo = selector(state, 'beneficiaryLogo');
  return {
    user,
    currentEvent,
    currentRaffle,
    loading,
    beneficiaryLogo
  };
};


export default reduxForm({
  form: 'updateRaffle'
})(connect(mapStateToProps, {
  updateRaffle,
  deleteRaffle
})(EventDetailFormView));
