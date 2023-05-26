import { FC, FormEvent, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import CreditCard from 'components/creditCard';
import Buttons from 'components/formElements/button';
import Input from 'components/formElements/input';
import { getCarts } from 'services/products';
import Phone from 'assets/svg/fi-rr-phone-call.svg';
import User from 'assets/svg/fi-rr-user.svg';
import Vector from 'assets/svg/Vector (1).svg';
import Address from 'assets/svg/Vector (2).svg';
import Org from 'assets/svg/Vector (3).svg';
import './payments.scss';

import {
	CardNumberElement,
	PaymentRequestButtonElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { FormData } from '@types';
import { countries } from 'config/config';
import { THANK_YOU } from 'constant';
import { useExpensesData } from 'context';
import { useReactQuery } from 'hook/useQuery';

const Payments: FC = (): JSX.Element => {
	const [option, setOption] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [paymentRequest, setPaymentRequest] = useState(null);
	const { data: cart } = useReactQuery(() => getCarts(), 'carts');
	const { setAlert }: any = useExpensesData();
	const { state } = useLocation();
	const navigate = useNavigate();

	const stripe: any = useStripe();
	const elements = useElements();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const total: any = cart
		?.map((e: any) => {
			if (+e?.count > 0) {
				const price = e?.price?.slice(1);
				const mutationPrice = +price * e?.count;
				return mutationPrice;
			}
			return 0;
		})
		?.reduce((a: number, b: number) => a + b, 0);

	useEffect(() => {
		if (stripe) {
			const pr = stripe.paymentRequest({
				country: 'US',
				currency: 'usd',
				total: {
					label: 'Demo total',
					amount: total ? total : 111111,
				},
				disableWallets: ['link'],
				requestPayerName: true,
				// requestPayerName: true,
				// requestPayerEmail: true,
			});

			pr.canMakePayment()
				.then((result: any) => {
					if (result) {
						setPaymentRequest(pr);
					}
				})
				.catch(console.error);
		}
	}, [stripe]);

	useEffect(() => {
		if (!state) {
			navigate('/');
		}
	}, []);

	const intentRequst = (): void => {
		fetch('http://localhost:5001/intentd', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ amount: total ? total : 111111 }),
		})
			.then(r => r.json())
			.then(response => {
				paymentRequst(response?.client_secret?.id);
			})
			.catch(e => console.log(e));
	};
	const paymentRequst = async (id: string): Promise<void> => {
		try {
			const cardElement = elements?.getElement(CardNumberElement);
			const { paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: cardElement,
			});
			fetch(`https://api.stripe.com/v1/payment_intents/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
					Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
				},
				body: `payment_method=${paymentMethod?.id}`,
			})
				.then(r => r.json())
				.then(updatedPaymentIntent => {
					setAlert(true);
					setLoading(false);
					paymentConfirm(updatedPaymentIntent);
				})
				.catch(e => {
					setAlert('error');
					setLoading(false);
				});
		} catch (e) {
			console.log(e, 'error');
		}
	};
	const paymentConfirm = async (updatedPaymentIntent: any) => {
		try {
			stripe.confirmPayment({
				clientSecret: updatedPaymentIntent.client_secret,
				confirmParams: {
					// return_url: `http://localhost:3000/${THANK_YOU}`,
				},
			});
			navigate(`/${THANK_YOU}`, { state: 'tankyou' });
		} catch {
			console.log('error');
		}
	};

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		intentRequst();
		// fetch('/webhook', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		/* payload data */
		// 	}),
		// })
		// 	.then(response => {
		// 		if (response.ok) {
		// 			console.log('Webhook request successful');
		// 		} else {
		// 			console.error('Webhook request failed');
		// 		}
		// 	})
		// 	.catch(error => {
		// 		console.error('error');
		// 	});
	};

	const openOption = (e: FormEvent<HTMLInputElement>): void => {
		const target = e.target as HTMLInputElement;
		const id = target.id;
		id === 'top' ? setOption(false) : setOption(true);
	};

	return (
		<>
			<div className='payments'>
				{paymentRequest ? (
					<PaymentRequestButtonElement options={{ paymentRequest }} />
				) : (
					<form className='payments-form' onSubmit={handleSubmit(onSubmit)}>
						<div className='payments-method'>
							<div className='payments-method__title'>
								<h3>Payment Method</h3>
								<p>Enter your card information to make the payment securely.</p>
								<CreditCard register={register} errors={errors} />
							</div>
						</div>
						<div className='payments-address'>
							<div className='payments-address-lefth'>
								<input type='checkbox' {...register('chekbox', { required: true })} />
							</div>
							<div className='payments-address-rigth'>
								<p>
									By checking this box, I acknowledge that I have read and agree to the{' '}
									<span>Terms of Service</span>, and <span>Monthly Billing Terms</span> of this
									website and want to opt-in for the monthly billed Dream Collection Club®
								</p>
							</div>
						</div>
						<div className='payments-billing'>
							<div className='payments-billing__title'>
								<h3>Billing address</h3>
								<p>Select the address that matches your card or payment method.</p>
							</div>
							<div className='payments-billing-topaddress'>
								<input
									{...register('radiotop')}
									type='radio'
									name='1'
									id='top'
									onClick={openOption}
								/>
								<label>Same as shipping address</label>
							</div>

							<>
								<div
									className={
										option
											? 'payments-billing-bottomaddress bottomaddress--mod'
											: 'payments-billing-bottomaddress'
									}
								>
									<input
										{...register('radiobottom')}
										type='radio'
										name='1'
										id='bottom'
										onClick={openOption}
									/>
									<label>Use a different billing address</label>
								</div>
								<div
									className={option ? 'bottomaddress__option option--mod' : 'bottomaddress__option'}
								>
									<div className='bottomaddress__option-country'>
										<img src={Vector} alt='vector' />
										<Form.Select {...register('country')} defaultValue=''>
											<option value='' disabled>
												Select a Country
											</option>
											{countries.map(({ label }, i) => (
												<option key={i} value={label}>
													{label}
												</option>
											))}
										</Form.Select>
										{errors?.country && (
											<p className='error__text'>Enter a valid country address</p>
										)}
									</div>
									<div className='bottomaddress__option-firstlast'>
										<div className='bottomaddress__option-firstname'>
											<img src={User} alt='User' />
											<Input
												type='text'
												placeholder='First Name'
												register={register}
												name='firstname'
												errors={errors}
											/>
										</div>
										<div className='bottomaddress__option-lastname'>
											<img src={User} alt='User' />
											<Input
												type='text'
												placeholder='First Name'
												register={register}
												name='lastname'
												errors={errors}
											/>
										</div>
									</div>
									<div className='bottomaddress__option-address'>
										<img src={Address} alt='address' />
										<Input
											type='text'
											placeholder='Address'
											register={register}
											name='address'
											errors={errors}
										/>
									</div>
									<div className='bottomaddress__option-apartament'>
										<img src={Org} alt='org' />
										<Input
											type='text'
											placeholder='Aparment, suit, etc (Optional)'
											register={register}
											name='org'
											errors={errors}
										/>
									</div>
									<div className='bottomaddress__option-citycode'>
										<div className='bottomaddress__option-city'>
											<Form.Select
												aria-label='Default select example'
												{...register('city')}
												defaultValue=''
											>
												<option value='' disabled>
													City
												</option>
												<option value='1'>One</option>
												<option value='2'>Two</option>
												<option value='3'>Three</option>
											</Form.Select>
										</div>
										<div className='bottomaddress__option-code'>
											<Input
												type='text'
												placeholder='Zip Code'
												register={register}
												name='code'
												errors={errors}
											/>
										</div>
									</div>
									<div className='bottomaddress__option-phone'>
										<img src={Phone} alt='phone' />
										<Input
											type='text'
											placeholder='Phone Number ( for shipping updates & orders )'
											register={register}
											name='phone'
											errors={errors}
										/>
									</div>
								</div>
							</>
						</div>
						<Buttons
							type='submit'
							imgs
							name='Validate the order'
							load={loading}
							disable={loading ? true : false}
						/>
					</form>
				)}
			</div>
		</>
	);
};

export default Payments;
