import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import './lifetime.scss';

const LifeTime: FC = (): JSX.Element => {
	return (
		<div className='lifetime'>
			<div className='lifetime__left'>
				<h3>Lifetime Warranty🔥</h3>
				<p>
					Add a lifetime warranty & enjoy peace of mind for life with your dream collections order
					for just $4.99
				</p>
			</div>
			<div className='lifetime__rigth'>
				<Button variant='dark'>Add- $4.99</Button>
			</div>
		</div>
	);
};

export default LifeTime;
