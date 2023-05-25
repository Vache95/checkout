const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(
	'sk_test_51N6E82GvTPkBaR2vkZmyQQusAAR5y9XtBGRgl6HcqI9pUcgzlenzMU2plCKBNtS2HjQAeiuECjShfcW6YlsH6Wks00aeOGMOqr'
);

const port = 5001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/customor', async (req, res) => {
	try {
		const customer = await stripe.customers.create({
			description:
				'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
		});
		res.status(200).json({
			success: true,
			customers: customer,
		});
	} catch (err) {
		// next(err);
		console.log('error');
	}
});
app.post('/intentd', async (req, res) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: req.body.amount,
			currency: 'usd',
			metadata: { integration_check: 'accept_a_payment' },
		});
		res.status(200).json({
			success: true,
			client_secret: paymentIntent,
		});
	} catch (err) {
		// next(err);
		console.log('error');
	}
});
app.post('/intentdid', async (req, res) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: req.body.amount,
			currency: 'usd',
			metadata: { integration_check: 'accept_a_payment' },
		});
		res.status(200).json({
			success: true,
			client_secret: paymentIntent,
		});
	} catch (err) {
		// next(err);
		console.log('error');
	}
});
app.post('/intentdconfirm', async (req, res, next) => {
	try {
		const intentdconfirm = await stripe.setupIntents.confirm(req.body.id, {
			payment_method: 'pm_card_visa',
		});
		res.status(200).json({
			success: true,
			intentdconfirms: intentdconfirm,
		});
	} catch (err) {
		next(err);
	}
});
app.post('/token', async (req, res, next) => {
	try {
		const tokenResult = await stripe.createToken({
			number: '4242424242424242',
			exp_month: 8,
			exp_year: 24,
			cvc: '123',
		});
		res.status(200).json({
			success: true,
			tokenResult: tokenResult,
		});
	} catch (err) {
		next(err);
	}
});

app.post('/cretePaymentMethod', async (req, res, next) => {
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

app.post('/paymentMethod', async (req, res, next) => {
	try {
		const paymentMethod = await stripe.paymentMethods.attach(eq.body.id, {
			customer: eq.body.customer,
		});

		res.status(200).json({
			success: true,
			paymentMethod,
		});
	} catch (error) {
		return next(error);
	}
});
app.post('/paymentMethodconfirm', async (req, res, next) => {
	try {
		const paymentMethod = await stripe.confirmPayment({ card: req.body.id });
		res.status(200).json({
			success: true,
			paymentMethod,
		});
	} catch (error) {
		return next(error);
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// app.post("/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
// 	const sig = req.headers['stripe-signature'];
// 	let event;
//
// 	try {
// 		event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET);
// 	} catch (e) {
// 		console.log('error message', e.message);
// 		return res.status(400).send(`webhook error: ${e.message}`)
// 	}
//
// 	if (event.type === 'payment_intent.created') {
// 		const paymentIntent = event.data.object;
// 		console.log(`[${event.id}] payment intent (PaymentIntent) [${paymentIntent.id}]: ${paymentIntent.status} created!`);
// 	}
// 	if (event.type === 'payment_intent.canceled') {
// 		console.log(`payment intent (PaymentIntent) canceled!`);
// 	}
// 	if (event.type === 'payment_intent.payment_failed') {
// 		console.log(`payment intent (PaymentIntent) payment_failed!`);
// 	}
// 	if (event.type === 'payment_intent.processing') {
// 		console.log(`payment intent (PaymentIntent) processing!`);
// 	}
// 	if (event.type === 'payment_intent.requires_action') {
// 		console.log(`payment intent (PaymentIntent) requires_action!`);
// 	}
// 	if (event.type === 'payment_intent.succeeded') {
// 		console.log(`payment intent (PaymentIntent) succeeded!`);
// 	}
//
// 	res.json({ received: true });
// })
