import { FC, MouseEvent, useState } from 'react';
import Input from 'components/formElements/input';
import { cardNamePattern } from 'utils/validation';
import CardName from 'assets/svg/fi-rr-user.svg';
import Visa from 'assets/svg/Group 39654.svg';
import Master from 'assets/svg/Group 39655.svg';
import Amex from 'assets/svg/Group 39656.svg';
import Card from 'assets/svg/Vector (6).svg';
import DateIcon from 'assets/svg/Vector (7).svg';
import Code from 'assets/svg/Vector (8).svg';
import './creditcard.scss';

import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { detectCardType } from 'helper/carddDetectType';
import { CardNameValues } from 'helper/input';

type CreditCardProps = {
	register: any;
	errors: any;
};

const CreditCard: FC<CreditCardProps> = ({ register, errors }): JSX.Element => {
	const [cardValue, setCardValue] = useState<string>('');
	const [errorCardValue, setErrorCardValue] = useState<string>('');
	const [cardNameValue, setCardNameValue] = useState<string>('');

	const cardValues = (e: any): void => {
		const { error } = e;
		setErrorCardValue(error?.code);
		setCardValue(e);
	};
	const cardNameValues = (e: MouseEvent<HTMLElement>): void => setCardNameValue(CardNameValues(e));

	const cardElementOptions = {
		style: {
			base: {
				backgroundColor: '#FFFFFF',
				border: '1px solid #EBECF3',
				borderRadius: '12px',
				fontWeight: 500,
				fontSize: '16px',
				lineHeight: '20px',
				color: '#979AB8',
				padding: '13px 0px 13px 55px',
				'::placeholder': {
					color: '#979ab8',
					fontWeight: 500,
					fontSize: '16px',
					lineHeight: '20px',
				},
			},
		},
	};

	return (
		<div className='cards'>
			<div className='card__header'>
				<div className='card__header-lefth'>
					<h4>Credit card</h4>
				</div>
				<div className='card__header-rigth'>
					<img src={Master} alt='master' />
					<img src={Visa} alt='visa' />
					<img src={Amex} alt='amex' />
				</div>
			</div>
			<div className='card__content'>
				<div className='card__content-number'>
					{detectCardType(cardValue) ? detectCardType(cardValue) : <img src={Card} alt='card' />}
					<CardNumberElement onChange={cardValues} options={cardElementOptions} />
				</div>
				{errorCardValue === 'invalid_number' && (
					<p className='input-error-text-mod'>Enter a valid Card number</p>
				)}
				<div className='card__content-name'>
					<img src={CardName} alt='cardName' />
					<Input
						type='text'
						placeholder='Name on the card'
						register={register}
						name='cardname'
						errors={errors}
						require={true}
						value={cardNameValue}
						OnChange={cardNameValues}
						pathern={cardNamePattern}
					/>
				</div>
				<div className='card__content-datecode'>
					<div className='card__content-date'>
						<img src={DateIcon} alt='date' />
						<CardExpiryElement onChange={cardValues} options={cardElementOptions} />
						{errorCardValue === 'invalid_expiry_year_past' && (
							<p className='input-error-text-date'>Enter a valid Card number</p>
						)}
					</div>

					<div className='card__content-code'>
						<img src={Code} alt='code' />
						<CardCvcElement onChange={cardValues} options={cardElementOptions} />
						{errorCardValue === 'incomplete_cvc' && (
							<p className='input-error-text-date'>Enter a valid Card number</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreditCard;

