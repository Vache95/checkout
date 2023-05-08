import { FC } from "react";
import { userCart } from "./config";

import { selectProducts } from "store/selectors";
import { useAppSelector } from "hook/useSelector";

import "./usercart.scss";

const UserCart: FC = (): JSX.Element => {
  const { information } = useAppSelector(selectProducts);

  const userInfo = (name: string): string => {
    switch (name) {
      case "Name:":
        return information?.firstName;
      case "Email:":
        return information?.email;
      case "Ship to:":
        return information?.address;
      case "Shipping Method:":
        return information?.checkbox.toString();
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
