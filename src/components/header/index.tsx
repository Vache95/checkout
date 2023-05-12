import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { CHECKOUT, HOME, INFORMATION, PAYMENT } from "constant";

import Logo from "assets/header/Logo.png";
import Shoping from "assets/svg/fi-rr-shopping-cart.svg";
import "./header.scss";
import { useAppSelector } from "hook/useSelector";
import { selectProducts } from "store/selectors";

const Header: FC = (): JSX.Element => {
  const { cart } = useAppSelector(selectProducts);
  const favoriteCart = cart.filter((e) => (e.count ? e.count : null));

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
        <div className="shop__count">
          <span>{favoriteCart.length}</span>
          <img src={Shoping} alt="shoping" onClick={navigateHeader} />
        </div>
      </div>
    </div>
  );
};

export default Header;
