import { FC } from "react";

import Form from "react-bootstrap/Form";
import "./input.scss";

type InputProps = {
  type: string;
  placeholder: string;
  register: any;
  errors: any;
  name: string;
};

const Input: FC<InputProps> = ({ type, placeholder, register, name, errors }): JSX.Element => {
  console.log(errors, "errors.name");

  return (
    <>
      <Form.Control type={type} placeholder={placeholder} className="input" {...register(name)} />
      {errors?.name && <p className="input-error-text">Enter a valid Card number</p>}
    </>
  );
};

export default Input;
