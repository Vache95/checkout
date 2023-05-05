import { FC } from "react";
import { userCart } from "./config";

import "./usercart.scss";

const UserCart: FC = (): JSX.Element => {
  return (
    <div className="usercart">
      {userCart.map(({ id, name, value }) => (
        <div className="usercart__item" key={id}>
          <div className="usercart__item-left">
            <span className="usercart__item-name">{name}</span>
          </div>
          <div className="usercart__item-rigth">
            <span className="usercart__item-value">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCart;
