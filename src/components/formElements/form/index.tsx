import { FC, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { emailPattern, namePattern } from "utils/validation";
import { InputNumber } from "helper/input";

import Email from "assets/svg/Vector.svg";
import Phone from "assets/svg/fi-rr-phone-call.svg";
import Vector from "assets/svg/Vector (1).svg";
import User from "assets/svg/fi-rr-user.svg";
import Address from "assets/svg/Vector (2).svg";
import Org from "assets/svg/Vector (3).svg";
import Arrow from "assets/svg/Vector (4).svg";

import "./form.scss";

interface FormData {
  email: string;
  phone: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  code: string;
  checkbox: string;
}

const Forms: FC = (): JSX.Element => {
  const [values, setValues] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => navigate("/checkout/payment");

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contact">
          <h3>Contact information</h3>
          <div className={errors?.email ? "contact__email error" : "contact__email"}>
            <img src={Email} alt="email" />
            <Form.Control
              type="text"
              placeholder="Email Address"
              {...register("email", {
                required: true,
                pattern: emailPattern,
              })}
            />
            {errors?.email && <p className="error__text">Enter a valid email address</p>}
          </div>
          <div className={errors?.phone ? "contact__phone error" : "contact__phone"}>
            <img src={Phone} alt="phone" />
            <Form.Control
              type="phone"
              placeholder="Phone Number"
              onInput={(e: React.FormEvent<HTMLInputElement>) => InputNumber(e, setValues)}
              value={values}
              {...register("phone", { required: true })}
            />
            {errors?.phone && <p className="error__text">Enter a valid email address</p>}
          </div>
        </div>
        <div className="details">
          <h3>Shipping Details</h3>
          <div className={errors?.country ? "details__country error" : "details__country"}>
            <img src={Vector} alt="vector" />
            <Form.Select aria-label="Default select example" {...register("country", { required: true })}>
              <option>Select a Country</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            {errors?.country && <p className="error__text">Enter a valid email address</p>}
          </div>
          <div className="firstlast">
            <div className={errors?.firstName ? "firstname error" : "firstname"}>
              <img src={User} alt="user" />
              <Form.Control
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: true, pattern: namePattern })}
              />
              {errors?.firstName && <p className="error__text">Enter a valid email address</p>}
            </div>
            <div className={errors?.lastName ? "lastname error" : "lastname"}>
              <img src={User} alt="user" />
              <Form.Control
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true, pattern: namePattern })}
              />
              {errors?.lastName && <p className="error__text">Enter a valid email address</p>}
            </div>
          </div>
          <div className={errors?.address ? "address error" : "address"}>
            <img src={Address} alt="address" />
            <Form.Control type="text" placeholder="Address" {...register("address", { required: true })} />
            {errors?.address && <p className="error__text">Enter a valid email address</p>}
          </div>
          <div className={errors?.apartment ? "appartament error" : "appartament"}>
            <img src={Org} alt="org" />
            <Form.Control
              type="text"
              placeholder="Aparment, suit, etc (Optional)"
              {...register("apartment", { required: true })}
            />
            {errors?.apartment && <p className="error__text">Enter a valid email address</p>}
          </div>
          <div className="citycode">
            <div className={errors?.city ? "city error" : "city"}>
              <Form.Select aria-label="Default select example" {...register("city", { required: true })}>
                <option>City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              {errors?.city && <p className="error__text">Enter a valid email address</p>}
            </div>
            <div className={errors?.code ? "code error" : "code"}>
              <Form.Control type="password" placeholder="Post code" {...register("code", { required: true })} />
              {errors?.code && <p className="error__text">Enter a valid email address</p>}
            </div>
          </div>
        </div>
        <div className="method">
          <h3>Shipping Method</h3>
          <div className="free">
            <label>
              <input type="checkbox" {...register("checkbox", { required: true })} />
              <span>Free Shipping</span>
            </label>
            <span>€0.00</span>
          </div>
        </div>
        <div className="continue">
          <Button variant="dark" type="submit">
            Continue to payment
            <img src={Arrow} alt="arrow" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
