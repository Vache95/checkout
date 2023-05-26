import { FC, useState } from 'react';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { InititalOptions, PayPalStayl } from '@types';

type PaypalProps = {
	price: number;
};

const PayPalPayment: FC<PaypalProps> = ({ price }): JSX.Element => {
	const [paidFor, setPaidFor] = useState<boolean>(false);
	const [error, setError] = useState<any>('');

	const paypal_s: PayPalStayl = {
		layout: 'horizontal',
		height: 49,
		width: 180,
	};
	const initialOptions: InititalOptions = {
		'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
		currency: 'USD',
		intent: 'capture',
		// 'data-client-token': 'abc123xyz==',
	};

	const handleApprove = (orderId: any) => {
		setPaidFor(true);
	};
	if (paidFor) {
		alert('success');
	}
	if (error) {
		alert('error');
	}

	return (
		<>
			<PayPalScriptProvider options={initialOptions}>
				<PayPalButtons
					style={paypal_s}
					createOrder={(data, actions) => {
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: `${price}`,
									},
								},
							],
						});
					}}
					onApprove={async (data, actions) => {
						return actions?.order?.capture().then(details => {
							const name = details?.payer?.name?.given_name;
							alert(`Transaction completed by ${name}`);
							handleApprove(data.orderID);
						});
					}}
					onCancel={() => {}}
					onError={err => {
						setError(err);
						console.error('error paypal', err);
					}}
				/>
			</PayPalScriptProvider>
		</>
	);
};

export default PayPalPayment;
