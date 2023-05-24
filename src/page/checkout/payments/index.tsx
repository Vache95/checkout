import { FC, FormEvent, useState, useEffect } from "react";

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
import { THANK_YOU } from "constant";

import { countries } from "config/config";
import { useStripe, useElements, CardNumberElement, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { FormData } from "@types";
import { useExpensesData } from "context";

import "./payments.scss";

const Payments: FC = (): JSX.Element => {
  const [option, setOption] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const { setAlert }: any = useExpensesData();
  const stripe: any = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Demo total",
          amount: 1099,
        },
        disableWallets: ["link"],
        requestPayerName: true,
        // requestPayerName: true,
        // requestPayerEmail: true,
      });

      pr.canMakePayment()
        .then((result: any) => {
          if (result) {
            console.log(result);
            setPaymentRequest(pr);
          }
        })
        .catch(console.error);
    }
  }, [stripe]);

  const intentRequst = (): void => {
    fetch("http://localhost:5001/intentd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 22222 }),
    })
      .then((r) => r.json())
      .then((response) => {
        paymentRequst(response?.client_secret?.id);
      })
      .catch((e) => console.log(e));
  };
  const paymentRequst = async (id: string): Promise<void> => {
    try {
      const cardElement = elements?.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      fetch(`https://api.stripe.com/v1/payment_intents/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization:
            "Bearer sk_test_51N6E82GvTPkBaR2vkZmyQQusAAR5y9XtBGRgl6HcqI9pUcgzlenzMU2plCKBNtS2HjQAeiuECjShfcW6YlsH6Wks00aeOGMOqr",
        },
        body: `payment_method=${paymentMethod?.id}`,
      })
        .then((r) => r.json())
        .then((updatedPaymentIntent) => {
          setAlert(true);
          setLoading(false);
          paymentConfirm(updatedPaymentIntent);
        })
        .catch((e) => {
          setAlert("error");
          setLoading(false);
        });
    } catch (e) {
      console.log(e, "error");
    }
  };
  const paymentConfirm = (updatedPaymentIntent: any) => {
    stripe.confirmPayment({
      clientSecret: updatedPaymentIntent.client_secret,
      confirmParams: {
        return_url: `http://localhost:3000/${THANK_YOU}`,
      },
    });
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    intentRequst();
  };

  const openOption = (e: FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    id === "top" ? setOption(false) : setOption(true);
  };

  return (
    <>
      <div className="payments">
        {paymentRequest ? (
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        ) : (
          <form className="payments-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="payments-method">
              <div className="payments-method__title">
                <h3>Payment Method</h3>
                <p>Enter your card information to make the payment securely.</p>
                <CreditCard register={register} errors={errors} control={control} />
              </div>
            </div>
            <div className="payments-address">
              <div className="payments-address-lefth">
                <input type="checkbox" {...register("chekbox", { required: true })} />
              </div>
              <div className="payments-address-rigth">
                <p>
                  By checking this box, I acknowledge that I have read and agree to the <span>Terms of Service</span>, and{" "}
                  <span>Monthly Billing Terms</span> of this website and want to opt-in for the monthly billed Dream Collection
                  Club®
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
                    <Input
                      type="text"
                      placeholder="Aparment, suit, etc (Optional)"
                      register={register}
                      name="org"
                      errors={errors}
                    />
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
            <Buttons type="submit" imgs name="Validate the order" load={loading} />
          </form>
        )}
      </div>
    </>
  );
};

export default Payments;

// import { FC, FormEvent, useState } from "react";

// import Form from "react-bootstrap/Form";
// import { useForm } from "react-hook-form";
// import Buttons from "components/formElements/button";
// import CreditCard from "components/creditCard";

// import Vector from "assets/svg/Vector (1).svg";
// import Phone from "assets/svg/fi-rr-phone-call.svg";
// import User from "assets/svg/fi-rr-user.svg";
// import Address from "assets/svg/Vector (2).svg";
// import Org from "assets/svg/Vector (3).svg";
// import Input from "components/formElements/input";
// import CryptoJS from "crypto-js";
// import { THANK_YOU } from "constant";

// import { countries } from "config/config";
// import { useStripe } from "@stripe/react-stripe-js";
// import { CardData, FormData } from "@types";
// import { stripeBody } from "helper/stripeCard";
// import { useExpensesData } from "context";

// import './payments.scss';

// const Payments: FC = (): JSX.Element => {
//   const [option, setOption] = useState<boolean>(false);
//   const [loading, setLoading] = useState(false);
//   const { setAlert }: any = useExpensesData();
//   const stripe: any = useStripe();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();

//   const intentRequst = (card: CardData): void => {
//     fetch("http://localhost:5001/intentd", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 7777 }),
//     })
//       .then((r) => r.json())
//       .then((response) => {
//         paymentRequst(card, response?.client_secret?.id);
//       });
//   };
//   const paymentRequst = (card: CardData, id: string): void => {
//     fetch("http://localhost:5001/cretePaymentMethod", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id: stripeBody(card) }),
//     })
//       .then((r) => r.json())
//       .then((response) => {
//         fetch(`https://api.stripe.com/v1/payment_intents/${id}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//             Authorization:
//               "Bearer sk_test_51N6E82GvTPkBaR2vkZmyQQusAAR5y9XtBGRgl6HcqI9pUcgzlenzMU2plCKBNtS2HjQAeiuECjShfcW6YlsH6Wks00aeOGMOqr",
//           },
//           body: `payment_method=${response.cratepaymentMethod.id}`,
//         })
//           .then((r) => r.json())
//           .then((updatedPaymentIntent) => {
//             setAlert(true);
//             setLoading(false);
//             stripe.confirmPayment({
//               clientSecret: updatedPaymentIntent.client_secret,
//               confirmParams: {
//                 // return_url: `http://localhost:3000/${THANK_YOU}`,
//               },
//             });
//           })
//           .catch((e) => {
//             setAlert("error");
//             setLoading(false);
//           });
//       });
//   };

