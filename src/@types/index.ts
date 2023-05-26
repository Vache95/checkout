export interface CardData {
	number: string;
	exp_month: string;
	exp_year: string;
	cvc: string;
}
export interface FormData {
	chekbox: boolean;
	radiotop: boolean;
	radiobottom: boolean;
	country: string;
	firstname: string;
	lastname: string;
	address: string;
	org: string;
	city: string;
	code: string;
	phone: string;
	cardnumber: string;
	cardname: string;
	carddate: string;
	cardcode: string;
}

export interface PayPalStayl {
	layout?: 'horizontal' | undefined;
	height?: number | undefined;
	width?: number | undefined;
}

export interface InititalOptions {
	'client-id': any;
	currency: string;
	intent: string;
}
