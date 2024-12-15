import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';

export const getOrders = async () //   {
//   id = null,
// }: {
//   id?: string | null | undefined;
// }
: Promise<AxiosResponse> => {
  try {
    // const url = `/orders${id ? `?tableId=${id}` : ''}`;
    // const response = await axiosClient.get(url);
    const response = await axiosClient.get('/orders');
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Re-throw the error for upstream handling
  }
};
