import { FC, useState } from "react";
import "./alert.scss";

import Alert from "react-bootstrap/Alert";

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
