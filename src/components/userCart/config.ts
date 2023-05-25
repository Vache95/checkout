interface CartItem {
	id: string;
	name: string;
	value: string;
}

export const userCart: CartItem[] = [
	{
		id: '1',
		name: 'Name:',
		value: 'Oleo Bone',
	},
	{
		id: '2',
		name: 'Email:',
		value: 'oleo_bone@gmail.com',
	},
	{
		id: '3',
		name: 'Ship to:',
		value: '4140 Parker Rd. Allentown, New Mexico 31134',
	},
	{
		id: '4',
		name: 'Shipping Method:',
		value: 'Free Shipping  €0.00',
	},
];
