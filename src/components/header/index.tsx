import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { CHECKOUT, HOME, INFORMATION, PAYMENT } from "constant";

import Logo from "assets/header/Logo.png";
import "./header.scss";

const Header: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateHeader = (): void => {
    switch (pathname) {
      case HOME:
        return navigate(HOME);
      case `/${CHECKOUT}/${INFORMATION}`:
        return navigate(`/${CHECKOUT}/${INFORMATION}`);
      case `/${CHECKOUT}/${PAYMENT}`:
        return navigate(`${CHECKOUT}/${PAYMENT}`);
      default:
        return navigate(HOME);
    }
  };

  return (
    <div className="header">
      <div className="header__container">
        <img src={Logo} alt="logo" onClick={navigateHeader} />
      </div>
    </div>
  );
};

export default Header;
