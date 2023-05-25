import { FC } from 'react';
import Money from 'assets/svg/cashback 1.svg';
import Orders from 'assets/svg/truck 1.svg';

const SubCart: FC = (): JSX.Element => {
	return (
		<div className='subcart'>
			<div className='subcart__top'>
				<img src={Money} alt='money' />
				<p>
					30 days satisfaction <span>Guareantee</span> with <span>money back</span>
				</p>
			</div>
			<div className='subcart__bottom'>
				<img src={Orders} alt='orders' />
				<p>
					Over <span>38,957</span> successfully <span>shipped orders</span>
				</p>
			</div>
		</div>
	);
};

export default SubCart;
