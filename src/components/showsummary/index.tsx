import { FC, useState } from 'react';
import Cart from 'components/cart';
import Shoping from 'assets/svg/fi-rr-shopping-cart.svg';
import Arrow from 'assets/svg/Vectoraa.svg';
import './showsummary.scss';

const ShowSummary: FC = (): JSX.Element => {
	const [show, setShow] = useState<boolean>(false);

	const openShow = (): void => setShow(!show);

	return (
		<>
			<div className='show'>
				<div className='show__left'>
					<img src={Shoping} alt='shoping' />
					<span>Show order summary</span>
					<img src={Arrow} alt='arrow' onClick={openShow} />
				</div>
				<div className='show__rigth'>
					<span>€138.00</span>
				</div>
			</div>
			<div className={show ? 'show__option--mod' : 'show__option'}>
				{show && (
					<>
						<Cart />
					</>
				)}
			</div>
		</>
	);
};

export default ShowSummary;
