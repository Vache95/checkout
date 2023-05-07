import { FC } from 'react';

import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';

import Arrow from 'assets/svg/Vector (4).svg';

import './button.scss';

type Props = {
  imgs?: boolean;
  imgsLeft?: boolean;
  name: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const Buttons: FC<Props> = ({ imgs = '', imgsLeft = '', name = '', type = 'button' }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const func = (): void => {
    if (pathname === '/' && name === 'Yes, I want') {
      navigate('checkout/information');
    }
    if (pathname === '/thankyou' && name === 'Back to Shop') {
      navigate('/');
    }
  };
  return (
    <>
      <Button variant="dark" type={type} onClick={func}>
        {imgsLeft && <img src={Arrow} alt="arrow" />}
        {name}
        {imgs && <img src={Arrow} alt="arrow" />}
      </Button>
    </>
  );
};

export default Buttons;
