import { FC } from "react";

import Input from "components/formElements/input";
import Visa from "assets/svg/Group 39654.svg";
import Master from "assets/svg/Group 39655.svg";
import Amex from "assets/svg/Group 39656.svg";
import Card from "assets/svg/Vector (6).svg";
import CardName from "assets/svg/fi-rr-user.svg";
import DateIcon from "assets/svg/Vector (7).svg";
import Code from "assets/svg/Vector (8).svg";

import "./creditcard.scss";

type CreditCardProps = {
  register: any; // or use a specific type based on your register function
  errors: any;
};

const CreditCard: FC<CreditCardProps> = ({ register, errors }): JSX.Element => {
  return (
    <div className="cards">
      <div className="card__header">
        <div className="card__header-lefth">
          <h4>Credit card</h4>
        </div>
        <div className="card__header-rigth">
          <img src={Master} alt="master" />
          <img src={Visa} alt="visa" />
          <img src={Amex} alt="amex" />
        </div>
      </div>
      <div className="card__content">
        <div className="card__content-number">
          <img src={Card} alt="card" />
          <Input type="text" placeholder="Card number" register={register} name="cardnumber" errors={errors} />
        </div>
        <div className="card__content-name">
          <img src={CardName} alt="cardName" />
          <Input type="text" placeholder="Name on the card" register={register} name="cardname" errors={errors} />
        </div>
        <div className="card__content-datecode">
          <div className="card__content-date">
            <img src={DateIcon} alt="date" />
            <Input type="text" placeholder="Expiration date (MM/YY)" register={register} name="carddate" errors={errors} />
          </div>
          <div className="card__content-code">
            <img src={Code} alt="code" />
            <Input type="text" placeholder="Security code" register={register} name="cardcode" errors={errors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
