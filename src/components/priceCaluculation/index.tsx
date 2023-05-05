import { FC } from "react";
import "./pricecalculation.scss";

const PriceCalculation: FC = (): JSX.Element => {
  return (
    <div className="price">
      <div className="price__top">
        <span>Price:</span>
        <span>$50</span>
        <span>-80%</span>
      </div>
      <div className="price__bottom">
        <span>Quantity:</span>
        <span>-</span>
        <span>1</span>
        <span>+</span>
      </div>
    </div>
  );
};

export default PriceCalculation;
