// TODO: tie into user's active raffles

import React from 'react';
import { Colors } from '../../config/styles';
import { CardWithLabel } from '../common';
import { ActiveRaffleListItem } from './';

const ActiveRaffleCard = ({
  classOverrides, raffles
}) => (
  <div className={`${classOverrides}`}
    style={{
      width: '450px',
      height: '450px'
    }}>
    <CardWithLabel
      topBackgroundColor={Colors.white}
      topFontColor={Colors.brandDeepGray}
      topContent="Active Raffles"
      borderRadius="small"
      boxShadow
      classOverrides="pb4"
      borderColor={Colors.nearWhite}
      childrenOverrides="h5 overflow-scroll"
      topContentClassOverrides="b"
    >
      {raffles && raffles.length > 0 ?
        (raffles.map(raffle => (<ActiveRaffleListItem raffle={raffle} />))) :
        <div className="moon-gray">No active raffles</div>}
    </CardWithLabel>
  </div>
);

export default ActiveRaffleCard;
