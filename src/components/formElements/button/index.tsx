import { FC } from "react";
import Button from "react-bootstrap/Button";
import Arrow from "assets/svg/Vector (4).svg";

import "./button.scss";

type Props = {
  imgs?: boolean;
  name: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const Buttons: FC<Props> = ({ imgs, name, type }) => {
  return (
    <>
      <Button variant="dark" type={type}>
        {name}
        {imgs && <img src={Arrow} alt="arrow" />}
      </Button>
    </>
  );
};

export default Buttons;
