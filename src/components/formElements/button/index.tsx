import { FC } from "react";

import Button from "react-bootstrap/Button";

import Arrow from "assets/svg/Vector (4).svg";

import "./button.scss";

type Props = {
  imgs?: boolean;
  imgsLeft?: boolean;
  name: string;
  type?: "button" | "submit" | "reset" | undefined;
  cart?: number;
  OnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Buttons: FC<Props> = ({ imgs = "", imgsLeft = "", name = "", type = "button", cart = "", OnClick = () => {} }) => {
  return (
    <>
      <Button variant="dark" type={type} onClick={OnClick} disabled={+cart <= 0 && name === "Yes, I want" ? true : false}>
        {imgsLeft && <img src={Arrow} alt="arrow" />}
        {name}
        {imgs && <img src={Arrow} alt="arrow" />}
      </Button>
    </>
  );
};

export default Buttons;
