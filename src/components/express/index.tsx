import Shop from "assets/buttons/ShopPay - White 1.png";
import Pay from "assets/buttons/svgexport-1 (7) 1.png";
import PayPal from "assets/buttons//580b57fcd9996e24bc43c530.png";
import "./express.scss";

const Express: React.FC = (): JSX.Element => {
  return (
    <div className="express">
      <h3 className="express__text">Express Checkout</h3>
      <div className="express__bottom">
        <div className="express__bottom-mobile">
          <div className="express__button-shop">
            <img src={Shop} alt="shop" />
          </div>
          <div className="express__button-paypal">
            <img src={PayPal} alt="paypal" />
          </div>
        </div>
        <div className="express__button-pay">
          <img src={Pay} alt="pay" />
        </div>
      </div>
    </div>
  );
};

export default Express;
