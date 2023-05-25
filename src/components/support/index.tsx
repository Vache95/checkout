import { FC } from 'react';
import Gsb from 'assets/svg/Group 39652.svg';
import Payple from 'assets/svg/Group 39653.svg';
import Visa from 'assets/svg/Group 39654.svg';
import Master from 'assets/svg/Group 39655.svg';
import Amex from 'assets/svg/Group 39656.svg';
import Circ from 'assets/svg/Group 39658.svg';
import Lock from 'assets/svg/Vector (8).svg';
import Operator from 'assets/svg/Vector (11).svg';
import './support.scss';

const Support: FC = (): JSX.Element => {
	return (
		<div className='support'>
			<div className='support-lefth'>
				<div className='support-lefth__top'>
					<img src={Lock} alt='lock' />
					<p>
						Guaranteed <span>Safe</span> & <span>Secure</span> Checkout
					</p>
				</div>
				<div className='support-lefth__bottom'>
					<img src={Master} alt='master' />
					<img src={Visa} alt='visa' />
					<img src={Payple} alt='payple' />
					<img src={Amex} alt='amex' />
					<img src={Gsb} alt='gsb' />
					<img src={Circ} alt='circ' />
				</div>
			</div>
			<div className='support-rigth'>
				<img src={Operator} alt='operator' />
				<div className='support-rigth-texts'>
					<p>24/7</p>
					<p>Support</p>
				</div>
			</div>
		</div>
	);
};

export default Support;
