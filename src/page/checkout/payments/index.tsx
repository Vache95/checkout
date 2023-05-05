import { FC, FormEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Buttons from "components/formElements/button";
import CreditCard from "components/creditCard";
import Vector from "assets/svg/Vector (1).svg";
import Phone from "assets/svg/fi-rr-phone-call.svg";
import User from "assets/svg/fi-rr-user.svg";
import Address from "assets/svg/Vector (2).svg";
import Org from "assets/svg/Vector (3).svg";
import Input from "components/formElements/input";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  const openOption = (e: FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    id === "top" ? setOption(false) : setOption(true);
  };

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
              <label>Same as shipping address</label>
            </div>
            <div className={option ? "bottomaddress__option option--mod" : "bottomaddress__option"}>
              <div className="bottomaddress__option-country">
                <img src={Vector} alt="vector" />
                <Form.Select aria-label="Default select example" {...register("country")}>
                  <option>Select a Country</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                {/* {errors?.country && <p className="error__text">Enter a valid email address</p>} */}
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
                  <Form.Select aria-label="Default select example" {...register("city", { required: true })}>
                    <option>City</option>
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
