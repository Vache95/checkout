import { FC } from "react";

import Form from "react-bootstrap/Form";
import "./input.scss";

type InputProps = {
  type: string;
  placeholder: string;
  register: any;
  errors: any;
  name: string;
  value?: string;
  OnChange?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  require?: boolean;
  OnInput?: (event: any) => any;
  pathern?: RegExp;
  min?: number;
  max?: number;
};

const Input: FC<InputProps> = ({
  type,
  placeholder,
  register,
  name,
  errors = {},
  value,
  OnChange = () => {},
  require = false,
  OnInput = () => {},
  pathern,
  min,
  max,
}): JSX.Element => {
  return (
    <>
      <Form.Control
        type={type}
        placeholder={placeholder}
        className="input"
        {...register(name, { required: require, pattern: pathern, minLength: min, maxLength: max })}
        value={value}
        onChange={OnChange}
        onInput={OnInput}
      />
      {Object.keys(errors).map((e) => (e === name ? <p className="input-error-text">Enter a valid Card number</p> : null))}
    </>
  );
};

export default Input;
