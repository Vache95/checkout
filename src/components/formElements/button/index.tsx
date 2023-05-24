import { FC } from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Arrow from "assets/svg/Vector (4).svg";

import "./button.scss";

type Props = {
  imgs?: boolean;
  imgsLeft?: boolean;
  name: string;
  type?: "button" | "submit" | "reset" | undefined;
  disable?: boolean;
  OnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  load?: boolean;
};

const Buttons: FC<Props> = ({
  imgs = "",
  imgsLeft = "",
  name = "",
  type = "button",
  OnClick = () => {},
  disable = false,
  load = false,
}) => {
  return (
    <>
      <Button variant="dark" type={type} onClick={OnClick} disabled={disable}>
        {!load ? (
          <>
            {imgsLeft && <img src={Arrow} alt="arrow" />}
            {name}
            {imgs && <img src={Arrow} alt="arrow" />}
          </>
        ) : (
          <Spinner animation="border" variant="light" />
        )}
      </Button>
    </>
  );
};

export default Buttons;
