import { FC, lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import { CHECKOUT, INFORMATION, PAYMENT, THANK_YOU,WRONG_PAGE } from "constant";

import Layout from "layout";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "page/home"));
const Checkout = lazy(() => import(/* webpackChunkName: "Checkout" */ "page/checkout"));
const Information = lazy(() => import(/* webpackChunkName: "Information" */ "page/checkout/information"));
const Payments = lazy(() => import(/* webpackChunkName: "Payments" */ "page/checkout/payments"));
const ThankYou = lazy(() => import(/* webpackChunkName: "ThankYou" */ "page/thankyou"));

const Router: FC = (): JSX.Element => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path={CHECKOUT} element={<Checkout />}>
            <Route path={INFORMATION} element={<Information />} />
            <Route path={PAYMENT} element={<Payments />} />
          </Route>
          <Route path={THANK_YOU} element={<ThankYou />} />
          <Route path={WRONG_PAGE} element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
