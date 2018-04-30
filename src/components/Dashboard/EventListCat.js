// TODO: filter raffles by past and current

import React from 'react';
import { connect } from 'react-redux';

import { EventListItem } from './';

const EventListCat = (props) => {
  const { raffles, title } = props.user.attributes;
  const { classOverrides } = props;
  return (
    <div className={`${classOverrides}`}>
      <div>{title}</div>
      {raffles && raffles.length > 0 &&
        raffles.map(raffle => (
          <EventListItem raffle={raffle} key={raffle.id} />
        ))
    }
    </div>
  );
};

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(EventListCat);
