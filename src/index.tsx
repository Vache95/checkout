import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "react-query";
import ExpensesContextProvider from "context";
import App from "./App";
import "style/style.scss";

const stripePromise = loadStripe(
  "pk_test_51N6E82GvTPkBaR2vbKB0ozfpoLlC4M7fNqNaF37eEQ1NMEM5HhFCL4rOLMbRAmnKeKdoSfTMQNJnMmaTNzuyVK4w00PAYFIPbm"
);
const queryClient = new QueryClient();
const rootElem = document.getElementById("root");
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ExpensesContextProvider>
              <Elements stripe={stripePromise}>
                <App />
              </Elements>
            </ExpensesContextProvider>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
