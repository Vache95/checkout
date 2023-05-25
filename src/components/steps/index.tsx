import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import Arrow from 'assets/svg/Vector1.svg';
import './step.scss';

const Step: FC = (): JSX.Element => {
	const { pathname } = useLocation();

	return (
		<div className='step'>
			<h1>Checkout</h1>
			<div className='step__arrow'>
				<span className={pathname === '/checkout/information' ? 'path' : undefined}>
					Information
				</span>
				<img src={Arrow} alt='arrow' />
				<span className={pathname === '/checkout/payment' ? 'path' : undefined}>Payment</span>
			</div>
		</div>
	);
};

export default Step;
