import { AxiosResponse } from 'axios';
import { ITablApiResponse } from '@/types/api/table';
import api from './api';

export const getTables = async (): Promise<AxiosResponse<ITablApiResponse>> => {
  try {
    const response = await api.get('/tables');
    return response;
  } catch (error: any) {
    console.log('error in getTables api/table');
    return error;
  }
};

export const createTables = async () => {
  try {
    const response = await api.post('/tables');
    return response;
  } catch (error) {
    console.log('error in getTables api/table');
    return error;
  }
};

export const updateTables = async (
  id: string,
  data: { name: string; seats: number },
) => {
  try {
    const response = await api.post(`/tables?id=${id}`, data);
    return response;
  } catch (error) {
    console.log('error in getTables api/table');
    return error;
  }
};

export const deleteTable = async (tableId: string): Promise<AxiosResponse> => {
  try {
    return await api.delete(`/tables?id=${tableId}`);
  } catch (error: any) {
    return error;
  }
};
