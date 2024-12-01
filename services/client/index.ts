import api from '../api';

class ClientApi {
  static async getMenu(data: any): Promise<any> {
    const response = await api.post('client/me', data);
    return response;
  }
}

export default ClientApi;