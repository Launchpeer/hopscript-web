import React from 'react';
import { Colors } from '../../config/styles';
import { CardWithLabel } from '../common';


const dollarFormatter = (d) => {
  const s = d.toString();
  return s.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const topContentTotalTickets = () => (
  <div>Total # Tickets Sold</div>
);

const topContentPayments = type => (
  <div className="flex justify-between w-100">
    <div>{type === "beneficiaryPayments" ? "Total $ Donated to Beneficiary" : "Total $ Raised"}</div>
    {type !== "beneficiaryPayments" && (<div
      className="pointer"
      style={{
          color: Colors.brandPrimary
        }}>
      <a href="https://stripe.com" style={{ textDecoration: "none", color: Colors.brandPrimary }} target="_blank" rel="noopener noreferrer">Go To Stripe</a>
    </div>)}
  </div>
);

const SessionVal = ({ raffleStats }) => (
  <div>
    {(raffleStats && raffleStats.totalTickets)
    ? raffleStats.totalTickets
    : '0'
    }
  </div>
);

const PaymentVal = ({ raffleStats }) => (
  <div>
    {(raffleStats && raffleStats.totalRaised)
    ? `$ ${dollarFormatter(raffleStats.totalRaised)}`
    : '$ 0'
    }
  </div>
);

const BeneficiaryVal = ({ raffleStats }) => (
  <div>
    {(raffleStats && raffleStats.totalBeneficiary)
    ? `$ ${dollarFormatter(raffleStats.totalBeneficiary)}`
    : '$ 0'
    }
  </div>
);

const TrainerCard = ({
  raffleStats, dataType, classOverrides
}) => (
  <div className={`${classOverrides}`}>
    <CardWithLabel
      topBackgroundColor={Colors.white}
      topFontColor={Colors.primaryDeepGray}
      topContent={dataType === 'tickets' ? topContentTotalTickets() : topContentPayments(dataType)}
      borderRadius="small"
      boxShadow
      borderColor={Colors.nearWhite}
        >
      <div className="flex items-center justify-center f2 h4 brand-primary">
        {dataType === 'payments' && (<PaymentVal raffleStats={raffleStats} />) }
        {dataType === 'tickets' && (<SessionVal raffleStats={raffleStats} />)}
        {dataType === 'beneficiaryPayments' && (<BeneficiaryVal raffleStats={raffleStats} />) }
      </div>
    </CardWithLabel>
  </div>
);

export default TrainerCard;
