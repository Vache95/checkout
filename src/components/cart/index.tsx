import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import { getCarts } from 'services/products';
import { deleteProduct } from 'services/products';
import './cart.scss';

import Clab from './Clab';
import SubCart from './SubCart';
import { formatCurrency } from 'helper/formatNumber';
import { useReactMutation } from 'hook/useMutation';
import { useReactQuery } from 'hook/useQuery';
const Cart: FC = (): JSX.Element => {
	const [productId, setProductId] = useState<string>('');
	const [discountValue, setDiscountValue] = useState('');

	const { pathname } = useLocation();

	const { data: cart, isSuccess } = useReactQuery(() => getCarts(), 'carts');
	const { mutate: product } = useReactMutation(() => deleteProduct(productId), 'carts');

	const updateProduct = (id: string) => {
		setProductId(id);
		setTimeout(() => {
			product();
		}, 0);
	};

	const colculationPrice = (price: any, count: string | number): string =>
		`€${price?.slice(1) * +count}`;

	const total = cart
		?.map((e: any) => {
			if (+e.count > 0) {
				const price = e?.price?.slice(1);
				const mutationPrice = +price * e?.count;
				return mutationPrice;
			}
			return 0;
		})
		.reduce((a: number, b: number) => a + b, 0);

	return (
		<>
			<div className='cart' style={{ height: `${pathname === '/thankyou' ? '404px' : ''}` }}>
				<div className='cart__top'>
					{isSuccess &&
						cart
							?.filter((e: any) => (+e.count > 0 ? e : null))
							?.map((datas: any) => (
								<div className='cart__top-item' key={datas?.id}>
									<div className='cart__top-item-img'>
										{!['/thankyou', '/checkout/payment'].includes(pathname) && (
											<span className='deleteproduct' onClick={() => updateProduct(datas?.id)}>
												X
											</span>
										)}
										<span className='countproduct'>{datas?.count}</span>
										<img src={datas?.images} alt='item1' />
									</div>
									<div className='cart__top-item-name'>
										<p>{datas?.name}</p>
									</div>
									<div className='cart__top-item-price'>
										<p>{colculationPrice(datas?.price, datas?.count)}.00</p>
									</div>
								</div>
							))}
				</div>
				<div className='cart__top__bottom'>
					{pathname !== '/thankyou' && (
						<div className='cart__top__bottom-discount'>
							<Form.Control
								type='password'
								id='inputPassword5'
								aria-describedby='passwordHelpBlock'
								placeholder='Discount code'
								value={discountValue}
								onChange={e => setDiscountValue(e.target.value)}
							/>
							<Button variant='dark'>Apply</Button>
						</div>
					)}
					<div className='cart__top__bottom-information'>
						<div
							className={
								pathname === '/thankyou'
									? 'bottom-information_top bottom-information_top--mod'
									: 'bottom-information_top'
							}
						>
							<div className='subtotal'>
								<p>Subtotal</p>
								<span>{formatCurrency(total)}</span>
							</div>
							<div className='shipping'>
								<p>Subtotal</p>
								<span>--</span>
							</div>
							<div className='discount'>
								<p>Discount</p>
								<span>--</span>
							</div>
						</div>
						<div className='bottom-information_bottom'>
							<div className='total'>
								<p>Total</p>
								<span>{formatCurrency(total)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<SubCart />
			{pathname === '/payment' && <Clab />}
		</>
	);
};

export default Cart;
