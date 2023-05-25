import { FC } from 'react';
import Checke from 'assets/svg/Vector (9).svg';

const Clab: FC = (): JSX.Element => {
	return (
		<div className='clab'>
			<div className='clab__title'>
				<h4>The ultimate jewellery club</h4>
				<p>
					Ornare rhoncus nunc ut felis. Faucibus dolor at ultrices tincidunt. Pulvinar sed justo et
					viverra pellentesque.
				</p>
			</div>
			<div className='clab__content'>
				<ul className='clab__content-list'>
					<li>
						<img src={Checke} alt='checke' />
						Extra 10$ off!
					</li>
					<li>
						{' '}
						<img src={Checke} alt='checke' />
						Free shipping on marked club items!
					</li>
					<li>
						{' '}
						<img src={Checke} alt='checke' />
						Free returns on marked club items!
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Clab;
