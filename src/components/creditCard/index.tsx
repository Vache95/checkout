import { FC, useState, MouseEvent} from "react";

import { CardNameValues } from "helper/input";
import { detectCardType } from "helper/carddDetectType";

import Input from "components/formElements/input";
import { cardNamePattern } from "utils/validation";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
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
  control?: any;
};

const CreditCard: FC<CreditCardProps> = ({ register, errors, control }): JSX.Element => {
  const [cardValue, setCardValue] = useState<string>("");
  const [errorCardValue, setErrorCardValue] = useState<string>("");
  const [cardNameValue, setCardNameValue] = useState<string>("");
  const cardValues = (e: any): void => {
    const { error } = e;
    setErrorCardValue(error?.code);
    setCardValue(e);
    console.log(error);
  };
  const cardNameValues = (e: MouseEvent<HTMLElement>): void => setCardNameValue(CardNameValues(e));

  const cardElementOptions = {
    style: {
      base: {
        backgroundColor: "#FFFFFF",
        border: "1px solid #EBECF3",
        borderRadius: "12px",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        color: "#979AB8",
        padding: "13px 0px 13px 55px",
        "::placeholder": {
          color: "#979ab8",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "20px",
        },
      },
    },
  };

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
          <CardNumberElement onChange={cardValues} options={cardElementOptions} />
        </div>
        {errorCardValue === "invalid_number" && <p className="input-error-text-mod">Enter a valid Card number</p>}
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
            <CardExpiryElement onChange={cardValues} options={cardElementOptions} />
            {errorCardValue === "invalid_expiry_year_past" && <p className="input-error-text-date">Enter a valid Card number</p>}
          </div>

          <div className="card__content-code">
            <img src={Code} alt="code" />
            <CardCvcElement onChange={cardValues} options={cardElementOptions} />
            {errorCardValue === "incomplete_cvc" && <p className="input-error-text-date">Enter a valid Card number</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;

// import { FC, useState, MouseEvent, FormEvent } from 'react';

// import { CustomMask, DefaultRegex, InputNumber, CardNameValues } from 'helper/input';
// import { detectCardType } from 'helper/carddDetectType';

// import Input from 'components/formElements/input';
// import { cardNamePattern } from 'utils/validation';
// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useElements,
// } from '@stripe/react-stripe-js';
// import { Controller } from 'react-hook-form';
// import Visa from 'assets/svg/Group 39654.svg';
// import Master from 'assets/svg/Group 39655.svg';
// import Amex from 'assets/svg/Group 39656.svg';
// import Card from 'assets/svg/Vector (6).svg';
// import CardName from 'assets/svg/fi-rr-user.svg';
// import DateIcon from 'assets/svg/Vector (7).svg';
// import Code from 'assets/svg/Vector (8).svg';

// import './creditcard.scss';

// type CreditCardProps = {
//   register: any;
//   errors: any;
//   control?: any;
// };

// const CreditCard: FC<CreditCardProps> = ({ register, errors, control }): JSX.Element => {
//   const elements = useElements();
//   const [cardValue, setCardValue] = useState<string>('');
//   const [cardDataValue, setCardDataValue] = useState<string>('');
//   const [cardCodeValue, setCardCodeValue] = useState<string>('');
//   const [cardNameValue, setCardNameValue] = useState<string>('');

//   const cardValues = (e: MouseEvent<HTMLElement>): void => setCardValue(DefaultRegex(e));
//   const cardDataValues = (e: MouseEvent<HTMLElement>): void => setCardDataValue(CustomMask(e));
//   const cardCodeValues = (e: FormEvent<HTMLInputElement>): void => setCardCodeValue(InputNumber(e));
//   const cardNameValues = (e: MouseEvent<HTMLElement>): void => setCardNameValue(CardNameValues(e));
//   const cardNumberElementOptions = {
//     style: {
//       base: {
//         backgroundColor: '#FFFFFF',
//         border: '1px solid #EBECF3',
//         borderRadius: '12px',
//         fontWeight: 500,
//         fontSize: '16px',
//         lineHeight: '20px',
//         color: '#979AB8',
//         padding: '13px 0px 13px 55px',
//       },
//     },
//   };

//   return (
//     <div className="cards">
//       <div className="card__header">
//         <div className="card__header-lefth">
//           <h4>Credit card</h4>
//         </div>
//         <div className="card__header-rigth">
//           <img src={Master} alt="master" />
//           <img src={Visa} alt="visa" />
//           <img src={Amex} alt="amex" />
//         </div>
//       </div>
//       <div className="card__content">
//         <div className="card__content-number">
//           {/* {detectCardType(cardValue) ? detectCardType(cardValue) : <img src={Card} alt="card" />}
//           <Input
//             type="text"
//             placeholder="Card number"
//             register={register}
//             name="cardnumber"
//             errors={errors}
//             require={true}
//             value={cardValue}
//             OnChange={cardValues}
//             min={16}
//           /> */}
//           {/* <CardNumberElement options={cardNumberElementOptions} {...register('card')} /> */}
//           <Controller
//             control={control}
//             name="cardNumber"
//             render={({ field }) => (
//               <CardNumberElement options={cardNumberElementOptions} {...field} />
//             )}
//           />
//         </div>
//         <div className="card__content-name">
//           <img src={CardName} alt="cardName" />
//           <Input
//             type="text"
//             placeholder="Name on the card"
//             register={register}
//             name="cardname"
//             errors={errors}
//             require={true}
//             value={cardNameValue}
//             OnChange={cardNameValues}
//             pathern={cardNamePattern}
//           />
//         </div>
//         <div className="card__content-datecode">
//           <div className="card__content-date">
//             {/* <img src={DateIcon} alt="date" />
//             <Input
//               type="text"
//               placeholder="Expiration date (MM/YY)"
//               register={register}
//               name="carddate"
//               errors={errors}
//               require={true}
//               value={cardDataValue}
//               OnChange={cardDataValues}
//             /> */}
//             <Controller
//               control={control}
//               name="expiryDate"
//               render={({ field }) => <CardExpiryElement {...field} />}
//             />
//           </div>
//           <div className="card__content-code">
//             {/* <img src={Code} alt="code" />
//             <Input
//               type="password"
//               placeholder="Security code"
//               register={register}
//               name="cardcode"
//               errors={errors}
//               require={true}
//               value={cardCodeValue}
//               OnInput={(e: React.FormEvent<HTMLInputElement>) => cardCodeValues(e)}
//               min={3}
//               max={3}
//             /> */}
//             <Controller
//               control={control}
//               name="cvc"
//               render={({ field }) => <CardCvcElement {...field} />}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreditCard;
