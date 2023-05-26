const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

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
		const paymentMethod = await stripe.paymentMethods.attach(req.body.id, {
			customer: req.body.customer,
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

// const endpointSecret = `${process.env.REACT_APP_STRIPE_WEBHOOK_KEY}`;

// app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
// 	const sig = request.headers['stripe-signature'];

// 	let event;

// 	try {
// 		event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
// 	} catch (err) {
// 		response.status(400).send(`Webhook Error: ${err.message}`);
// 		return;
// 	}

// 	// Handle the event
// 	switch (event.type) {
// 		case 'payment_intent.succeeded':
// 			const paymentIntentSucceeded = event.data.object;
// 			// Then define and call a function to handle the event payment_intent.succeeded
// 			break;
// 		// ... handle other event types
// 		default:
// 			console.log(`Unhandled event type ${event.type}`);
// 	}

// 	// Return a 200 response to acknowledge receipt of the event
// 	response.send();
// });

// app.listen(4242, () => console.log('Running on port 4242'));
