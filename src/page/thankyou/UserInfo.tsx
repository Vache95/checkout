import { FC } from "react";

const UserInfo: FC = (): JSX.Element => {
  return (
    <div className="container-lefth-bottom">
      <div className="lefth-bottom-item">
        <div className="lefth-bottom-item__lefth">
          <p>Name:</p>
          <p>Oleo Bone</p>
        </div>
        <div className="lefth-bottom-item__rigth">
          <p>Email:</p>
          <p>oleo_bone@gmail.com</p>
        </div>
      </div>
      <div className="lefth-bottom-item">
        <div className="lefth-bottom-item__lefth">
          <p>Shipping Address:</p>
          <p>4140 Parker Rd. Allentown, New Mexico 31134</p>
        </div>
        <div className="lefth-bottom-item__rigth">
          <p>Billing Address:</p>
          <p>Same as shipping</p>
        </div>
      </div>
      <div className="lefth-bottom-item">
        <div className="lefth-bottom-item__lefth">
          <p>Shipping:</p>
          <p>Free</p>
        </div>
        <div className="lefth-bottom-item__rigth">
          <p>Payment Method:</p>
          <p>Credit Card</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
