import PayPalPayment from 'components/PayPalPayment';
import { getCarts } from 'services/products';
import Shop from 'assets/buttons/ShopPay - White 1.png';
import Pay from 'assets/buttons/svgexport-1 (7) 1.png';
import './express.scss';

import { useReactQuery } from 'hook/useQuery';
const Express: React.FC = (): JSX.Element => {
	const { data: cart } = useReactQuery(() => getCarts(), 'carts');

	const price: any = cart
		?.map((e: any) => {
			if (+e?.count > 0) {
				const price = e?.price?.slice(1);
				const mutationPrice = +price * e?.count;
				return mutationPrice;
			}
			return 0;
		})
		?.reduce((a: number, b: number) => a + b, 0);
	return (
		<div className='express'>
			<h3 className='express__text'>Express Checkout</h3>
			<div className='express__bottom'>
				<div className='express__bottom-mobile'>
					<div className='express__button-shop'>
						<img src={Shop} alt='shop' />
					</div>
					<div className='express__button-paypal'>
						<PayPalPayment price={price} />
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
