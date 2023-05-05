import { FC } from "react";

import Cart from "components/cart";
import Buttons from "components/formElements/button";
import ShowSummary from "components/showsummary";

import Thank from "assets/thankyou/Group 1000004527.png";
import UserInfo from "./UserInfo";

import "./thankyou.scss";

const ThankYou: FC = (): JSX.Element => {
  return (
    <div className="thank">
      <div className="thank__container">
        <div className="s__show">
          <ShowSummary />
        </div>
        <div className="thank__container-lefth">
          <div className="container-lefth-top">
            <img src={Thank} alt="thank" />
            <div className="container-lefth-top-texts">
              <h5>Thank you!</h5>
              <p>
                Your order <span>#15636561</span> has been placed
              </p>
            </div>
            <Buttons type="button" imgs name="Back to Shop" />
          </div>
          <UserInfo />
        </div>
        <div className="thank__container-rigth">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
