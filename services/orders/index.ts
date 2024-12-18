import { IOrder, IOrderDetail } from '@/types/order';
import axiosClient from '../axiosClient';

class OrderApi {
  static async getOrders(params: {
    tableId?: string;
    status?: string;
  }): Promise<IOrder[]> {
    const response = await axiosClient.get('/orders', { params });
    return response.data.data;
  }

  static async updateOrderDetail(params: {
    id: number;
    step: number;
  }): Promise<IOrderDetail[]> {
    const response = await axiosClient.patch(
      `/orders/order-details/${params.id}`,
      {
        step: params.step,
      },
    );
    return response.data.data;
  }

  static async updateOrder(params: {
    id: number;
    status: string;
  }): Promise<IOrder[]> {
    const response = await axiosClient.patch(`/orders/${params.id}`, {
      status: params.status,
    });
    return response.data.data;
  }
}

export default OrderApi;
