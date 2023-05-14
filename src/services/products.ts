import { PRODUCTS } from 'constant';
import { api } from 'lib/api';

export const products = async () => await api(`${PRODUCTS}`, { method: 'GET' });
