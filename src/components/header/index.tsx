import { FC } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Logo from 'assets/header/Logo.png';
import './header.scss';

const Header: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateHeader = (): void => {
    switch (pathname) {
      case '/':
        return navigate('/');
      case 'checkout/information':
        return navigate('checkout/information');
      case 'checkout/payment':
        return navigate('checkout/payment');
      default:
        return navigate('/');
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
