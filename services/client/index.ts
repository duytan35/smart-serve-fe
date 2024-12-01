import { IMenu } from '@/types/menu';
import api from '../api';

class ClientApi {
  static async getMenu(data: {
    restaurantId: string;
    tableId: string;
  }): Promise<IMenu> {
    const response = await api.get('client/menu', { params: data });
    return response.data.data;
  }
}

export default ClientApi;
