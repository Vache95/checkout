import { FC, MouseEvent, useState } from 'react';

import Minus from 'assets/svg/Vector-minus.svg';
import Plus from 'assets/svg/fi-rr-plus.svg';
import Buttons from 'components/formElements/button';

import './pricecalculation.scss';

const PriceCalculation: FC = (): JSX.Element => {
  const [countProducts, setCountProducts] = useState<number>(0);

  const countProductsFunc = (e: MouseEvent<HTMLSpanElement>): void => {
    const target = e.target as HTMLSpanElement;
    const id = target.id;
    if (id === 'minus' && countProducts > 0) {
      setCountProducts((prev) => prev - 1);
    }
    if (id === 'plus') {
      setCountProducts((prev) => prev + 1);
    }
  };

  return (
    <div className="price">
      <div className="price__top">
        <span>Price:</span>
        <span>$50</span>
        <span>-80%</span>
      </div>
      <div className="price__bottom">
        <span>Quantity:</span>
        <span onClick={countProductsFunc}>
          <img src={Minus} alt="minus" id="minus" />
        </span>
        <span>{countProducts}</span>
        <span onClick={countProductsFunc}>
          <img src={Plus} alt="plus" id="plus" />
        </span>
      </div>
      <div className="price__buy">
        <Buttons type="button" name="Buy" />
      </div>
    </div>
  );
};

export default PriceCalculation;
