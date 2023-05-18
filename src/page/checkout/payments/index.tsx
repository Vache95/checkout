import { FC, FormEvent, useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
// import { loadStripe } from '@stripe/stripe-js';
import Buttons from "components/formElements/button";
import CreditCard from "components/creditCard";
import { THANK_YOU } from "constant";

import Vector from "assets/svg/Vector (1).svg";
import Phone from "assets/svg/fi-rr-phone-call.svg";
import User from "assets/svg/fi-rr-user.svg";
import Address from "assets/svg/Vector (2).svg";
import Org from "assets/svg/Vector (3).svg";
import Input from "components/formElements/input";

import { useNavigate } from "react-router-dom";
import { countries } from "config/config";
import { useStripe } from "@stripe/react-stripe-js";

import "./payments.scss";

interface FormData {
  chekbox: boolean;
  radiotop: boolean;
  radiobottom: boolean;
  country: string;
  firstname: string;
  lastname: string;
  address: string;
  org: string;
  city: string;
  code: string;
  phone: string;
  cardnumber: string;
  cardname: string;
  carddate: string;
  cardcode: string;
}

const Payments: FC = (): JSX.Element => {
  const [option, setOption] = useState<boolean>(false);
  const [intentdId, setIntentdId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>();
  const [customorId, setCustomorId] = useState("");
  const navigate = useNavigate();

  const stripe: any = useStripe();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function stripeBody(data: any) {
    const test: any = {
      "payment_method_data[type]": "card",
      "payment_method_data[card][number]": data.number,
      "payment_method_data[card][exp_month]": data.exp_month,
      "payment_method_data[card][exp_year]": data.exp_year,
      "payment_method_data[card][cvc]": data.cvc,
    };
    var formBody: any = [];
    for (var property in test) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(test[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
  }

  const onSubmit = async (data: FormData) => {
    const num: any = {
      number: "4242424242424242",
      exp_month: 8,
      exp_year: 24,
      cvc: "123",
    };

    fetch("http://localhost:5001/cretePaymentMethod", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: stripeBody(num) }),
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response.cratepaymentMethod.id);

        // Update the PaymentIntent with the payment method ID
        fetch(`https://api.stripe.com/v1/payment_intents/${intentdId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization:
              "Bearer sk_test_51N6E82GvTPkBaR2vkZmyQQusAAR5y9XtBGRgl6HcqI9pUcgzlenzMU2plCKBNtS2HjQAeiuECjShfcW6YlsH6Wks00aeOGMOqr",
          },
          body: `payment_method=${response.cratepaymentMethod.id}`, // Replace with the payment method ID
        })
          .then((r) => r.json())
          .then((updatedPaymentIntent) => {
            // Confirm the PaymentIntent again after updating the payment method
            stripe.confirmPayment({
              clientSecret: updatedPaymentIntent.client_secret,
              confirmParams: {
                return_url: "https://example.com/order/123/complete", // Replace with your actual return URL
              },
            });
          });
      });

    // const params = new URLSearchParams();
    // params.append("payment_method", "pm_card_visa");

    // fetch(`https://api.stripe.com/v1/payment_intents/${intentdId}/confirm`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization:
    //       "Bearer sk_test_51N6E82GvTPkBaR2vkZmyQQusAAR5y9XtBGRgl6HcqI9pUcgzlenzMU2plCKBNtS2HjQAeiuECjShfcW6YlsH6Wks00aeOGMOqr",
    //   },
    //   body: params.toString(),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
    // navigate(`/${THANK_YOU}`);
  };

  const openOption = (e: FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    id === "top" ? setOption(false) : setOption(true);
  };

  useEffect(() => {
    fetch("http://localhost:5001/intentd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1444 }),
    })
      .then((r) => r.json())
      .then((response) => {
        setClientSecret(response?.client_secret?.client_secret);
        setIntentdId(response?.client_secret?.id);
      });
    fetch("http://localhost:5001/customor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "dd@getMaxListeners.com" }),
    })
      .then((r) => r.json())
      .then((response) => setCustomorId(response?.customers?.id));
  }, []);

  return (
    <div className="payments">
      <form className="payments-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="payments-method">
          <div className="payments-method__title">
            <h3>Payment Method</h3>
            <p>Enter your card information to make the payment securely.</p>
            <CreditCard register={register} errors={errors} />
          </div>
        </div>
        <div className="payments-address">
          <div className="payments-address-lefth">
            <input type="checkbox" {...register("chekbox", { required: true })} />
          </div>
          <div className="payments-address-rigth">
            <p>
              By checking this box, I acknowledge that I have read and agree to the <span>Terms of Service</span>, and{" "}
              <span>Monthly Billing Terms</span> of this website and want to opt-in for the monthly billed Dream Collection Club®
            </p>
          </div>
        </div>
        <div className="payments-billing">
          <div className="payments-billing__title">
            <h3>Billing address</h3>
            <p>Select the address that matches your card or payment method.</p>
          </div>
          <div className="payments-billing-topaddress">
            <input {...register("radiotop")} type="radio" name="1" id="top" onClick={openOption} />
            <label>Same as shipping address</label>
          </div>

          <>
            <div className={option ? "payments-billing-bottomaddress bottomaddress--mod" : "payments-billing-bottomaddress"}>
              <input {...register("radiobottom")} type="radio" name="1" id="bottom" onClick={openOption} />
              <label>Use a different billing address</label>
            </div>
            <div className={option ? "bottomaddress__option option--mod" : "bottomaddress__option"}>
              <div className="bottomaddress__option-country">
                <img src={Vector} alt="vector" />
                <Form.Select {...register("country")} defaultValue="">
                  <option value="" disabled>
                    Select a Country
                  </option>
                  {countries.map(({ label }, i) => (
                    <option key={i} value={label}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
                {errors?.country && <p className="error__text">Enter a valid country address</p>}
              </div>
              <div className="bottomaddress__option-firstlast">
                <div className="bottomaddress__option-firstname">
                  <img src={User} alt="User" />
                  <Input type="text" placeholder="First Name" register={register} name="firstname" errors={errors} />
                </div>
                <div className="bottomaddress__option-lastname">
                  <img src={User} alt="User" />
                  <Input type="text" placeholder="First Name" register={register} name="lastname" errors={errors} />
                </div>
              </div>
              <div className="bottomaddress__option-address">
                <img src={Address} alt="address" />
                <Input type="text" placeholder="Address" register={register} name="address" errors={errors} />
              </div>
              <div className="bottomaddress__option-apartament">
                <img src={Org} alt="org" />
                <Input type="text" placeholder="Aparment, suit, etc (Optional)" register={register} name="org" errors={errors} />
              </div>
              <div className="bottomaddress__option-citycode">
                <div className="bottomaddress__option-city">
                  <Form.Select aria-label="Default select example" {...register("city")} defaultValue="">
                    <option value="" disabled>
                      City
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div className="bottomaddress__option-code">
                  <Input type="text" placeholder="Zip Code" register={register} name="code" errors={errors} />
                </div>
              </div>
              <div className="bottomaddress__option-phone">
                <img src={Phone} alt="phone" />
                <Input
                  type="text"
                  placeholder="Phone Number ( for shipping updates & orders )"
                  register={register}
                  name="phone"
                  errors={errors}
                />
              </div>
            </div>
          </>
        </div>
        <Buttons type="submit" imgs name="Validate the order" />
      </form>
    </div>
  );
};

export default Payments;
