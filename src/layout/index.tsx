import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Alerts from 'components/alert';
import Header from 'components/header';

import { HOME } from 'constant';
import { useExpensesData } from 'context';

const Layout: FC = (): JSX.Element => {
	const { pathname } = useLocation();
	const { alert }: any = useExpensesData();

	return (
		<div
			className='wrapper'
			style={{ backgroundColor: `${pathname === HOME ? '#EFF6FE' : '#fff'}` }}
		>
			<Header />
			{alert && (
				<div className='alert'>
					<Alerts
						label={alert === 'error' ? 'danger' : 'success'}
						success={alert === 'error' ? 'error' : 'success'}
					/>
				</div>
			)}
			<div className='main'>
				<Outlet />
			</div>
			<div className='footer'></div>
		</div>
	);
};

export default Layout;
