import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Cart from 'components/cart';
import Express from 'components/express';
import LifeTime from 'components/lifeTime';
import ShowSummary from 'components/showsummary';
import Step from 'components/steps';
import UserCart from 'components/userCart';
import './checkout.scss';

const Checkout: FC = (): JSX.Element => {
	const { pathname } = useLocation();

	return (
		<div className='information'>
			<div className='information__container'>
				<div className='information__leftside'>
					<Step />
					<ShowSummary />
					<LifeTime />
					<Express />
					{pathname === '/checkout/payment' && <UserCart />}
					<Outlet />
				</div>
				<div className='information__rigthside'>
					<Cart />
				</div>
			</div>
		</div>
	);
};

export default Checkout;
