import { IMenu } from '@/types/menu';
import axiosClient from '../axiosClient';
import { IOrder } from '@/types/order';

class ClientApi {
  static async getMenu(data: {
    restaurantId: string;
    tableId: string;
  }): Promise<IMenu> {
    const response = await axiosClient.get('client/menu', { params: data });
    return response.data.data;
  }

  static async getOrderByTable(data: { tableId: number }): Promise<IOrder> {
    const response = await axiosClient.get('client/order', { params: data });
    return response.data.data;
  }

  static async createOrder(data: {
    tableId: number;
    orderDetails: { dishId: number; quantity: number; note?: string }[];
  }) {
    const response = await axiosClient.post('orders', data);
    return response.data.data;
  }
}

export default ClientApi;
