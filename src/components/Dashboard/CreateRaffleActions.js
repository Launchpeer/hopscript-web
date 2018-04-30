import Parse from 'parse';
import moment from 'moment';
import {
  RAFFLE_LOAD_END,
  RAFFLE_CREATE_ERROR,
  RAFFLE_CLEAR_ERROR,
  RAFFLE_LOADING,
  RAFFLE_CLEAR_FIELDS,
  RAFFLE_LIST,
} from './CreateRaffleTypes';

const createRaffleError = error => ({
  type: RAFFLE_CREATE_ERROR,
  payload: error
});

const clearError = () => ({
  type: RAFFLE_CLEAR_ERROR
});

const clearFields = () => ({
  type: RAFFLE_CLEAR_FIELDS
});

const raffleLoading = () => ({
  type: RAFFLE_LOADING
});

const raffleLoadEnd = () => ({
  type: RAFFLE_LOAD_END
});

function _reconcileRaffleToDB(fields) {
  return new Promise((resolve) => {
    const currentUser = Parse.User.current();
    const RaffleObj = Parse.Object.extend('Raffle');
    const Raffle = new RaffleObj();
    if (fields.beneficiaryLogo && fields.beneficiaryLogo[0]) {
      const parseFile = new Parse.File('image', fields.beneficiaryLogo[0]);
      parseFile.save();
      Raffle.set("beneficiaryLogo", parseFile);
    }
    Raffle.set("eventName", fields.eventName);
    Raffle.set("admin", currentUser);
    Raffle.set("beneficiaryName", fields.beneficiaryName);
    Raffle.set("startTime", fields.startTime);
    Raffle.set("endTime", fields.endTime);
    Raffle.set("location", fields.location);
    Raffle.set("coordinates", fields.coordinates);
    Raffle.set("rate1Ticket", fields.rate1Ticket);
    Raffle.set("rate5Ticket", fields.rate5Ticket);
    Raffle.set("rate10Ticket", fields.rate10Ticket);
    Raffle.set("rate15Ticket", fields.rate15Ticket);
    Raffle.set("rate20Ticket", fields.rate20Ticket);
    Raffle.set("rate25Ticket", fields.rate25Ticket);
    return resolve(Raffle.save());
  });
}

function _reconcileRaffleToSchool(raffle) {
  return new Promise((resolve) => {
    const School = Parse.User.current();
    School.addUnique("events", raffle);
    return resolve(School.save());
  });
}

function _fetchAndSortRaffles() {
  return new Promise((resolve) => {
    const currentDate = moment().valueOf();
    Parse.Cloud.run("fetchFilterAdminRaffles", { currentDate }).then((raffles) => {
      resolve(raffles);
    }).catch((err) => { console.log(err); });
  });
}

const fetchRaffleList = () => (dispatch) => {
  dispatch(raffleLoading());
  _fetchAndSortRaffles()
    .then((filteredRaffles) => {
      dispatch(raffleLoadEnd());
      dispatch({
        type: RAFFLE_LIST,
        payload: filteredRaffles
      });
    })
    .catch((raffleErr) => {
      console.log('fetchRaffleErr', raffleErr);
    });
};


const createRaffle = fields => (dispatch) => {
  dispatch(raffleLoading());
  _reconcileRaffleToDB(fields)
    .then((raffle) => {
      _reconcileRaffleToSchool(raffle)
        .then(() => {
          dispatch(clearFields());
          _fetchAndSortRaffles()
            .then((filteredRaffles) => {
              dispatch(raffleLoadEnd());
              dispatch({
                type: RAFFLE_LIST,
                payload: filteredRaffles
              });
            })
            .catch((raffleErr) => {
              console.log('RAFFLE ERR', raffleErr);
            });
        })
        .catch((raffleToSchoolErr) => {
          console.log('raffletoSchool ERR:', raffleToSchoolErr);
          dispatch(createRaffleError(raffleToSchoolErr));
        });
    })
    .catch((createRaffleErr) => {
      console.log('createraffle ERR:', createRaffleErr);
      dispatch(createRaffleError(createRaffleErr));
    });
};

const sortByDate = (a, b) => {
  if (a.attributes.startTime < b.attributes.startTime) { return -1; }
  if (a.attributes.startTime > b.attributes.startTime) { return 1; }
  return 0;
};

export { fetchRaffleList, createRaffle };
