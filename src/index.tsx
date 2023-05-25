import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import 'style/style.scss';

import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ExpensesContextProvider from 'context';

const public_pk: any = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(public_pk);
const queryClient = new QueryClient();
const rootElem = document.getElementById('root');

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<ExpensesContextProvider>
						<Elements stripe={stripePromise}>
							<App />
						</Elements>
					</ExpensesContextProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</React.StrictMode>
	);
}
