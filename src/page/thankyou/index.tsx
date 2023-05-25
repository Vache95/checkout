import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from 'components/cart';
import Buttons from 'components/formElements/button';
import ShowSummary from 'components/showsummary';
import Thank from 'assets/thankyou/Group 1000004527.png';
import './thankyou.scss';

import UserInfo from './UserInfo';
import { HOME } from 'constant';

const ThankYou: FC = (): JSX.Element => {
	const navigate = useNavigate();

	const back = (): void => navigate(HOME);

	return (
		<div className='thank'>
			<div className='thank__container'>
				<div className='s__show'>
					<ShowSummary />
				</div>
				<div className='thank__container-lefth'>
					<div className='container-lefth-top'>
						<img src={Thank} alt='thank' />
						<div className='container-lefth-top-texts'>
							<h5>Thank you!</h5>
							<p>
								Your order <span>#15636561</span> has been placed
							</p>
						</div>
						<Buttons type='button' imgsLeft name='Back to Shop' OnClick={back} />
					</div>
					<UserInfo />
				</div>
				<div className='thank__container-rigth'>
					<Cart />
				</div>
			</div>
		</div>
	);
};

export default ThankYou;
