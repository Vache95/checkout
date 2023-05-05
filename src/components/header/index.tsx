import { FC } from "react";

import { useNavigate } from "react-router-dom";
import Logo from "assets/header/Logo.png";
import "./header.scss";

const Header: FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__container">
        <img
          src={Logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
