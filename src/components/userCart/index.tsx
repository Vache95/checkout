import { FC } from "react";
import { userCart } from "./config";

import { useExpensesData } from "context";

import "./usercart.scss";

const UserCart: FC = (): JSX.Element => {
  const { information }: any = useExpensesData();

  const userInfo = (name: string): string => {
    switch (name) {
      case "Name:":
        return information?.firstName ? information?.firstName : null;
      case "Email:":
        return information?.email ? information?.email : null;
      case "Ship to:":
        return information?.address ? information?.address : null;
      case "Shipping Method:":
        return information?.checkbox ? information?.checkbox.toString() : null;
      default:
        return "------";
    }
  };
  return (
    <div className="usercart">
      {userCart.map(({ id, name }) => (
        <div className="usercart__item" key={id}>
          <div className="usercart__item-left">
            <span className="usercart__item-name">{name}</span>
          </div>
          <div className="usercart__item-rigth">
            <span className="usercart__item-value">{userInfo(name)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCart;