//   const onSubmit = async (data: FormData) => {
//     setLoading(true);

//     // const hashedNum: any = CryptoJS.SHA256(num.number).toString();

//     // const psiDSSFormat: any = {
//     //   number: hashedNum,
//     //   exp_month: num.exp_month,
//     //   exp_year: num.exp_year,
//     //   cvc: num.cvc,
//     // };

//     const card: CardData = {
//       number: data.cardnumber,
//       exp_month: data.carddate.slice(0, 2),
//       exp_year: data.carddate.slice(5),
//       cvc: data.cardcode,
//     };
//     intentRequst(card);
//   };

//   const openOption = (e: FormEvent<HTMLInputElement>): void => {
//     const target = e.target as HTMLInputElement;
//     const id = target.id;
//     id === 'top' ? setOption(false) : setOption(true);
//   };

//   return (
//     <div className="payments">
//       <form className="payments-form" onSubmit={handleSubmit(onSubmit)}>
//         <div className="payments-method">
//           <div className="payments-method__title">
//             <h3>Payment Method</h3>
//             <p>Enter your card information to make the payment securely.</p>
//             <CreditCard register={register} errors={errors} />
//           </div>
//         </div>
//         <div className="payments-address">
//           <div className="payments-address-lefth">
//             <input type="checkbox" {...register('chekbox', { required: true })} />
//           </div>
//           <div className="payments-address-rigth">
//             <p>
//               By checking this box, I acknowledge that I have read and agree to the{' '}
//               <span>Terms of Service</span>, and <span>Monthly Billing Terms</span> of this website
//               and want to opt-in for the monthly billed Dream Collection Club®
//             </p>
//           </div>
//         </div>
//         <div className="payments-billing">
//           <div className="payments-billing__title">
//             <h3>Billing address</h3>
//             <p>Select the address that matches your card or payment method.</p>
//           </div>
//           <div className="payments-billing-topaddress">
//             <input {...register('radiotop')} type="radio" name="1" id="top" onClick={openOption} />
//             <label>Same as shipping address</label>
//           </div>

//           <>
//             <div
//               className={
//                 option
//                   ? 'payments-billing-bottomaddress bottomaddress--mod'
//                   : 'payments-billing-bottomaddress'
//               }>
//               <input
//                 {...register('radiobottom')}
//                 type="radio"
//                 name="1"
//                 id="bottom"
//                 onClick={openOption}
//               />
//               <label>Use a different billing address</label>
//             </div>
//             <div className={option ? 'bottomaddress__option option--mod' : 'bottomaddress__option'}>
//               <div className="bottomaddress__option-country">
//                 <img src={Vector} alt="vector" />
//                 <Form.Select {...register('country')} defaultValue="">
//                   <option value="" disabled>
//                     Select a Country
//                   </option>
//                   {countries.map(({ label }, i) => (
//                     <option key={i} value={label}>
//                       {label}
//                     </option>
//                   ))}
//                 </Form.Select>
//                 {errors?.country && <p className="error__text">Enter a valid country address</p>}
//               </div>
//               <div className="bottomaddress__option-firstlast">
//                 <div className="bottomaddress__option-firstname">
//                   <img src={User} alt="User" />
//                   <Input
//                     type="text"
//                     placeholder="First Name"
//                     register={register}
//                     name="firstname"
//                     errors={errors}
//                   />
//                 </div>
//                 <div className="bottomaddress__option-lastname">
//                   <img src={User} alt="User" />
//                   <Input
//                     type="text"
//                     placeholder="First Name"
//                     register={register}
//                     name="lastname"
//                     errors={errors}
//                   />
//                 </div>
//               </div>
//               <div className="bottomaddress__option-address">
//                 <img src={Address} alt="address" />
//                 <Input
//                   type="text"
//                   placeholder="Address"
//                   register={register}
//                   name="address"
//                   errors={errors}
//                 />
//               </div>
//               <div className="bottomaddress__option-apartament">
//                 <img src={Org} alt="org" />
//                 <Input
//                   type="text"
//                   placeholder="Aparment, suit, etc (Optional)"
//                   register={register}
//                   name="org"
//                   errors={errors}
//                 />
//               </div>
//               <div className="bottomaddress__option-citycode">
//                 <div className="bottomaddress__option-city">
//                   <Form.Select
//                     aria-label="Default select example"
//                     {...register('city')}
//                     defaultValue="">
//                     <option value="" disabled>
//                       City
//                     </option>
//                     <option value="1">One</option>
//                     <option value="2">Two</option>
//                     <option value="3">Three</option>
//                   </Form.Select>
//                 </div>
//                 <div className="bottomaddress__option-code">
//                   <Input
//                     type="text"
//                     placeholder="Zip Code"
//                     register={register}
//                     name="code"
//                     errors={errors}
//                   />
//                 </div>
//               </div>
//               <div className="bottomaddress__option-phone">
//                 <img src={Phone} alt="phone" />
//                 <Input
//                   type="text"
//                   placeholder="Phone Number ( for shipping updates & orders )"
//                   register={register}
//                   name="phone"
//                   errors={errors}
//                 />
//               </div>
//             </div>
//           </>
//         </div>
//         <Buttons type="submit" imgs name="Validate the order" load={loading} />
//       </form>
//     </div>
//   );
// };

// export default Payments;
