import { FC, MouseEvent, useState } from "react";

import { useExpensesData } from "context";
import { useReactMutation } from "hook/useMutation";
import { updateCart } from "services/products";

import Minus from "assets/svg/Vector-minus.svg";
import Plus from "assets/svg/fi-rr-plus.svg";
import Buttons from "components/formElements/button";

import "./pricecalculation.scss";

const PriceCalculation: FC = (): JSX.Element => {
  const [countProducts, setCountProducts] = useState<number>(0);
  const { state }: any = useExpensesData();


  const countProductsFunc = (e: MouseEvent<HTMLSpanElement>): void => {
    const target = e.target as HTMLSpanElement;
    const id = target.id;
    if (id === "minus" && countProducts > 0) {
      setCountProducts((prev) => prev - 1);
    }
    if (id === "plus") {
      setCountProducts((prev) => prev + 1);
    }
  };
  const { mutate: addCart } = useReactMutation(() => updateCart(state, countProducts), "carts");

  return (
    <div className="price">
      <div className="price__top">
        <span>Price:</span>
        <span>$50</span>
        <span>-80%</span>
      </div>
      <div className="price__bottom">
        <span>Quantity:</span>
        <span onClick={countProductsFunc} id="minus">
          <img src={Minus} alt="minus" id="plus" />
        </span>
        <span>{countProducts}</span>
        <span onClick={countProductsFunc} id="plus">
          <img src={Plus} alt="plus" id="plus" />
        </span>
      </div>
      <div className="price__buy">
        <Buttons type="button" name="Buy" OnClick={() => addCart()} disable={false} />
      </div>
    </div>
  );
};

export default PriceCalculation;
