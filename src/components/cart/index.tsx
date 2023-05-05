import { FC } from "react";

import { useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import { cartItem } from "./config";
import Clab from "./Clab";
import SubCart from "./SubCart";

import Item1 from "assets/cart/Rectangle 4159.jpg";
import Item2 from "assets/cart/Rectangle 4160.jpg";

import "./cart.scss";

const Cart: FC = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="cart" style={{ height: `${pathname === "/thankyou" ? "404px" : ""}`}}>
        <div className="cart__top">
          {cartItem(Item1, Item2).map(({ id, images, name, price }) => (
            <div className="cart__top-item" key={id}>
              <div className="cart__top-item-img">
                <span>1</span>
                <img src={images} alt="item1" />
              </div>
              <div className="cart__top-item-name">
                <p>{name}</p>
              </div>
              <div className="cart__top-item-price">
                <p>{price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__top__bottom">
          {pathname !== "/thankyou" && (
            <div className="cart__top__bottom-discount">
              <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Discount code"
              />
              <Button variant="dark">Apply</Button>
            </div>
          )}
          <div className="cart__top__bottom-information">
            <div
              className={
                pathname === "/thankyou" ? "bottom-information_top bottom-information_top--mod" : "bottom-information_top"
              }
            >
              <div className="subtotal">
                <p>Subtotal</p>
                <span>€138.00</span>
              </div>
              <div className="shipping">
                <p>Subtotal</p>
                <span>--</span>
              </div>
              <div className="discount">
                <p>Discount</p>
                <span>--</span>
              </div>
            </div>
            <div className="bottom-information_bottom">
              <div className="total">
                <p>Total</p>
                <span>€138.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubCart />
      {pathname === "/payment" && <Clab />}
    </>
  );
};

export default Cart;
