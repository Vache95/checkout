export const formatCurrency = (price: number) =>
	Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 2,
	}).format(price);
