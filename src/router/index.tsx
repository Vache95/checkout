import { FC, lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";

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
          <Route path="checkout" element={<Checkout />}>
            <Route path="information" element={<Information />} />
            <Route path="payment" element={<Payments />} />
          </Route>
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
