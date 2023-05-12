import { FC, useState, MouseEvent, FormEvent } from "react";

import { CustomMask, DefaultRegex, InputNumber, CardNameValues } from "helper/input";
import { detectCardType } from "helper/carddDetectType";

import Input from "components/formElements/input";
import { cardNamePattern } from "utils/validation";

import Visa from "assets/svg/Group 39654.svg";
import Master from "assets/svg/Group 39655.svg";
import Amex from "assets/svg/Group 39656.svg";
import Card from "assets/svg/Vector (6).svg";
import CardName from "assets/svg/fi-rr-user.svg";
import DateIcon from "assets/svg/Vector (7).svg";
import Code from "assets/svg/Vector (8).svg";

import "./creditcard.scss";

type CreditCardProps = {
  register: any;
  errors: any;
};

const CreditCard: FC<CreditCardProps> = ({ register, errors }): JSX.Element => {
  const [cardValue, setCardValue] = useState<string>("");
  const [cardDataValue, setCardDataValue] = useState<string>("");
  const [cardCodeValue, setCardCodeValue] = useState<string>("");
  const [cardNameValue, setCardNameValue] = useState<string>("");

  const cardValues = (e: MouseEvent<HTMLElement>): void => setCardValue(DefaultRegex(e));
  const cardDataValues = (e: MouseEvent<HTMLElement>): void => setCardDataValue(CustomMask(e));
  const cardCodeValues = (e: FormEvent<HTMLInputElement>): void => setCardCodeValue(InputNumber(e));
  const cardNameValues = (e: MouseEvent<HTMLElement>): void => setCardNameValue(CardNameValues(e));

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
          {detectCardType(cardValue) ? detectCardType(cardValue) : <img src={Card} alt="card" />}
          <Input
            type="text"
            placeholder="Card number"
            register={register}
            name="cardnumber"
            errors={errors}
            require={true}
            value={cardValue}
            OnChange={cardValues}
            min={16}
          />
        </div>
        <div className="card__content-name">
          <img src={CardName} alt="cardName" />
          <Input
            type="text"
            placeholder="Name on the card"
            register={register}
            name="cardname"
            errors={errors}
            require={true}
            value={cardNameValue}
            OnChange={cardNameValues}
            pathern={cardNamePattern}
          />
        </div>
        <div className="card__content-datecode">
          <div className="card__content-date">
            <img src={DateIcon} alt="date" />
            <Input
              type="text"
              placeholder="Expiration date (MM/YY)"
              register={register}
              name="carddate"
              errors={errors}
              require={true}
              value={cardDataValue}
              OnChange={cardDataValues}
            />
          </div>
          <div className="card__content-code">
            <img src={Code} alt="code" />
            <Input
              type="password"
              placeholder="Security code"
              register={register}
              name="cardcode"
              errors={errors}
              require={true}
              value={cardCodeValue}
              OnInput={(e: React.FormEvent<HTMLInputElement>) => cardCodeValues(e)}
              min={3}
              max={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
