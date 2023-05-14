import { FC } from 'react';

import Alert from 'react-bootstrap/Alert';

type AlertProps = {
  label: string;
  success: string;
};
const Alerts: FC<AlertProps> = ({ label, success }): JSX.Element => {
  return (
    <>
      <Alert variant={success}>{label}</Alert>
    </>
  );
};

export default Alerts;
