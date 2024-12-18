import axiosClient from '../axiosClient';
import { ITable } from '@/types/table';

class TableApi {
  static async getTables(): Promise<ITable[]> {
    const response = await axiosClient.get('/tables');
    return response.data.data;
  }

  static async createTable(data: {
    name: string;
    seats?: number;
  }): Promise<ITable> {
    const response = await axiosClient.post('/tables', data);
    return response.data.data;
  }

  static async updateTable(data: {
    id: number;
    name: string;
    seats?: number;
  }): Promise<ITable> {
    const response = await axiosClient.put(`/tables/${data.id}`, data);
    return response.data.data;
  }

  static async removeTable(data: { id: number }) {
    const response = await axiosClient.delete(`/tables/${data.id}`);
    return response.data.data;
  }
}

export default TableApi;
