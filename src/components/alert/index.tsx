import { FC, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import './alert.scss';

type AlertProps = {
	label: string;
	success: string;
};

const Alerts: FC<AlertProps> = ({ label, success }): JSX.Element => {
	const [show, setShow] = useState(true);

	return (
		<>
			{show && (
				<Alert variant={success} onClose={() => setShow(false)} dismissible>
					{label}
				</Alert>
			)}
		</>
	);
};

export default Alerts;
