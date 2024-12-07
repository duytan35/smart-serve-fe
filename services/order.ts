import { AxiosResponse } from 'axios';
import api from './api';

export const getOrders = async () //   {
//   id = null,
// }: {
//   id?: string | null | undefined;
// }
: Promise<AxiosResponse> => {
  try {
    // const url = `/orders${id ? `?tableId=${id}` : ''}`;
    // const response = await api.get(url);
    const response = await api.get('/orders');
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Re-throw the error for upstream handling
  }
};
