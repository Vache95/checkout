import PayPalPayment from 'components/PayPalPayment';
import PayPal from 'assets/buttons//580b57fcd9996e24bc43c530.png';
import Shop from 'assets/buttons/ShopPay - White 1.png';
import Pay from 'assets/buttons/svgexport-1 (7) 1.png';
import './express.scss';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const Express: React.FC = (): JSX.Element => {
	const paypal_s: any = {
		layout: 'horizontal',
		height: 49, // Change the button height
		width: 180, // Change the button width
	};
	const initialOptions = {
		'client-id': 'ARW7-CHqJjULlbAMGsb9WWgS-VJxpypPpeG27MTYJmB_uR0aJqMf2VwWvPhoMpM1Sxw0FRQSfcfzmEIn',
		currency: 'USD',
		intent: 'capture',
		// 'data-client-token': 'abc123xyz==',
	};

	return (
		<div className='express'>
			<h3 className='express__text'>Express Checkout</h3>
			<div className='express__bottom'>
				<div className='express__bottom-mobile'>
					<div className='express__button-shop'>
						<img src={Shop} alt='shop' />
					</div>
					<div className='express__button-paypal'>
						{/* <img src={PayPal} alt='paypal' /> */}
						<PayPalScriptProvider options={initialOptions}>
							<PayPalButtons style={paypal_s} />
							{/* <PayPalPayment /> */}
						</PayPalScriptProvider>
					</div>
				</div>
				<div className='express__button-pay'>
					<img src={Pay} alt='pay' />
				</div>
			</div>
		</div>
	);
};

export default Express;
