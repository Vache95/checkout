import { CARTS, CUPON, PRODUCTS } from 'constant';
import { Http } from 'lib/api';

export const getProducts = () => Http.get(`${PRODUCTS}`);
export const getCarts = () => Http.get(`${CARTS}`);
export const getCupon = (cupon: string) => Http.get(`${CUPON}/${cupon}`);

export const updateCart = (id: string, countProducts: number) =>
	Http.patch(`${CARTS}/${id}`, {
		count: `${countProducts}`,
	});

export const deleteProduct = (id: string) => {
	Http.patch(`${CARTS}/${id}`, {
		count: '',
	});
};
