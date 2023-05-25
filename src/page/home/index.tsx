import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from 'components/formElements/button';
import PriceCalculation from 'components/priceCaluculation';
import Slider from 'components/slider/Slider';
import Support from 'components/support';
import { getCarts } from 'services/products';
import './upsell.scss';

import { CHECKOUT, INFORMATION } from 'constant';
import { useReactQuery } from 'hook/useQuery';

const Home: FC = (): JSX.Element => {
	const navigate = useNavigate();
	const { data: cart } = useReactQuery(() => getCarts(), 'carts');
	const filterCart = cart?.filter((e: any) => (+e.count > 0 ? e : null));

	const pageInformation = (): void =>
		navigate(`${CHECKOUT}/${INFORMATION}`, { state: 'information' });

	return (
		<div className='home'>
			<div className='home__container'>
				<div className='home__content'>
					<div className='content__slider'>
						<Slider />
					</div>
					<div className='content__price'>
						<PriceCalculation />
					</div>
					<div className='content__text'>
						<p className='content__text-1'>
							Quis tincidunt nunc suscipit egestas. Viverra erat cras ullamcorper amet. Risus velit
							tempus at eu. Eu facilisi tempor ipsum orci placerat urna pretium adipiscing
							dignissim.
						</p>
						<p className='content__text-2'>
							Risus dolor fringilla diam nulla iaculis. Odio nunc nulla malesuada sed vulputate nisl
							metus sem. Elit pulvinar in auctor ac vitae morbi et. Nulla malesuada consequat arcu
							semper cras pharetra fermentum. Nisl eu arcu libero etiam diam. Scelerisque cum
							pharetra amet nulla sed nulla mauris tortor. Magna elementum montes eget ullamcorper
							id diam dui pellentesque. Eget mi in tempor amet vitae.
						</p>
					</div>
					<div className='content__support'>
						<Support />
					</div>
					<div className='content__buttons'>
						<Buttons
							type='button'
							imgs
							name='Yes, I want'
							OnClick={pageInformation}
							disable={filterCart?.length === 0 ? true : false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
