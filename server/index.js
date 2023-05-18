const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51N6E82GvTPkBaR2vkZmyQQusAAR5y9XtBGRgl6HcqI9pUcgzlenzMU2plCKBNtS2HjQAeiuECjShfcW6YlsH6Wks00aeOGMOqr"
);

const port = 5001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/customor", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      description: "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
    });
    res.status(200).json({
      success: true,
      customers: customer,
    });
  } catch (err) {
    // next(err);
    console.log("error");
  }
});
app.post("/intentd", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });
    res.status(200).json({
      success: true,
      client_secret: paymentIntent,
    });
  } catch (err) {
    // next(err);
    console.log("error");
  }
});
app.post("/intentdid", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" },
      });
      res.status(200).json({
        success: true,
        client_secret: paymentIntent,
      });
    } catch (err) {
      // next(err);
      console.log("error");
    }
  });
app.post("/intentdconfirm", async (req, res, next) => {
  try {
    // const intentdconfirm = await stripe.paymentIntents.confirm("pi_3N8guxGvTPkBaR2v1JaC3DXR", { payment_method: "pm_card_visa" });
    const intentdconfirm = await stripe.setupIntents.confirm(req.body.id, { payment_method: "pm_card_visa" });
    res.status(200).json({
      success: true,
      intentdconfirms: intentdconfirm,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/cretePaymentMethod", async (req, res, next) => {
  console.log(req.body);
  try {
    const cratepaymentMethod = await stripe.paymentMethods.create(req.body.id);
    res.status(200).json({
      success: true,
      cratepaymentMethod,
    });
  } catch (error) {
    return next(error);
  }
});

app.post("/paymentMethod", async (req, res, next) => {
  console.log(req.body, "bk");
  try {
    const paymentMethod = await stripe.paymentMethods.attach(eq.body.id, { customer: eq.body.customer });
    console.log(888888, paymentMethod);
    res.status(200).json({
      success: true,
      paymentMethod,
    });
  } catch (error) {
    return next(error);
  }
});
app.post("/paymentMethodconfirm", async (req, res, next) => {
  try {
    const paymentMethod = await stripe.confirmPayment({ card: req.body.id,});
    res.status(200).json({
      success: true,
      paymentMethod,
    });
  } catch (error) {
    return next(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
